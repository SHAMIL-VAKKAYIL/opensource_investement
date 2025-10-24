import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db'


dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())



const startServer = async () => {
    await connectDB()
    app.listen(5000, () => {
        console.log('server running on port 5000');
    })
}

startServer()
