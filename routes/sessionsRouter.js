import { Router } from "express";

import sessionController from "../controllers/sessionsController";
import userController from "../controllers/usersController";


const router = Router();
const { find } = userController
const { check, login, generateToken, sendToken, destroy } = sessionController;

router.route("/sessions/new")
   .post(login, generateToken, sendToken);

router.route("/sessions/check")
   .post(check, find, generateToken, sendToken)

router.route("/sessions")
   .delete(destroy)

export default router;
