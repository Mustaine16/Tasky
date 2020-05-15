import {Router} from "express"
import authCheck from "../middlewares/authCheck"
import authUser from "../middlewares/authUser"
import authAdmin from "../middlewares/authAdmin"

import controller from "../controllers/usersController"

let router = Router();

router.route("/users")
  .get(authCheck,authAdmin,controller.index)
  .post(controller.create)

router.route("/users/:id")
  .get(authCheck,authUser,controller.show)
  .put(authCheck,authUser,controller.update)
  .delete(authCheck,authUser,controller.destroy)

export default router
