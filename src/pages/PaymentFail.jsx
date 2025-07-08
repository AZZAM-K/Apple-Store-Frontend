import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate, useSearchParams } from 'react-router-dom'

const PaymentFail = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-3xl font-bold text-red-500'>Payment Failed</h1>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded mt-4 cursor-pointer hover:bg-blue-600 active:scale-95 
        transition-transform duration-150 ease-in'
          onClick={() => navigate(`/order/${orderId}`)}
        >
          Return to Order
        </button>
      </div>
    </>
  )
}

export default PaymentFail
