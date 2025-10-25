import User from "../model/User.js";
import { verifyToken } from "../utils/token.util.js";
import { passwordCheck } from "../utils/user.util.js";

class AuthService {
    async register(data) {
      const  newUser = await User.create({
            name: data.name,
            email: data.email,
            password: data.hashedPassword
        })
        return newUser
    }
    async login(data) {
        return passwordCheck(data.password, data.existinguser)
    }
    async tokenVerify(token) {
        const decode = verifyToken(token)
        return decode
    }
    async logout() {
        return { message: "User logged out successfully" };
    }
}

export default new AuthService