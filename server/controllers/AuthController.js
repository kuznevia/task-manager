import AuthService from "../services/AuthService.js";
import { validationResult } from "express-validator";

class AuthController { 
    async register(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ message: 'Registration error', errors })
            }
            const token = await AuthService.register(req.body)
            res.json({ token });
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message })
        }
    }
    async login(req, res) {
        try {
            const token = await AuthService.login(req.body)
            res.json({ token });
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error.message })
        }
    }
    async getUsers(req, res) {
        try {
            const users = await AuthService.getUsers();
            return res.json(users);
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async deleteUser(req, res) {
        try {
            const user = await AuthService.deleteUser(req.params.id);
            return res.json(user);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

export default new AuthController();