import { category as Category } from "../models";
import errorHandler from "../helpers/errorHandler";

const controller = {
  index: async (req, res) => {
    try {
      const categories = await Category.findAll();

      if (categories) res.json({ categories });

      res.send("there are no categories yet");
    } catch (error) {
      errorHandler(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (category) {
        res.json({ category });
      } else {
        res.send("Category not found");
      }
    } catch (error) {
      errorHandler(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const { title } = req.body;
      const newCategory = await Category.create({ title });
      res.json({ newCategory });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  update: async (req, res) => {
    try {

      const { id } = req.params;
      const { title } = req.body;

      const category = await Category.findByPk(id);

      if (category) {
        const categoryUpdated = await Category.update({ title }, { where: { id },returning:true });
        /*res.redirect(`/categories/${id}`)*/ 
        res.json({categoryUpdated});
      } else {
        res.send("category not found");
      }

    } catch (error) {
      errorHandler(res, error);
    }
  },
  destroy: async (req, res) => {},
};

export default controller;
