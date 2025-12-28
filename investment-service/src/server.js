import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import investmentRouter from './routes/investment.route.js'
import { investmentSuccessEvent, walletCreateEmit } from './events/consumer.js'
import { createProxyMiddleware } from 'http-proxy-middleware'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use('/', investmentRouter)


const startServer = async () => {
    await connectDB()
    await walletCreateEmit()
    await investmentSuccessEvent()
    app.listen(5002, () => {
        console.log('server running on port 5002');
    })
}


startServer()
