import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import secretKey from "../config.js";
import User from "../models/User.js";

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, secretKey.secret, { expiresIn: "7d" });
};

class AuthService {
  async register(user) {
    const { username, password } = user;
    const candidate = await User.findOne({ username });
    if (candidate) {
      throw new Error("username already taken");
    }
    const hashPass = bcrypt.hashSync(password, 7);
    const createdUser = await User.create({ username, password: hashPass });
    const token = generateAccessToken(createdUser._id);
    return token;
  }

  async login(user) {
    const { username, password } = user;
    const loggedUser = await User.findOne({ username });
    if (!loggedUser) {
      throw new Error(`user ${username} is not registered`);
    }
    const validPass = bcrypt.compareSync(password, loggedUser.password);
    if (!validPass) {
      throw new Error(`password is incorrect`);
    }
    const token = generateAccessToken(loggedUser._id);
    return token;
  }

  async getUsers() {
    const users = await User.find();
    return users;
  }

  async deleteUser(id) {
    if (!id) {
      throw new Error("ID is not specified");
    }
    const user = await User.findByIdAndDelete(id);
    return user;
  }
}

export default new AuthService();
