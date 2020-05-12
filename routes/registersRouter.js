import {Router} from "express"

import controller from "../controllers/registersController"

let router = Router();

router.route("/users")
  .get(controller.index)
  .post(controller.create)

router.route("/users/:id")
  .get(controller.show)
  .put(controller.update)
  .delete(controller.destroy)

export default router
