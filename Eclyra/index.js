import express from 'express'
import admin from 'firebase-admin'
import cors from 'cors'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./eclyra-50711-firebase-adminsdk-fbsvc-fbc65cb015.json');
import { ErrorHandler } from './Middlewares/ErrorHandler.js'
import cookieParser from 'cookie-parser'
import { getFirestore } from "firebase-admin/firestore";

import { config } from 'dotenv';
config({
    path:'./.env',
})

admin.initializeApp({
    credential: admin.credential.cert(
        serviceAccount
    ),
    databaseURL: process.env.DATABASE_URL
})


const app = express()
const PORT = process.env.PORT || 4000
export const db = getFirestore();

import UserRouter from './Routes/User.js'
import PickupRouter from './Routes/PickUp.js'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))
app.use(cookieParser())

app.use('/gdsc/v1/',UserRouter)
app.use('/gdsc/v1/',PickupRouter)

app.use(ErrorHandler)


app.listen(PORT, () => {
    console.log(`App is listening at PORT - ${PORT}`)
})
