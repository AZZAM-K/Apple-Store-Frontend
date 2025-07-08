import { useCreateCheckoutSessionMutation } from '../app/api/paymentApiSlice'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const PayButton = ({ items, orderId }) => {
  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation()

  const handlePay = async () => {
    if (isLoading) return

    try {
      const stripe = await stripePromise
      const response = await createCheckoutSession({ items, orderId }).unwrap()

      const result = await stripe.redirectToCheckout({
        sessionId: response.id,
      })

      if (result.error) {
        console.error(result.error.message)
      }
    } catch (error) {
      console.error('Error during payment:', error)
    }
  }

  return (
    <button
      className='bg-blue-500 text-white px-4 py-2 rounded mt-4 cursor-pointer hover:bg-blue-600 active:scale-95 
      transition-transform duration-150 ease-in'
      onClick={handlePay}
      disabled={isLoading}
    >
      Pay
    </button>
  )
}

export default PayButton
