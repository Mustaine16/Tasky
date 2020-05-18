import {Router} from "express"
import authCheck from "../middlewares/authCheck"
import authUser from "../middlewares/authUser"
import authAdmin from "../middlewares/authAdmin"

import controller  from "../controllers/usersController"

const {find,index,show,create,update,destroy} = controller 

let router = Router();

router.route("/users")
  .get(authCheck,authAdmin,index)
  .post(create)

router.route("/users/:id")
  .get(authCheck,authUser,find,show)
  .put(authCheck,authUser,update)
  .delete(authCheck,authUser,destroy)

export default router
