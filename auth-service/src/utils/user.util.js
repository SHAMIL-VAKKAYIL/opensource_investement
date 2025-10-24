import User from "../model/User";

export const ExistingUser = async (email) => {
    return await User.findOne({ email })
}

export const passwordCheck =async(password,existinguser)=>{
    await existinguser.isPasswordMatch(password)
} 