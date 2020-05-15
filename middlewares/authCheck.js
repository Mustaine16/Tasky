export default function (req,res,next) {
  //User not logged in
  if (!req.user) {
    return res.status(401).json({
      msg: "YOU MUST BE LOGGED IN ",
      path: req.path,
      method: req.method,
    });
  }else{
    return next();
  }
}
