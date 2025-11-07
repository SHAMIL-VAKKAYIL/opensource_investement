import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import { userData } from './events/consumer.js'
import { startReturnJob } from './utils/cronjob.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

const startServer = async () => {
    await connectDB()
    startReturnJob()
    app.listen(5004, () => {
        console.log('server running on port 5004');
    })
}

startServer()
