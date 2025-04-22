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

import adminRoutes from './routes/adminRoutes.js';
const app = express();
const port= process.env.PORT ||4000
connectDB();

app.use(cors({
    origin: process.env.FRONTEND_URL, // Change to your frontend URL
    credentials: true
  }));


app.use(express.json());
app.use(cookieParser());




//API ENDPOINTS
app.get('/',(req,res) => {
  res.send("hello")
})
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/report', reportRouter)
app.use('/api/contact', contactRouter)
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRouter)

app.listen(port, ()=>console.log(`Server started on PORT:${port}`));