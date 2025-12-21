import stripe from "../config/stripe.js"
import { paymentSuccessfullEvent } from "../events/producer.js"

class PaymentService {

    async handleWebHook(req) {

        const sig = req.headers['stripe-signature']

        let event
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            )

        } catch (err) {
            console.error('Webhook signature failed:', err.message)
            throw new Error('Webhook signature failed', err.message)
        }

        if (event.type === 'payment_intent.succeeded') {
            
            const paymentIntent = event.data.object
            console.log(paymentIntent, 'webhook');
            const paymentIntentId = paymentIntent.id
            // const userId = paymentIntent.metadata.userId
            const userId = '693ed2bb32bac0efe8e8126d'
            
            const amount = paymentIntent.amount / 100
            console.log(`Payment succeeded for user ${userId}, amount: ${amount}`)
            //! Update wallet balance
            await paymentSuccessfullEvent({ userId, amount, paymentIntentId })
            return event
        }
    }

    async walletDeposit(data) {
        const { userId, amount } = data
        const amountInPaisa = Math.round(amount * 100)

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInPaisa,
            currency: 'aed',
            payment_method_types: ['card'],
            metadata: { userId }
        })

        return { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id }
    }

    async paymentRefund(data) {
        const { paymentIntentId } = data
        await stripe.refunds.create({
            payment_intent: paymentIntentId
        })

    }
}

export default new PaymentService

