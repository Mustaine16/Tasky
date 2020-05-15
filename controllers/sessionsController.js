import { user as User } from "../models";

const controller = {
  show: async (req, res) => {
    res.json({sessions: req.user})
  },
  create: async (req, res) => {

    //If the user user is already logged in
    if(req.user) return res.json({msg:"You're already logged in"})

    try {

      const { email, password } = req.body;

      if (!email || !password)
        res.json({ errors: "email and password are required" });

      const user = await User.findOne({
        where: { email },
      }); // <Object> || <null> 

      if (user) {
        const authenticated = await User.login(email, password);//<Boolean>

        if (authenticated) {
          req.session.userId = user.id;
          res.json({ user, session: req.session });
        } else {
          res.json({ errors: "invalid password" });
        }
      } else {
        res.json({
          errors: "there isn't an account associated with this email"
        });
      }
    } catch (errors) {
      console.log(errors);

      res.json({ errors });
    }
  },
  destroy : async (req,res) => {
    req.session.destroy(function(){
      res.json({msg: "session destroyed"})
    })
  }

};

export default controller;
