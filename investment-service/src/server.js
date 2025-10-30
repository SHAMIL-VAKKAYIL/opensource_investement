import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import investmentRouter from './routes/investment.route.js'
import { walletCreateEmit } from './kafka/consumer.js'


dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/investment', investmentRouter)


const startServer = async () => {
    await connectDB()
    await walletCreateEmit()
    app.listen(5002, () => {
        console.log('server running on port 5002');
    })
}


startServer()
