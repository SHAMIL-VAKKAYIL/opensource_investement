import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import paymentRouter from './routes/payment.route.js'


dotenv.config()
const app = express()

// app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    if (req.originalUrl === '/api/payment/v1/webhook') {
        next() 
    } else {
        express.json()(req, res, next)
    }
})
app.use('/api/payment', paymentRouter)


const startServer = async () => {
    await connectDB()
    app.listen(5006, () => {
        console.log('server running on port 5006');
    })
}

startServer()
