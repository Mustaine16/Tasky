import { user as User } from "../models";
import { task as Task } from "../models";
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
      const user = await User.findByPk(id, {
        include: {
          model: Task,
          as: "tasks",
          attributes: ["id", "title", "description"],
          include: {
            association: "category",
            attributes: ["id", "title"],
          },
        },
        order: [[{ model: Task, as: "tasks" }, "id", "ASC"]],
      });

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
      res.status(200).json({ newUser });
    } catch (error) {
      console.log(req.body)
      errorHandler(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const user = await User.findByPk(id);

      if (user) {
        const updatedUser = await User.update(
          { name, email },
          { where: { id }, returning: true }
        );

          //Verificar que se generaron cambios
          if(updatedUser.length > 1){
            res.json({ updatedUser: updatedUser[1][0] });
          }else{
            res.json({updatedUser})
          }


      } else {
        res.json({ message: "user not found" });
      }
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
