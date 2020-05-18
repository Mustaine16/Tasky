import { user as User } from "../models";
import { task as Task } from "../models";

import {paramsBuilder} from "../helpers/paramsBuilder";
import errorHandler from "../helpers/errorHandler";

const validParams = ["name", "email", "password"]

const controller = {

  find: async (req, res, next) => {
    const { id } = req.params;
    User.findByPk(id)
      .then((user) => {

        if (!user)

          return next();

        console.log(user);
          
        req.user = user;
        return next();

      })
      .catch((err) => next(err));
  },

  index: async (req, res) => {
    try {
      const users = await User.findAll();

      if (users) {
        res.json({ users });
      } else {
        res.send("It looks like nobody registered yet");
      }
    } catch (error) {
      errorHandler(res, error);
    }
  },

  show: async (req, res) => {
    try {

      const user = req.user

      res.json({user})
    } catch (error) {
      errorHandler(res, error);
    }
  },

  create: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const newUser = await User.create({ name, email, password });
      res.status(200).json({ newUser });
    } catch (error) {
      console.log(req.body);
      errorHandler(res, error);
    }
  },

  update: async (req, res) => {
    try {

      const paramsToUpdate = paramsBuilder(req.body,validParams) // <Object>

      req.user = Object.assign(req.user, paramsToUpdate)

      await req.user.save();
      await req.user.reload();

      res.json({user: req.user})
      // if (user) {
      //   const updatedUser = await User.update(
      //     { name, email },
      //     { where: { id }, returning: true }
      //   );

      //   //Verificar que se generaron cambios
      //   if (updatedUser.length > 1) {
      //     res.json({ updatedUser: updatedUser[1][0] });
      //   } else {
      //     res.json({ updatedUser });
      //   }
      // } else {
      //   res.json({ message: "user not found" });
      // }

    } catch (error) {
      errorHandler(res, error);
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (user) {
        const destroyed = await User.destroy({ where: { id } });
        res.json({ destroyed });
      } else {
        res.json({ message: "user not found" });
      }
    } catch (error) {
      errorHandler(res, error);
    }
  },
};

export default controller;
