// import jwt from "express-jwt";
import secrets from "../config/secrets";
import jwt from "jsonwebtoken"

//Check if a token was sent and set req.authUser with the user's data

const authMiddleware = async (req, res, next) => {

  const token = req.session.token || ''

  try {

    if (!token) return res.status(401).json({ message: "Error, token not found" })
    
    const decrypt = await jwt.verify(token, secrets.jwtKey)
    console.log(decrypt);
    req.authUser = { id: decrypt.id }

    return next();

  } catch (err) {
    return res.status(500).json(err.toString())
  }
}


// const authMiddleware = jwt({
//   secret: secrets["jwtKey"],
//   requestProperty: "authUser",
//   getToken: (req,res) => {

//   }   
// });

export default authMiddleware;
