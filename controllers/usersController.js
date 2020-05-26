import { user as User } from "../models";
import { task as Task } from "../models";

import paramsBuilder from "../helpers/paramsBuilder";
import errorHandler from "../helpers/errorHandler";

const validParams = ["name", "email", "password"];

const controller = {

  find: async (req, res, next) => {
    const id = Number(req.params.id);

    User.findByPk(id, {
      attributes: ["id", "name", "email"],
      include: [
        {
          model: Task,
          as: "tasks",
        },
      ],
    })
      .then((user) => {
        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
        req.mainObj = user;
        req.mainObj.userId = user.id;

        return next();
      })
      .catch((err) => next(err));
  },

  index: async (req, res) => {
    try {
      const users = await User.findAll({attributes:["id","name","email","role"]});

      if (users) {
        res.json({ users });
      } else {
        res.send("It looks like nobody registered yet");
      }
    } catch (error) {
      errorHandler(res, error);
    }
  },

  show: (req, res) => res.json({ user: req.user }),

  create: async (req, res) => {
    const params = paramsBuilder(req.body, validParams);

    try {
      const newUser = await User.create(params);
      res.status(200).json({ newUser });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const params = paramsBuilder(req.body, validParams); // <Object>

      req.user = Object.assign(req.user, params);

      await req.user.save();
      await req.user.reload();

      res.json({ user: req.user });
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
