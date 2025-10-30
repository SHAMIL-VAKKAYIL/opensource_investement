import jwt from 'jsonwebtoken'
import { errorResponse } from '../utils/response.util.js';


export const verifyUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return errorResponse(res, 401, 'No token')
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;        
        next();

    } catch (error) {
        return errorResponse(res, 401, 'Invalid token')

    }
}