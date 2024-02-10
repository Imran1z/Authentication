import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to Mongodb')
    app.listen(process.env.PORT,()=>{
        console.log('Server is up and running on port:',process.env.PORT)
    })
}).catch((err)=>{
    console.log(err)
})


//midllewares
app.use(express.json());
app.use(cookieParser())



app.use('/api/v1/user',userRoutes);
app.use('/api/v1/auth',authRoutes);


//error middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error'
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})