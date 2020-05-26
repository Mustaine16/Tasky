import { user as User } from "../models";

export default async function (req, res, next) {
  try {
    const { id } = req.authUser;

    const user = await User.findByPk(id);

    //404 User not found
    if (!user) return res.status(404).json({ message: "User not found" });

    //Admin role
    if (req.authUser.id === user.id && user.role === "admin") return next();

    //Check if the user is owner of the mainObject (the task, user modifications, etc)

    //mainObj will be the default property set in finder middlewares of each controller to verify the owner

    if (req.mainObj && req.mainObj.userId == req.authUser.id) return next();

    return res.status(401).json({ message: "Authorization Failed" });
  } catch (error) {
    next(error);
  }
}
