import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import { InvestmentCreatedEvent, paymentCreated, returnGenarationEvent, walletCreatedEvent } from './events/consumer.js'
import walletRouter from './routes/wallet.route.js'
import { connectKafkaProducer } from './events/connectKafkaProducer.js'
// import cookieParser from 'cookie-parser'


dotenv.config()
const app = express()

app.use(express.json())

// app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// app.use((req, _res, next) => {
//     console.log('WALLET SERVICE RECEIVED:', req.method, req.originalUrl)
//     next()
// })


app.use('/', walletRouter)


const startServer = async () => {
    await connectDB()
    await connectKafkaProducer() 
    await walletCreatedEvent()
    await InvestmentCreatedEvent()
    await returnGenarationEvent()
    await paymentCreated()
    app.listen(5003, () => {
        console.log('server running on port 5003');
    })
}

startServer()
