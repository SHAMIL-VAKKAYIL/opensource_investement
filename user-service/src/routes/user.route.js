import express from "express";
import UserService from "../services/user.service.js";
import { errorResponse, successResponse } from "../utils/response.util.js";

const router = express.Router()




router.put('/v1/update/:id', async (req, res) => {
    const { name, address, phone, accountHolder, accountNumber, ifsc } = req.body
    const id = { id: req.params.id }

    // console.log(id);
    console.log(req.body);

    try {
        let updateUser = {}
        let bankDetails = {}

        if (name) {
            updateUser.name = name
        }
        if (phone) {
            updateUser.phone = phone
        }

        if (address) {
            updateUser.address = address
        }

        if (accountHolder) {
            bankDetails.accountHolder = accountHolder
        }
        if (ifsc) {
            bankDetails.ifsc = ifsc
        }
        if (accountNumber) {
            bankDetails.accountNumber = accountNumber
        }

        if (bankDetails) {
            updateUser.bankDetails = bankDetails
        }

        const userData = await UserService.updateUser({ updateUser, userId: id })
        if (!userData) {
            return errorResponse(res, 401, 'user update faild')
        }

        return successResponse(res, 201, { userData, message: 'user updated successfully' })

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, error.message)

    }
})


router.get('/v1/getusers', async (req, res) => {
    try {
        const userDatas = await UserService.getUsers()
        return successResponse(res, 201, userDatas)

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, error.message)
    }
})
router.get('/v1/user/:id', async (req, res) => {

    const { id } = req.params
    // console.log(id);
    try {
        const userData = await UserService.getUser(id)
        return successResponse(res, 201, userData)

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, error.message)
    }
})


export default router