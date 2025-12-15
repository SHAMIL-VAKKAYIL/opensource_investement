import express from 'express'
import { errorResponse, successResponse } from '../utils/response.util.js';
import NotificationService from '../service/notification.service.js';
import { verifyUser } from '../middleware/verifyUser.js';

const router = express.Router()

router.get('/v1/user/:id', verifyUser, async (req, res) => {
    const { id } = req.params
    try {
        const notifications = await NotificationService.getNotficationByUser(id)
        return successResponse(res, 200, notifications)
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, 'Internal server error')
    }
})

router.put('/v1/viewed/:id', verifyUser, async (req, res) => {
    const { id } = req.params

    try {
        const updateNotification = await NotificationService.viewNotification(id)
        return successResponse(res, 200, updateNotification)

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, 'Internal server error')
    }
})


export default router