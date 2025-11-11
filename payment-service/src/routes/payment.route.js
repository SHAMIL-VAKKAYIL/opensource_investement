import express from 'express'
import PaymentService from '../services/payment.service.js'
import { errorResponse, successResponse } from '../utils/response.util.js'
import { verifyUser } from '../middleware/verifyUser.js'
// import { withdrawalEvent } from '../events/producer.js'

const router = express.Router()


router.post('/v1/deposit', verifyUser, async (req, res) => {
    const userId = req.userId
    const { amount } = req.body
    try {

        const paymentIntent = await PaymentService.walletDeposit({ userId, amount })
        console.log(paymentIntent);

        return successResponse(res, 201, paymentIntent)


    } catch (error) {

        console.log(error)
        return errorResponse(res, 500, 'server err')

    }

})

router.post('/v1/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    try {

        const webhook = await PaymentService.handleWebHook({req})

        return successResponse(res, 201, webhook)


    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, 'server err')
    }
})

export default router