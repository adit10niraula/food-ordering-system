
import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './db/ConnectDb.js'
import { router } from './router/foodItem.router.js'
import userRouter from './router/user.router.js'
import cookieParser from 'cookie-parser'
import adminRouter from './router/admin.router.js'
import categoryRouter from './router/category.router.js'
import cartRouter from './router/cart.router.js'
import { ApiError } from './utils/ErrorHandler.js'
import errorHandlerMiddleware from './middleware/errorhandle.middleware.js'
import ordeRouter from './router/order.router.js'
import cors from 'cors'

const app = express()


dotenv.config()
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



const port = process.env.PORT || 5000

app.use('/api/v1/food', router)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/order', ordeRouter)

app.use(errorHandlerMiddleware)

connectDb(port, app)



