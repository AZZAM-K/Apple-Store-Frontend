import { useSelector } from 'react-redux'

const CartQty = () => {
  const cartItems = useSelector(state => state.cart.cartItems)
  const qty = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  return (
    <div className='absolute -top-4 left-5'>
      {qty > 0 && (
        <span className='bg-blue-500 text-white rounded-full  px-1.5 py-0.5 text-xs font-bold'>
          {qty}
        </span>
      )}
    </div>
  )
}

export default CartQty
