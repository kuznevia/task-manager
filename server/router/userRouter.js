import Router from "express";
import User from "../models/User.js";

const userRouter = new Router();

userRouter.post('/login')
userRouter.post('/registration', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.create({ username, password })
        res.json(user);
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }

})
userRouter.get('/users')

export default userRouter;