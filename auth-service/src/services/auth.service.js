import User from "../model/User.js";
import { passwordCheck } from "../utils/user.util.js";

class AuthService {
    async register(data) {
       newUser = await User.create({
        name:data.name,
        email:data.email,
        password:data.hashedPassword
       }) 

       return newUser
    }

    async login(data){
        return passwordCheck(data.password,data.existinguser)
    }
}

export default new AuthService