import Router from "express";
import AuthController from "../controllers/AuthController.js";
import { check } from "express-validator";

const authRouter = new Router();

authRouter.post('/login', AuthController.login)
authRouter.post('/registration', [
    check('username', 'username could not be empty').notEmpty(),
    check('password', 'password should be from 4 to 10 characters').isLength({ min: 4, max: 10 }),
], AuthController.register)
authRouter.get('/users', AuthController.getUsers)
authRouter.delete('/users/:id', AuthController.deleteUser)

export default authRouter;