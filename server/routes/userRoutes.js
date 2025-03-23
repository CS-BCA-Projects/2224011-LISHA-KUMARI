import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getAllUsers, getUserData } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);
userRouter.get('/all-users' , userAuth , getAllUsers)

export default userRouter;
