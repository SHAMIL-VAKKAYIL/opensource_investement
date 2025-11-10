import express from 'express'
import { errorResponse, successResponse } from '../utils/response.util.js';
import InvestmentService from '../services/investment.service.js';
import { verifyUser } from '../middleware/verifyUser.js';
import { InvestmentCreatedMessage, withdrawalEvent } from '../events/producer.js';

const router = express.Router()

router.post('/v1/newInvestment', verifyUser, async (req, res) => {
    const { amount, planType, expectedReturn, durationDays } = req.body
    const userId = req.userId

    try {
        if (!userId || !amount || !planType || !expectedReturn || !durationDays) {
            errorResponse(res, 401, 'give valid infromations')
        }
        const investment = await InvestmentService.createInvestment({ userId, amount, planType, expectedReturn, durationDays })
        await InvestmentCreatedMessage({ userId, amount: investment.amount })
        await withdrawalEvent({ userId, message: `successfully invested the ${amount}`, type: 'investment' })

        return successResponse(res, 201, 'created investment')

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, 'Internal server error')
    }
})

router.get('/v1/active', async (req, res) => {
    try {
        const activeInvestments = await InvestmentService.activeInvestments()
        return successResponse(res, 200, activeInvestments)
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, 'Internal server error')
    }
})

export default router