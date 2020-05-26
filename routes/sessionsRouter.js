import { Router } from "express";

import controller from "../controllers/sessionsController";

const router = Router();
const { login, generateToken, sendToken } = controller;

router.route("/sessions")
   .post(login, generateToken, sendToken);

export default router;
