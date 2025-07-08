import Loader from '../../components/Loader'
import Navbar from '../../components/Navbar'
import { useGetMyOrdersQuery } from '../../app/api/orderApiSlice'
import { useNavigate } from 'react-router-dom'
import { FaCheck, FaTimes } from 'react-icons/fa'

const MyOrders = () => {
  const { data: orders, isLoading, isError } = useGetMyOrdersQuery()
  const navigate = useNavigate()

  if (isLoading)
    return (
      <div className='flex mt-50 justify-center items-center'>
        <Loader />
      </div>
    )

  if (isError)
    return <div className='flex justify-center mt-25'>Error loading orders</div>

  return (
    <>
      <Navbar />
      {orders && orders.length === 0 ? (
        <h1 className='text-center text-3xl font-bold mt-25 text-white'>
          You have no orders yet
        </h1>
      ) : (
        <div className='container mx-auto mt-25'>
          <table className='w-full md:w-4/5 mx-auto bg-gray-500 border rounded-lg shadow-lg border-collapse font-semibold'>
            <thead className='bg-blue-500 text-white rounded-lg'>
              <tr>
                <td className='px-4 py-2 text-left'></td>
                <td className='px-4 py-2 text-left'>DATE</td>
                <td className='px-4 py-2 text-left'>TOTAL</td>
                <td className='px-4 py-2 text-left'>PAID</td>
                <td className='px-4 py-2 text-left'>DELIVERED</td>
                <td className='px-4 py-2 text-left'></td>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td className='px-4 py-2'>Order {index + 1}</td>
                  <td className='px-4 py-2'>
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className='px-4 py-2'>{order.totalPrice}$</td>

                  <td className='py-2'>
                    {order.isPaid ? (
                      <FaCheck className='text-green-600' size={30} />
                    ) : (
                      <FaTimes className='text-red-600' size={30} />
                    )}
                  </td>

                  <td className='px-4 py-2'>
                    {order.isDelivered ? (
                      <FaCheck className='text-green-600' size={30} />
                    ) : (
                      <FaTimes className='text-red-600' size={30} />
                    )}
                  </td>

                  <td className='px-4 py-2'>
                    <button
                      className='bg-blue-500 py-2 px-3 rounded cursor-pointer hover:bg-blue-600 transition duration-300'
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default MyOrders
