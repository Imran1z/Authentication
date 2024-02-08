import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/user.route.js'
import dotenv from 'dotenv'
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



app.use('/api/v1/user',userRoutes)
