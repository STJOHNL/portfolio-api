import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: './config/.env' })
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/database.js'
import sgMail from '@sendgrid/mail'
const port = process.env.PORT || 3000

// Routes
import mainRoutes from './routes/main.js'

// Connect to MongoDB
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Log
app.use(logger('dev'))

// Cookie Parser
app.use(cookieParser())

// CORS
app.use(cors({
    credentials: true,
    origin: process.env.NODE_ENV !== 'development' ? 'https://mup-client.onrender.com' : 'http://localhost:5173'
}))

// Sendgrid connection
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.use('/api', mainRoutes)

app.listen(port, () => {
    console.log(`Server is running`)
})