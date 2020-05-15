
const authUser = function (req, res, next) {
  const authRoute = "/users/"; //Show, update, delete (users/:id)

  const currentRoute = req.originalUrl;

  if (currentRoute.includes(authRoute) && (req.method != "POST" || req.method != "post")) {


    const reqId = req.params.id
    const sessionId = req.user.id
    const adminEmail = "admin@admin.com"
    const sessionEmail = req.user.email 

    if(sessionEmail === adminEmail) 
      return next();

    if(reqId != sessionId) 
      return res.status(401).json({errors:"unauthorized",reqId,sessionId});


    return next();

  } else {
    next();
  }
};

export default authUser;
