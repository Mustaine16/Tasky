import { Router } from "express";

import controller from "../controllers/tasksController";

const router = Router();
const { index, show, create, update, destroy } = controller;

router.route("/tasks")
  .get(index)
  .post(create);

router.route("/tasks/:id")
  .get(show)
  .post(update)
  .delete(destroy)

export default router;
