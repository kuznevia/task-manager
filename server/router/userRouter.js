import Router from "express";
import UsersController from "../controllers/UsersController.js";

const userRouter = new Router();

userRouter.post('/login')
userRouter.post('/registration', UsersController.register)
userRouter.get('/users')

export default userRouter;