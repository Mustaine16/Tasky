import { Router } from "express";

import authMidd from "../middlewares/authMidd";
import authRole from "../middlewares/authRole";


import controller from "../controllers/tasksController";

const router = Router();

const { find, index, show, create, update, destroy } = controller;

router.route("/tasks")
  .get(authMidd,authRole, index)
  .post(authMidd, create);

router
  .route("/tasks/:id")
  .all(find, authMidd, authRole) //Middlewares
  .get(show)
  .put(update)
  .delete(destroy);

export default router;
