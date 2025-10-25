import express from 'express'
import { errorResponse, successResponse } from '../utils/response.utlil.js'
import { ExistingUser, passwordCheck } from '../utils/user.util.js'
import { HashPassword } from '../utils/password.util.js'
import AuthService from '../services/auth.service.js'
import { generateUserToken } from '../utils/token.util.js'

const router = express.Router()

router.post('/v1/register', async (req, res) => {
    const { name, password, email } = req.body
    try {
        const existinguser = await ExistingUser(email)
        if (existinguser) {
            return errorResponse(res, 401, 'user already exist')
        }
        await AuthService.register({ name, email, password })
        return successResponse(res, 201, 'user created successfully')
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, error.message)
    }
})

router.post('/v1/login', async (req, res) => {
    const { password, email } = req.body
    try {
        const existinguser = await ExistingUser(email)
        if (!existinguser) {
            return errorResponse(res, 401, 'Invalid credential')
        }

        const isMatch = await AuthService.login({ password, existinguser })
            console.log(isMatch,'sjkdfk');
            
        if (!isMatch) {
            return errorResponse(res, 401, 'Invalid credentail')
        }
        const token = generateUserToken(existinguser?.id)

        return successResponse(res, 200, { user: existinguser, token,message:'user Logged successfully' })

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, error.message)
    }
})

router.post('/v1/logout', async (req, res) => {
    try {
        const message = await AuthService.logout()
        return successResponse(res, 201, message.message)
    } catch (error) {
        return errorResponse(res, 500, error.message)
    }
})


export default router