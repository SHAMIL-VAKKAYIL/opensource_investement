import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import authRouter from './router/auth.route.js'
import { createProxyMiddleware } from 'http-proxy-middleware'



dotenv.config()
const app = express()


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/user',
    createProxyMiddleware({
        target: 'http://localhost:5001',
        changeOrigin: true,
        pathRewrite: {
            '^/api/user': '',
        },
    }))

app.use('/api/investment',
    createProxyMiddleware({
        target: 'http://localhost:5002',
        changeOrigin: true,
        pathRewrite: {
            '^/api/user': '',
        },
    }))

app.use('/api/wallet',
    createProxyMiddleware({
        target: 'http://localhost:5003',
        changeOrigin: true,
        pathRewrite: {
            '^/api/wallet': '',
        },
    }))

app.use('/api/notification',
    createProxyMiddleware({
        target: 'http://localhost:5005',
        changeOrigin: true,
        pathRewrite: {
            '^/api/user': '',
        },
    }))

app.use('/api/payment',
    createProxyMiddleware({
        target: 'http://localhost:5006',
        changeOrigin: true,
        pathRewrite: {
            '^/api/payment': '',
        },
    }))


app.use(express.json())
app.use('/api/auth', authRouter)


const startServer = async () => {
    await connectDB()
    app.listen(5000, () => {
        console.log('server running on port 5000');
    })
}

startServer()
