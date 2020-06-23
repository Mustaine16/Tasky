import { task as Task } from "../models";
import { user as User } from "../models";
import { category as Category } from "../models";

import paramsBuilder from "../helpers/paramsBuilder";
import errorHandler from "../helpers/errorHandler";

const validParams = ["title", "description", "categoryId"];

const controller = {
  
  //Finder middleware
  find: async function (req, res, next) {
    try {
      const id = Number(req.params.id);

      const task = await Task.findByPk(id, {
        include: [
          { model: User, as: "user", attributes: ["id", "name", "email"] },
          { model: Category, as: "category", attributes: ["id", "title"] },
        ],
      });

      if (!task) return next(new Error("Task not found"));

      req.task = task;
      req.mainObj = task;

      return next();
    } catch (error) {
      next(error);
    }
  },

  index: async (req, res) => {
    try {
      const tasks = await Task.findAll();
      res.json({ tasks });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  show: (req, res) => {
    if (req.task) {
      res.json({ task: req.task });
    } else {
      return res.status(404).json({"message": "Task not found"})
    }
  },

  create: async (req, res) => {
    try {
      //Create with the user owner as param
      const params = paramsBuilder(req.body, validParams)
      console.log(params);
      
      params["userId"] = req.authUser.id

      const newTask = await Task.create(params);

      res.json({
        newTask
      });

    } catch (error) {
      errorHandler(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const taskId = Number(req.params.id);

      const params = paramsBuilder(req.body, validParams)
      

      const task = await Task.findByPk(taskId);

      console.log(task);

      //verificate the task exists
      if (task) {
        const taskUpdated = await Task.update(
          params,
          { where: { id: taskId }, returning: true }
        );
        res.json({ taskUpdated });
      } else {
        res.send("task not found");
      }
    } catch (error) {
      errorHandler(res, error);
    }
  },

  destroy: async (req, res) => {
    try {
      const taskId = req.params.id;

      const task = await Task.findByPk(taskId);

      if (task) {
        const taskDeleted = await Task.destroy({ where: { id: taskId } });
        res.json({ taskDeleted: task });
      } else {
        res.send("Task not found");
      }
    } catch (error) {
      errorHandler(res, error);
    }
  },
};

export default controller;
