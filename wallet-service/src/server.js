import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import { InvestmentCreatedEvent, returnGenarationEvent, walletCreatedEvent } from './events/consumer.js'
import walletRouter from './routes/wallet.route.js'
import { createProxyMiddleware } from 'http-proxy-middleware'


dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/wallet',
    createProxyMiddleware({
        target: 'http://localhost:5003',
        changeOrigin: true,
    }))
app.use('/api/wallet', walletRouter)


const startServer = async () => {
    await connectDB()
    await walletCreatedEvent()
    await InvestmentCreatedEvent()
    await returnGenarationEvent()
    app.listen(5003, () => {
        console.log('server running on port 5003');
    })
}

startServer()
