import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../../lib/stripe'
import { useAppSelector } from '../../store/hook'
import PaymentForm from '../../components/common/PaymentForm'
import type { RootState } from '../../store/store'
// import PaymentForm from './PaymentForm'

const PaymentPage = () => {
    const clientSecret = useAppSelector(
        (state: RootState) => state.payment.clientSecret
    )
    console.log(clientSecret);
    

    if (!clientSecret) {
        return (
            <div className="text-white text-center mt-10">
                Initializing payment...
            </div>
        )
    }

    return (
        <Elements
            stripe={stripePromise}
            options={{ clientSecret }}
        >
            <PaymentForm />
        </Elements>
    )
}

export default PaymentPage
