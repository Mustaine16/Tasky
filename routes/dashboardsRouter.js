import { Router } from "express"

import authMidd from "../middlewares/authMidd"
import authRole from "../middlewares/authRole"

import controller from "../controllers/dashboardsController"

const { find, show, index, create, update, destroy } = controller

const router = Router();

router.route("/dashboards")
  .get(authMidd, index)
  .post(authMidd, create)

router.route("/dashboards/:id")
  .get(find,authMidd,authRole,show)
  .put(update)
  .delete(destroy)

export default router
