import jwt from "jsonwebtoken";
import secrets from "../config/secrets";

import { user as User } from "../models";
import { task as Task } from "../models";

import paramsBuilder from "../helpers/paramsBuilder"

const validParams = ["email", "password"]

const controller = {

  check: async function (req, res, next) {
    console.log("COOKIE SESION DESDE EL FRONT: ", req.session.token);

    if (!req.session.token) { console.log("No cookie was sent"); return res.status(401).json("No cookie was sent") };

    const token = req.session.token || ''

    try {

      if (!token) return next();

      const decrypt = await jwt.verify(token, secrets.jwtKey)
      console.log(decrypt);
      req.authUser = { id: decrypt.id }

      return next();

    } catch (err) {
      return res.status(500).json(err.toString())
    }
  },

  login: async function (req, res, next) {

    //If the user user is already logged in
    console.log("req.authuser:" + " " + req.authUser);

    if (req.authUser) return res.json({ message: "You're already logged in" });

    try {

      const params = paramsBuilder(req.body, validParams)
      const { email, password } = params

      if (!email || !password)
        return res.status(401).json({ message: "email and password are required" })


      const user = await User.findOne({
        where: { email },
        attributes: ["id", "name", "email"],
        include: [
          {
            model: Task,
            as: "tasks",
          },
        ],
      });

      if (user) {
        const authenticated = await User.login(email, password);

        if (authenticated) {
          req.authUser = user;
          return next();
        } else {
          return res.status(401).json({ message: "Invalid password" })
        }

      } else {

        return res.status(401).json({ message: "There isn't an account associated with this email" })

      }
    } catch (errors) {
      console.log(errors);

      return next(errors);
    }
  },

  generateToken: async function (req, res, next) {
    if (!req.authUser) return next();

    const token = await jwt.sign({ id: req.authUser.id }, secrets.jwtKey, {
      expiresIn: "24h",
    });

    req.session.token = token;

    return next();
  },

  sendToken: async function (req, res) {
    console.log("cookie: ", req.session.token);

    if (!req.authUser) return res.status(404).json({ message: "User not found" });
    // console.log(req.authUser)

    return res.json({
      user: req.authUser || null,
      token: req.session.token || null,//Ojo
    });
  },

  destroy: async (req, res, next) => {
    req.session = null
    return res.status(200).json({ message: "session destroyed" })
  }

};

export default controller;
