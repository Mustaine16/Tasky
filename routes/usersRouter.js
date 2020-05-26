import { Router } from "express";

import authMidd from "../middlewares/authMidd";
import authRole from "../middlewares/authRole";

import controller from "../controllers/usersController";

const { find, index, show, create, update, destroy } = controller;

let router = Router();

router.route("/users")
  .get(authMidd, authRole, index)
  .post(create);

router
  .route("/users/:id")
  .all(find, authMidd, authRole )
  .get(show)
  .put(update)
  .delete(destroy);

export default router;
