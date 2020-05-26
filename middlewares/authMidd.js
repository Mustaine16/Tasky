import jwt from "express-jwt";
import secrets from "../config/secrets";

//Check if a token was sent and set req.authUser with the user's data

const authMiddleware = jwt({
  secret: secrets["jwtKey"],
  requestProperty: "authUser",
});

export default authMiddleware;
