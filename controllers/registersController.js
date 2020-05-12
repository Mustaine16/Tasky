import { user as User } from "../models";
import errorHandler from "../helpers/errorHandler";

const controller = {
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
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (user) {
        res.json(user);
      } else {
        res.send({ message: "User not found" });
      }
    } catch (error) {
      errorHandler(res, error);
    }
  },
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
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {name,email}  = req.body
      const user = await User.findByPk(id)

      if(user){
        const userUpdated = await User.update({name,email},{where:{id}, returning:true})

        res.json({userUpdated})
      }else{
        res.json({message:"user not found"})
      }
    } catch (error) {
      errorHandler(res,error)
    }
  },
  destroy: async (req, res) => {
    try {
      const {id} = req.params
      const user = await User.findByPk(id)

      if(user){
        const destroyed = await User.destroy({where:{id}})
        res.json({destroyed})
      }else{
        res.json({message: "user not found"})
      }
    } catch (error) {
      errorHandler(res,error)
    }
  },
};

export default controller;
