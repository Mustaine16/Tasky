import {Router} from "express"

import controller from "../controllers/sessionsController"

const router = Router()

router.post("/sessions",controller.create)

export default router
