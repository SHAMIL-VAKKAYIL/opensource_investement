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
            errorResponse(res, 401, 'user already exist')
        }
        const hashedPassword = HashPassword(password)
        await AuthService.register({ name, email, hashedPassword })
        successResponse(res, 201, 'user created successfully')
    } catch (error) {
        console.log(error);
        errorResponse(res, 500, error.message)
    }
})

router.post('/v1/login', async (req, res) => {
    const { password, email } = req.body
    try {
        const existinguser = await ExistingUser(email)
        if (!existinguser) {
            errorResponse(res, 401, 'Invalid credential')
        }

        const isMatch =  await AuthService.login({password,existinguser})

        if (!isMatch) {
            errorResponse(res, 401, 'Invalid credentail')
        }
        const token =  generateUserToken()

        successResponse(res,200,{existinguser,token})


    } catch (error) {
        console.log(error);
        errorResponse(res, 500, error.message)
    }
})