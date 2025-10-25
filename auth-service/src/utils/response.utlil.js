export const errorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({success: false,message})
}

export const successResponse = (res, statusCode, message) => {
    console.log(statusCode,message);
    
    return res.status(statusCode).json({ success: true, message })
}