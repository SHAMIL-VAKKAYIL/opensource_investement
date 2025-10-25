import User from "../model/User.js";

export const ExistingUser = async (email) => {
    return await User.findOne({ email })
}

export const passwordCheck =async(password,existinguser)=>{
    await existinguser.isPasswordMatch(password)
} 