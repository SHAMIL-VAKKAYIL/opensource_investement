import express from "express";
import UserService from "../services/user.service.js";
import { errorResponse, successResponse } from "../utils/response.util.js";

const router = express.Router()


router.put('/v1/addData/:id', async (req, res) => {
    const { name, address, phone } = req.body
    const id = req.params

    try {
        let addUserData ={}

        if(name){
            addUserData.name=name
        }
        if(address){
            addUserData.address=address
        }
        if(phone){
            addUserData.phone=phone
        }

        const addedUser = await UserService.addingUserData({addUserData,userId:id})
        return successResponse(res, 201, { addedUser, message: 'succefully add user data ' })

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, error.message)
    }
})

router.put('/v1/update/:id', async (req, res) => {
    const { name, address } = req.body
    const id = req.params
    try {
        let updateUser = {}

        if (name) {
            updateUser.name = name
        }

        if (address) {
            updateUser.address = address
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



export default router