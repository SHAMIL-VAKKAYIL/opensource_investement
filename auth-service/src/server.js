import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import authRouter from './router/auth.route.js'


dotenv.config()
const app = express()

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use('/api/auth',authRouter)


const startServer = async () => {
    await connectDB()
    app.listen(5000, () => {
        console.log('server running on port 5000');
    })
}

startServer()
