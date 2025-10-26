import User from "../model/User.js";
import { verifyToken } from "../utils/token.util.js";
import { passwordCheck } from "../utils/user.util.js";

class AuthService {
    async register(data) {
      const  newUser = await User.create({
            email: data.email,
            password: data.password,
            role:data.role
        })
        return newUser
    }
    async login(data) {
        return await passwordCheck(data.password, data.existinguser)
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