import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import {
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useDeliverOrderMutation,
} from '../app/api/orderApiSlice'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import PayButton from '../components/PayButton'

const Order = () => {
  const { id } = useParams()
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(id)
  const [deliverOrder] = useDeliverOrderMutation()
  const [deleteOrder] = useDeleteOrderMutation()
  const { userInfo } = useSelector(state => state.user)
  const navigate = useNavigate()

  const cancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await deleteOrder(id).unwrap()
        toast.success('Order cancelled successfully')
        navigate('/my-orders')
      } catch (error) {
        console.error('Failed to cancel order:', error)
        toast.error(error.message)
      }
    }
  }

  const handleDeliver = async () => {
    try {
      await deliverOrder(id).unwrap()
      toast.success('Order delivered successfully')
      navigate(`/order/${id}`)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (!userInfo) {
      toast.error('Please log in to view your order')
      navigate('/')
    }
  }, [userInfo, navigate])

  if (isLoading) {
    return (
      <div className='flex mt-50 justify-center items-center'>
        <Loader />
      </div>
    )
  }

  if (isError) {
    toast.error(
      'You are not authorized to view this order or it does not exist'
    )
    navigate('/')
    return null
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto mt-25'>
        <div className='mb-5'>
          <p className='text-lg font-bold text-white'>
            Order Total: ${order.totalPrice.toFixed(2)}
          </p>
        </div>
        <div className='flex justify-between items-center mb-5'>
          <p className='text-white text-lg'>
            Customer Name:{' '}
            <span className='text-blue-500'>{order.customerName}</span>
          </p>
          <a
            href={`mailto:${order.customerEmail}`}
            className='text-white text-lg'
          >
            Customer Email:{' '}
            <span className='text-blue-500'>{order.customerEmail}</span>
          </a>
        </div>
        <div className='flex flex-col gap-1'>
          {order.orderItems.map(item => (
            <div
              key={item.productId}
              className='flex justify-between items-center gap-2 p-3 border-b border-gray-300 sm:flex-row flex-col bg-gray-800
               rounded-lg mb-4'
            >
              <div className='flex items-center'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-20 h-20 mr-4'
                />
                <div>
                  <h2 className='text-lg font-semibold text-white'>
                    {item.name}
                  </h2>
                  <p className='text-gray-600'>
                    {item.memory.rom} - {item.memory.ram}
                  </p>
                </div>
                <div
                  className='h-7 w-7 rounded-full border border-gray-300 ml-3'
                  style={{ backgroundColor: item.color }}
                ></div>
              </div>
              <h2 className='text-lg font-semibold text-white'>
                ${item.price} x {item.quantity}
              </h2>
              <div className='flex items-center gap-2'>
                <p className='text-lg font-semibold text-white'>
                  ${item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex items-center gap-6'>
          {order.isPaid ? (
            <p className='text-white text-lg font-semibold mt-4'>
              Payment Status: <span className='text-green-500'>Paid</span>
            </p>
          ) : !userInfo.isAdmin ? (
            <>
              <PayButton orderId={order._id} items={order.orderItems} />
              <button
                className='bg-red-500 text-white px-4 py-2 rounded mt-4 cursor-pointer hover:bg-red-600 active:scale-95
             transition-transform duration-150 ease-in'
                onClick={cancelOrder}
              >
                Cancel Order
              </button>
            </>
          ) : (
            <p className='text-white text-lg font-semibold mt-4'>
              Payment Status: <span className='text-red-500'>Not Paid</span>
            </p>
          )}
        </div>
        {order.isDelivered ? (
          <p className='text-green-500 text-lg font-semibold mt-4'>
            Delivery Status: Delivered
          </p>
        ) : !userInfo.isAdmin ? (
          <p className='text-white text-lg font-semibold mt-4'>
            Delivery Status: <span className='text-red-500'>Not Delivered</span>
          </p>
        ) : (
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded mt-4 cursor-pointer hover:bg-blue-600 active:scale-95 
          transition-transform duration-150 ease-in disabled:bg-blue-300 disabled:cursor-not-allowed disabled:active:scale-100'
            disabled={!order.isPaid}
            onClick={handleDeliver}
          >
            Deliver Order
          </button>
        )}
      </div>
    </>
  )
}

export default Order
