import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import paymentRouter from './routes/payment.route.js'
import { paymentSuccessEvent } from './events/consumer.js'


dotenv.config()
const app = express()

// app.use(express.json())
app.use(cors())
app.use(
  express.json({
    verify: (req, res, buf) => {
      if (req.originalUrl.includes('/api/payment/v1/webhook')) {
        req.rawBody = buf.toString() 
      }
    },
  })
)
app.use('/api/payment', paymentRouter)


const startServer = async () => {
    await connectDB()
    await paymentSuccessEvent()
    app.listen(5006, () => {
        console.log('server running on port 5006');
    })
}

startServer()
