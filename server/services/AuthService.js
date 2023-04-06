import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";

class AuthService { 
    async register(user) {
        const { username, password } = user
        const candidate = await User.findOne( { username } )
        if (candidate) {
            throw new Error('username already taken')
        }
        const userRole = await Role.findOne({ value: 'admin' })
        const hashPass = bcrypt.hashSync(password, 7);
        const createdUser = User.create({ username, password: hashPass, roles: [userRole.value] })
        return createdUser
    }

    async login(req, res) {

    }

    async getUsers(req, res) {
        const users = await User.find();
        return users
    }

    async deleteUser(id) {
        if (!id) {
            throw new Error('ID is not specified')
        }
        const user = await User.findByIdAndDelete(id);
        return user
    }
}

export default new AuthService();