import {Router} from "express"

import controller from "../controllers/sessionsController"

const router = Router()

router.route("/sessions")
  .get(controller.show)
  .post(controller.create)
  .delete(controller.destroy)

export default router
