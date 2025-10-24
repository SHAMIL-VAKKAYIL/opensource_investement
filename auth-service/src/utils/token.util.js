import jwt from 'jsonwebtoken'

export const generateUserToken=(id)=>{
    return jwt.sign(id,process.env.JWT_SECRET,{expiresIn:process.env.JWT_SECRET_EXPIRES})
}