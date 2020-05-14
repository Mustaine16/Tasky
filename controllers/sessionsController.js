import {user as User} from "../models"

const controller =  {
  new: (req,res) =>{},
  create: async (req,res) =>{

    try {

      const {email, password} = req.body
      if(!email || !password) res.json({error:"email and password are required"})
      
      const user = await User.login(email,password)
      
      if(user){
        res.json({user})
      }else{
        res.json({null:user})
      }
    } catch (error) {
      console.log(error);
      
      res.json({error})
    }
  }
}

export default controller