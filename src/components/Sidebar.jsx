import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineHeart,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useSignOutMutation } from '../app/api/usersApiSlice'
import { logout } from '../app/slices/userSlice'
import { useState } from 'react'
import FavoritesCount from './FavoritesCount'
import CartQty from './CartQty'

const Sidebar = ({ isShow }) => {
  const dispatch = useDispatch()
  const [signOut] = useSignOutMutation()
  const { userInfo } = useSelector(state => state.user)
  const [dropdown, setDropdown] = useState(false)

  const toggleDropdown = () => setDropdown(!dropdown)

  const handleLogout = async () => {
    try {
      await signOut().unwrap()
      dispatch(logout())
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <nav
      className={`bg-black fixed right-0 top-1 ${
        !isShow && 'right-[-100%]'
      } transition-all ease-out duration-300 h-screen flex md:hidden z-10 flex-col justify-between p-6 text-white font-medium`}
    >
      <div className='flex flex-col space-y-6 mt-12'>
        <Link
          className='flex items-center text-white hover:text-[#0071E3]'
          to={'/'}
        >
          <AiOutlineHome className='mr-2' size={30} />
          Home
        </Link>
        <Link
          className='flex items-center text-white hover:text-[#0071E3]'
          to={'/shop'}
        >
          <AiOutlineShopping className='mr-2' size={30} />
          Shop
        </Link>
        <Link
          className='flex items-center text-white hover:text-[#0071E3] relative'
          to={'/favorites'}
        >
          <AiOutlineHeart className='mr-2' size={30} />
          Favorites
          <FavoritesCount />
        </Link>
        <Link
          className='flex items-center text-white hover:text-[#0071E3] relative'
          to={'/cart'}
        >
          <AiOutlineShoppingCart className='mr-2' size={30} />
          Cart
          <CartQty />
        </Link>
      </div>
      <div className='flex-col space-y-6 relative'>
        {userInfo ? (
          <>
            <button
              onClick={toggleDropdown}
              className='flex items-center text-white hover:text-[#0071E3] outline-none bg-black'
            >
              <AiOutlineUser className='mr-2' size={30} />
              {userInfo?.name}
              <span className='ml-2'>{dropdown ? '▲' : '▼'}</span>{' '}
            </button>
            {dropdown && (
              <ul className='space-y-2 text-white ml-3'>
                {userInfo.isAdmin && (
                  <>
                    <li>
                      <Link
                        to='/admin/products'
                        className='block px-4 py-2 hover:text-[#0071E3]'
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/admin/orders'
                        className='block px-4 py-2 hover:text-[#0071E3]'
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/admin/users'
                        className='block px-4 py-2 hover:text-[#0071E3]'
                      >
                        Users
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <Link
                    to='/profile'
                    className='block px-4 py-2 hover:text-[#0071E3]'
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to='/my-orders'
                    className='block px-4 py-2 hover:text-[#0071E3]'
                  >
                    My orders
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className='block w-full px-4 py-2 text-left hover:text-[#0071E3]'
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </>
        ) : (
          <>
            <Link
              className='flex items-center text-white hover:text-[#0071E3]'
              to={'/login'}
            >
              <AiOutlineLogin className='mr-2' size={30} />
              Login
            </Link>
            <Link
              className='flex items-center text-white hover:text-[#0071E3]'
              to={'/register'}
            >
              <AiOutlineUserAdd className='mr-2' size={30} />
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Sidebar
