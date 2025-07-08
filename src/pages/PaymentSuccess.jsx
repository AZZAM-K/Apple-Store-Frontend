import Navbar from '../components/Navbar'
import { usePayOrderMutation } from '../app/api/orderApiSlice'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
  const [payOrder, { isLoading, isSuccess, isError }] = usePayOrderMutation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    if (orderId) {
      payOrder(orderId)
    }
  }, [orderId, payOrder])

  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-center items-center h-screen'>
        {isLoading && (
          <h1 className='text-3xl font-bold text-green-500'>
            Processing Payment...
          </h1>
        )}
        {isSuccess && (
          <>
            <h1 className='text-3xl font-bold text-green-500'>
              Payment Successful!
            </h1>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded mt-4 cursor-pointer hover:bg-blue-600 active:scale-95 
            transition-transform duration-150 ease-in'
              onClick={() => navigate(`/order/${orderId}`)}
            >
              Return to Order
            </button>
          </>
        )}
        {isError && (
          <h1 className='text-3xl font-bold text-red-500'>Payment Failed</h1>
        )}
      </div>
    </>
  )
}

export default PaymentSuccess
