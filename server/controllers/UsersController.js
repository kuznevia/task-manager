import User from "../models/User.js";

class UsersController { 
    async register(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.create({ username, password })
            res.json(user);
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }
}

export default new UsersController();