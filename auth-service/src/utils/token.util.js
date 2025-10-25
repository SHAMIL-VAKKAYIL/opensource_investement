import jwt from 'jsonwebtoken'

export const generateUserToken=(id)=>{
    console.log(process.env.JWT_SECRET);
    console.log(process.env.JWT_SECRET_EXPIRES);
    
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_SECRET_EXPIRES})
}

export const verifyToken=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET)
}