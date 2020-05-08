import {Router} from "express"

import controller from "../controllers/categoriesController"

const router = Router()

const {index,show,create,update,destroy} = controller

router.route("/categories")   
  .get(index)
  .post(create)

router.route("/categories/:id")
  .get(show)

export default router