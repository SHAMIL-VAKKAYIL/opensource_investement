import express from 'express'
import WalletService from '../services/wallet.service.js'
import { errorResponse, successResponse } from '../utils/response.util.js'
import { verifyUser } from '../middleware/verifyUser.js'
import { withdrawalEvent } from '../events/producer.js'

const router = express.Router()


router.post('/v1/withdraw', verifyUser, async (req, res) => {
    const userId = req.userId
    const { amount } = req.body
    try {

        const withdrawData = await WalletService.createWithdrawal({ amount, userId })

        if (withdrawData.status === 'failed') {
            return errorResponse(res, 400, 'withdrawal faild')
        }
        await withdrawalEvent({ userId, message: `successfully withdraw the ${amount}`, type: 'withdrawal' })
        return successResponse(res, 201, `successfully withdraw the ${amount}`)
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, 'server err')

    }
})
router.get('/v1/withdraw', verifyUser, async (req, res) => {
    const userId = req.userId
    try {
        const withdrawls = await WalletService.getAllWithdrawals(userId)
        return successResponse(res, 200, withdrawls)
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, 'server err')

    }
})

router.get('/v1/getTransaction', verifyUser, async (req, res) => {
    const userId = req.userId

    try {
        const transactions = await WalletService.getTransactions(userId)
        return successResponse(res, 200, transactions)

    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, 'server err')
    }
})

export default router