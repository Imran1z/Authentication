import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

 


export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can update only your account!"));
    }

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 12);
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.id }, // Filter: Find user by ID
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profile: req.body.profile,
                },
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return next(errorHandler(404, "User not found"));
        }

        const { password, ...user } = updatedUser._doc;
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};


    
export const deleteUser=async(req, res, next)=>{
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can delete only your account!"));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...')
        
    } catch (error) {
        next(error)
    }
}