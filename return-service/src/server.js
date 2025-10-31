import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

const startServer = async () => {
    app.listen(5004, () => {
        console.log('server running on port 5004');
    })
}

startServer()