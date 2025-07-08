import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import { Link } from 'react-router'
import { removeFromCart, clearCartItems } from '../app/slices/cartSlice'
import { toast } from 'react-toastify'
import { useCreateOrderMutation } from '../app/api/orderApiSlice'
import { useNavigate } from 'react-router'

const Cart = () => {
  const { userInfo } = useSelector(state => state.user)
  const { cartItems, totalPrice } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [placeOrder, { isLoading: loadingOrder }] = useCreateOrderMutation()

  const handleRemoveFromCart = itemId => {
    dispatch(removeFromCart({ id: itemId }))
    toast.success('Item removed from cart')
  }

  const clearCart = () => {
    dispatch(clearCartItems())
    toast.success('Cart cleared')
  }

  const handlePlaceOrder = async () => {
    if (!userInfo) {
      toast.error('Please log in to place an order')
      return
    }
    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    try {
      const { order } = await placeOrder({
        orderItems: cartItems,
        totalPrice,
        customerName: userInfo.name,
        customerEmail: userInfo.email,
      }).unwrap()
      dispatch(clearCartItems())
      toast.success('Order placed successfully')
      navigate(`/order/${order._id}`)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <>
      <Navbar />
      {cartItems.length === 0 ? (
        <>
          <h1 className='text-center text-3xl font-bold mt-25 text-white'>
            Your cart is empty
          </h1>
          <p className='text-center text-lg mt-8 text-white '>
            Go to{' '}
            <Link to='/shop' className='text-blue-500 hover:underline'>
              Shop
            </Link>{' '}
            to add items
          </p>
        </>
      ) : (
        <div className='container mx-auto mt-25'>
          <div className='flex justify-between items-center mb-5'>
            <h1 className='text-3xl font-bold text-white'>Your Cart</h1>
            <h1 className='text-2xl font-semibold text-white'>
              {totalItems} items
            </h1>
          </div>
          <div className='flex flex-col gap-1'>
            {cartItems.map(item => (
              <div
                key={item.productId}
                className='flex justify-between items-center gap-2 p-2 border-b border-gray-300 sm:flex-row flex-col bg-gray-800
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
                <div className='flex items-center gap-3'>
                  <button
                    className='bg-red-500 text-white px-2 py-1 rounded cursor-pointer
                     hover:bg-red-600 active:scale-95 transition-transform duration-150 ease-in'
                    onClick={() => handleRemoveFromCart(item.productId)}
                  >
                    Remove
                  </button>
                  <p className='text-lg font-semibold text-white'>
                    ${item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-between items-center mt-5'>
            <h2 className='text-2xl font-semibold text-white'>Total Price:</h2>
            <p className='text-2xl font-semibold text-white'>${totalPrice}</p>
          </div>
          <div className='flex gap-2 mt-5'>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded'
              onClick={handlePlaceOrder}
              disabled={loadingOrder}
            >
              Place Order
            </button>
            <button
              className='bg-red-500 text-white px-4 py-2 rounded ml-2'
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
