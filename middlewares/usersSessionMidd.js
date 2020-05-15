import { user as User } from "../models";

const usersSession = function (req, res, next) {

  const sessionId = req.session.userId;

  if (!sessionId) return next();

  User.findByPk(sessionId)
    .then((user) => {
      if (user) req.user = user;
      next();
    })
    .catch((err) => res.json({ erros: err }));
};

export default usersSession;
