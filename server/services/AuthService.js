import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import secretKey from "../config.js";

const generateAccessToken = (id, roles) => {
    const payload = { id, roles }
    return jwt.sign(payload, secretKey.secret, { expiresIn: '24h' })
}

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

    async login(user) {
        const { username, password } = user
        const loggedUser = await User.findOne( { username } );
        if (!loggedUser) {
            throw new Error(`user ${username} is not registered`)
        }
        const validPass = bcrypt.compareSync(password, loggedUser.password)
        if (!validPass) {
            throw new Error(`password is incorrect`)
        }
        const token = generateAccessToken(user._id, user.roles)
        return token;
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