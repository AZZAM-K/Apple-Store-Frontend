import { useState } from 'react'
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineHeart,
} from 'react-icons/ai'
import { FaBars, FaApple } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Sidebar from './Sidebar'
import CartQty from './CartQty'
import { useDispatch, useSelector } from 'react-redux'
import { useSignOutMutation } from '../app/api/usersApiSlice'
import { logout } from '../app/slices/userSlice'
import FavoritesCount from './FavoritesCount'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.user)
  const [showSidebar, setShowSidebar] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [signOut] = useSignOutMutation()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut().unwrap()
      toast.success('Successfully signed out')
      dispatch(logout())
      navigate('/')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const toggleDropdown = () => setDropdown(!dropdown)

  return (
    <nav className='bg-black text-white flex justify-between items-center p-4 fixed w-full z-10 top-0 border-b-2 border-white'>
      <div className='flex items-center'>
        <FaApple size={40} onClick={() => navigate('/')} />
      </div>
      <div className='md:flex space-x-8 items-center ml-10 justify-between font-medium hidden'>
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
      <div className='md:flex items-center space-x-4 font-medium hidden relative'>
        {!userInfo ? (
          <>
            <Link
              className='flex items-center text-white hover:text-[#0071E3]'
              to='/login'
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
        ) : (
          <>
            <button
              onClick={toggleDropdown}
              className='flex items-center bg-black outline-none text-white hover:text-[#0071E3]'
            >
              <AiOutlineUser className='mr-2' size={30} />
              {userInfo?.name}
              <span className='ml-2'>{dropdown ? '▲' : '▼'}</span>{' '}
            </button>
            {dropdown && userInfo && (
              <ul className='absolute -right-10 mt-2 mr-14 space-y-2 bg-black text-white top-12 rounded-md shadow-lg z-10'>
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
                    onClick={handleSignOut}
                    className='block w-full px-4 py-2 text-left hover:text-[#0071E3]'
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </>
        )}
      </div>
      <div className='flex items-center md:hidden z-20'>
        {showSidebar ? (
          <AiOutlineClose size={30} onClick={() => setShowSidebar(false)} />
        ) : (
          <FaBars size={30} onClick={() => setShowSidebar(true)} />
        )}
      </div>
      <Sidebar isShow={showSidebar} />
    </nav>
  )
}

export default Navbar
