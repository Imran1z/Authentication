import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'



export const signup=async(req, res)=>{
    const {username,email,password}=req.body;
    try {
    const hashedPassword =bcryptjs.hashSync(password,12)
    const newUser =new User({username, email, password:hashedPassword});
    await newUser.save();
    res.status(201).json({messg:"User has been created successfully"})
 } catch (error) {
    console.log(error);
    res.status(400).json({messg:"An error has been occured"})
    
 }
}