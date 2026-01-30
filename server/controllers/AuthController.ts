import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "User already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashPass });
    await newUser.save();

    req.session.isLoggedIn = true;
    req.session.userId = newUser._id;
    return res.json({
      message: "account created successfully",
      user:{
        _id:newUser._id,
         email:newUser.email,
         name:newUser.name,
        
      }
    });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      message: e.message,
    });
  }
};
export const loginUser = async(req:Request,res:Response)=>{
 try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid User" });
    }
    const isPassCorrect = await bcrypt.compare(password,user.password)
    if(!isPassCorrect){
      return res.status(400).json({message:'Invalid email or password'})
    }
    req.session.isLoggedIn = true;
    req.session.userId = user._id;
    return res.json({
      message: "Login successfully",
      user:{
        _id:user._id,
         email:user.email,
         name:user.name
      }
    });
}
catch(e:any){
console.log(e)
res.status(500).json({message:e.message})
}
};

export const logoutUser = async(req:Request,res:Response)=>{
  req.session.destroy((error:any)=>{
    if(error){
      console.log(error)
      return res.status(500).json({message:error.message})
    }
  })
  return res.json({message:'Logout Successful'})
}

export const verifyUser = async(req:Request,res:Response)=>{
  try{
    const {userId} = req.session
    const user = await User.findById(userId).select('-password')
    if(!user){
      return res.status(400).json({message:'Invalid User'})
    }
    return res.json({user})
  }
  catch(e:any){
    return res.status(500).json({
      message:e.message
    })
  }
}