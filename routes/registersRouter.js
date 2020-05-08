import {Router} from "express"

import controller from "../controllers/registersController"

let router = Router();

router.route("/registers")
  .post(controller.create)

export default router
