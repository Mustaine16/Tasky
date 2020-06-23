import { Router } from "express"

import authMidd from "../middlewares/authMidd"
import authRole from "../middlewares/authRole"

import controller from "../controllers/categoriesController"

const router = Router()

const {find,index,show,create,update,destroy} = controller

router.route("/categories")
  .all(authMidd, authRole)  
  .get(index)
  .post(create)

router.route("/categories/:id")
  .all(authMidd, authRole, find) 
  .get(show)
  .put(update)
  .delete(destroy)

export default router 