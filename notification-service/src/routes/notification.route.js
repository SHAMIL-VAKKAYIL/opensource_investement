import express from 'express'
import { errorResponse, successResponse } from '../utils/response.util';
import NotificationService from '../service/notification.service';

const router = express.Router()

router.get('/user/:id', async (req, res) => {
    const { id } = req.params
    try {
        const notifications = await NotificationService.getNotficationByUser(id)
        return successResponse(res, 201, notifications)
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, 'Internal server error')
    }
})

router.put('/viewed/:id', async (req, res) => {
    const { id } = req.params

    try {
        const updateNotification = await NotificationService.viewNotification(id)
        return successResponse(res, 201, updateNotification)

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, 'Internal server error')
    }
})


export default router