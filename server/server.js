import express from "express";
import cors from 'cors'
import 'dotenv/config';
import cookieParser from "cookie-parser";


import connectDB from "./config/mongodb.js"
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js';
import notificationRouter from './routes/notificationRoutes.js';

import reportRouter from './routes/reportRoutes.js';  // Import report routes
import contactRouter from "./routes/contactRoutes.js";

const app = express();
const port= process.env.PORT ||4000
connectDB();

app.use(cors({
    origin: "http://localhost:5173", // Change to your frontend URL
    credentials: true
  }));


app.use(express.json());
app.use(cookieParser());


//API ENDPOINTS

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/report', reportRouter)
app.use('/api/contact', contactRouter)
app.use('/api/notification', notificationRouter)

app.listen(port, ()=>console.log(`Server started on PORT:${port}`));