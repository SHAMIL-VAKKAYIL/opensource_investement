import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import userRouter from './routes/user.route.js'
import { userCreateEvent } from './events/consumer.js'
import { createProxyMiddleware } from 'http-proxy-middleware'


dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())



app.use('/api/user',
    createProxyMiddleware({
        target: 'http://localhost:5001',
        changeOrigin: true,
    })
)
app.use('/api/user', userRouter)


const startServer = async () => {
    await connectDB()
    await userCreateEvent()
    app.listen(5001, () => {
        console.log('server running on port 5001');
    })
}

startServer()
