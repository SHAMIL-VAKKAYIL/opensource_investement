import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import paymentRouter from './routes/payment.route.js'
import { paymentSuccessEvent } from './events/consumer.js'
import { createProxyMiddleware } from 'http-proxy-middleware'


dotenv.config()
const app = express()

app.use((req, _res, next) => {
    console.log('payment SERVICE RECEIVED:', req.method, req.originalUrl)
    next()
})

// app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(
  express.json({
    verify: (req, res, buf) => {
      if (req.originalUrl.includes('/v1/webhook')) {
        req.rawBody = buf.toString() 
      }
    },
  })
)


app.use('/', paymentRouter)


const startServer = async () => {
    await connectDB()
    await paymentSuccessEvent()
    app.listen(5006, () => {
        console.log('server running on port 5006');
    })
}

startServer()
