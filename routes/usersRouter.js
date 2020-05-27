import { Router } from "express";

import authMidd from "../middlewares/authMidd";
import authRole from "../middlewares/authRole";

import controller from "../controllers/usersController";
import sessionController from "../controllers/sessionsController"

const { find, index, show, create, update, destroy } = controller;
const { login, generateToken, sendToken} = sessionController;

let router = Router();

router.route("/users")
  .get(authMidd, authRole, index)
  .post(create, login, generateToken, sendToken);

router
  .route("/users/:id")
  .all(authMidd, find, authRole )
  .get(show)
  .put(update)
  .delete(destroy);

export default router;
