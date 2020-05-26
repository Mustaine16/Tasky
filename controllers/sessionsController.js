import jwt from "jsonwebtoken";
import secrets from "../config/secrets";

import paramsBuilder from "../helpers/paramsBuilder"

import { user as User } from "../models";

const validParams = ["email","password"]

const controller = {

  login: async function (req, res, next) {
    //If the user user is already logged in
    if (req.authUser) return res.json({ message: "You're already logged in" });

    try {

      const params = paramsBuilder(req.body, validParams)
      const { email, password } = params

      if (!email || !password)
        return next(new Error("email and password are required"));
      

      const user = await User.findOne({
        where: { email },
      });

      if (user) {
        const authenticated = await User.login(email, password);

        if (authenticated) {
          req.authUser = user;
          return next();
        } else {
          return next(new Error("Invalid password"));
        }
      } else {
        return next(
          new Error("There isn't an account associated with this email")
        );
      }
    } catch (errors) {
      console.log(errors);

      return next(errors);
    }
  },

  generateToken(req, res, next) {
    if (!req.authUser) return next();

    req.token = jwt.sign({ id: req.authUser.id }, secrets.jwtKey, {
      expiresIn: "1h",
    });

    return next();
  },

  sendToken(req, res) {
    if (!req.authUser) return res.status(404).json({ message: "User not found" });

    return res.json({
      user: req.authUser,
      token: req.token,
    });
  },
  
};

export default controller;
