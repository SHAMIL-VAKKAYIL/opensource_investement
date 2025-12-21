import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useAppDispatch, useAppSelector } from '../../store/hook'
import { clearPaymentState } from '../../features/payment/paymentSlice'
import type { RootState } from '../../store/store'

const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useAppDispatch()

    const { clientSecret, loading } = useAppSelector(
        (state: RootState) => state.payment
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements || !clientSecret) return

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/wallet`,
            },
        })
        console.log(result);
        

        if (result.error) {
            console.error(result.error.message)
        } else {
            dispatch(clearPaymentState())
        }
    }

    if (!clientSecret) return null

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button className='bg-black text-white px-5 py-3 rounded-2xl' disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay'}
            </button>
        </form>
    )
}

export default PaymentForm
