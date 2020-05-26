import { category as Category } from "../models";

import paramsBuilder from "../helpers/paramsBuilder";
import errorHandler from "../helpers/errorHandler";

const validParams = ["title"];

const controller = {
  find: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const category = await Category.findByPk(id);

      if (!category)
        return res.status(404).json({ message: "Category not found" });

      req.category = category;

      return next();
    } catch (error) {
      return next(error);
    }
  },

  index: async (req, res) => {
    try {
      const categories = await Category.findAll({attributes:["id","title"]});

      if (categories.length == 0)
        return res.status(404).json({ message: "Categories not found" });

      return res.json({ categories });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  show: (req, res) => res.json({ category: req.category }),

  create: async (req, res) => {
    try {
      const params = paramsBuilder(req.body, validParams);
      const { title } = params;

      const newCategory = await Category.create({ title });
      return res.json({ newCategory });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const params = paramsBuilder(req.body, validParams);
      const { title } = params;

      const categoryUpdated = await Category.update(
        { title },
        { where: { id: req.category.id }, returning: true }
      );

      return res.json({categoryUpdated})
    } catch (error) {
      errorHandler(res, error);
    }
  },

  destroy: async (req, res) => {
    try {
      const id = req.category.id;
      const categoryTitle = req.category.title;
      const categoryDestroyed = await Category.destroy({ where: { id } });
      return res.json({ categoryDestroyed, categoryTitle });
    } catch (error) {
      errorHandler(res, error);
    }
  },
};

export default controller;
