import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'



export const signup=async(req, res,next)=>{
    const {username,email,password}=req.body;
    try {
    const hashedPassword =bcryptjs.hashSync(password,12)
    const newUser =new User({username, email, password:hashedPassword});
    await newUser.save();
    res.status(201).json({messg:"User has been created successfully"})
 } catch (error) {
    //console.log(error);
     next(error)
    // next(errorHandler(300,"something went wrong"))
 }
}


export const signin =async(req, res, next)=>{
   const {email,password}=req.body;

   try {
      const validUser =await User.findOne({email});
      if (!validUser) {
         return next(errorHandler(401,'User not found'));
      }

      const validPassword =bcryptjs.compareSync(password,validUser.password);
      if (!validPassword) {
         return next(errorHandler(401, "Wrong Email or Password"));
      }

      const token =jwt.sign({id:validUser._id},process.env.JWT_SECRET,{expiresIn:'24h'});

      const {password:hashedPassword,...user}=validUser._doc;

      const expiryDate = new Date(Date.now()+(24 * 60 * 60 * 1000));

      res.cookie('token',token ,{httpOnly:true,expires:expiryDate}).status(200).json({user});

   } catch (error) {
      next(error)
   }
}