import { useEffect, useState } from 'react'
import { useSignInMutation } from '../app/api/usersApiSlice'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router'
import { Link } from 'react-router'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../app/slices/userSlice'
import Navbar from '../components/Navbar'

const Login = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.user)
  const navigate = useNavigate()

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])

  const [user, setUser] = useState({ email: '', password: '' })
  const [signIn, { isLoading }] = useSignInMutation()

  const submitHandler = async e => {
    e.preventDefault()
    try {
      const res = await signIn(user).unwrap()
      toast.success('User logged in  successfully!')
      dispatch(setUserInfo({ ...res }))
      navigate('/')
    } catch (error) {
      toast.error(error.data.message)
    }
  }

  return (
    <>
      <Navbar />
      <section className='pl-[10rem] flex flex-wrap bg-[#1d1d1f] h-screen '>
        <div className='mr-[4rem] mt-[5rem]'>
          <h1 className='text-2xl font-semibold mb-4 text-white'>Login</h1>

          <form onSubmit={submitHandler} className='container w-[40rem]'>
            <div className='my-[2rem]'>
              <label
                htmlFor='email'
                className='block text-lg font-medium text-white'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                className='mt-1 p-3 border rounded w-full focus:outline-none focus:ring-3 focus:ring-blue-500 bg-white'
                placeholder='Enter email'
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>

            <div className='my-[2rem]'>
              <label
                htmlFor='password'
                className='block text-lg font-medium text-white'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                className='mt-1 p-3 border rounded w-full focus:outline-none focus:ring-3 focus:ring-blue-500 bg-white'
                placeholder='Enter password'
                value={user.password}
                onChange={e => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
            <button
              disabled={isLoading}
              type='submit'
              className='bg-[#0071E3] text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
            >
              {isLoading ? 'Logging...' : 'Login'}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className='mt-4'>
            <p className='text-lg text-white'>
              Don't have an account?{' '}
              <Link to={'/register'} className='text-blue-500 hover:underline'>
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
export default Login
