import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import notificationRouter from './routes/notification.route.js'
import { notificationConsumer } from './events/consumer.js'


dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/notification', notificationRouter)


const startServer = async () => {
    await connectDB()
    await notificationConsumer()
    app.listen(5005, () => {
        console.log('server running on port 5005');
    })
}

startServer()
