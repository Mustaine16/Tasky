import { user as User } from "../models";
import { task as Task } from "../models";
import { category as Category } from "../models";

import paramsBuilder from "../helpers/paramsBuilder";
import errorHandler from "../helpers/errorHandler";

const validParams = ["name", "email", "password"];

const controller = {

  find: async (req, res, next) => {
  
    const id =  (req.authUser && req.authUser.id)|| Number(req.params.id);
    console.log("ID: " , id);
    
    if(!id) return next();

    User.findByPk(id, {
      attributes: ["id", "name", "email"],
      include: [
        {
          model: Task,
          as: "tasks",
          include:[{ model: Category, as: "category", attributes: ["title"] }]
        },
      ],
    })
      .then((user) => {
        if (!user) return res.status(404).json({ message: "User not found" });

        req.authUser = user
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

  create: async (req, res,next) => {
    const params = paramsBuilder(req.body, validParams);

    try {
      const newUser = await User.create(params);
      next();
    } catch (error) {
      return errorHandler(res, error);
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
