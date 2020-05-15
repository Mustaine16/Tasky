const authAdmin = function (req, res, next) {
  
  const authRoute = "/users"; //Controller.index, via GET method

  const currentPath = req.path;

  if (
    currentPath === authRoute &&
    (req.method == "GET" || req.method == "get")
  ) {
    const adminEmail = "admin@admin.com";
    const sessionEmail = req.user.email;

    if (sessionEmail != adminEmail)
      return res.status(401).json({ errors: "Unauthorized" });

    return next();
  } else {
    next();
  }
};

export default authAdmin;
