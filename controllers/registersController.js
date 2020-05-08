import { user as User } from "../models";
import errorHandler from "../helpers/errorHandler";

const controller = {
  create: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const newUser = await User.create({ name, email, password });
      res.json({ newUser });
    } catch (err) {
      console.log(err);
      const errors = err.errors.map((err) => err.message);
      res.json({ errors });
    }
  },
};

export default controller;
