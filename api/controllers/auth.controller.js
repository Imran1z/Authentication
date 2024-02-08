import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';



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