import { task as Task } from "../models";
import { user as User } from "../models";
import { category as Category } from "../models";
import errorHandler from "../helpers/errorHandler";

const controller = {
  new: (req, res) => {
    res.send("working");
  },
  create: async (req, res) => {
    try {
      const { title, description, categoryId, userId } = req.body;
      const newTask = await Task.create({
        title,
        description,
        categoryId,
        userId,
      });

      res.json({
        newTask,
      });
    } catch (error) {
      errorHandler(res, error);
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
  show: async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findByPk(taskId, {
        include: [
          { model: User, as: "user", attributes: ["name", "email"] },
          { model: Category, as: "category", attributes: ["id", "title"] },
        ],
      });
      console.log(task);

      if (task) {
        res.json({ task });
      } else {
        res.send("Task not found");
      }
    } catch (error) {
      errorHandler(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const taskId = req.params.id;
      const { title, description, categoryId } = req.body;

      const task = await Task.findByPk(taskId);

      console.log(task);

      //verificate the task exists
      if (task) {
        const taskUpdated = await Task.update(
          { title, description, categoryId },
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
