import express from 'express'
import { errorResponse, successResponse } from '../utils/response.util.js';
import InvestmentService from '../services/investment.service.js';
import { verifyUser } from '../middleware/verifyUser.js';
import { InvestmentCreatedMessage } from '../events/producer.js';

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

router.get('/v1/investment', async (req, res) => {
    try {

        const Investments = await InvestmentService.Investments()
        return successResponse(res, 200, Investments)
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, 'Internal server error')
    }
})

router.put('/v1/investment/:id', async (req, res) => {
    const { id } = req.params    
    const {status} = req.body
    
    try {

        const updateStatus = await InvestmentService.UpdateStatus({ id,status })
        return successResponse(res, 200, updateStatus)

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, 'Internal server error')
    }
})

export default router