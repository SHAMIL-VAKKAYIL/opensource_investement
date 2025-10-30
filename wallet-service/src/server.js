import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import { InvestmentCreatedEvent, walletCreatedEvent } from './kafka/consumer.js'
import walletRouter from './routes/wallet.route.js'


dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/wallet', walletRouter)


const startServer = async () => {
    await connectDB()
    await walletCreatedEvent()
    await InvestmentCreatedEvent()
    app.listen(5003, () => {
        console.log('server running on port 5003');
    })
}

startServer()
