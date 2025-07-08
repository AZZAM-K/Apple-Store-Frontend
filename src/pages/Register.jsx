import { useEffect, useState } from 'react'
import { useSignUpMutation } from '../app/api/usersApiSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import Loader from '../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { setUserInfo } from '../app/slices/userSlice'
import Navbar from '../components/Navbar'

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [signUp, { isLoading }] = useSignUpMutation()
  const navigate = useNavigate()
  const { userInfo } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate])

  const submitHandler = async e => {
    e.preventDefault()
    if (user.password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
      const res = await signUp(user).unwrap()
      toast.success('User registered successfully!')
      dispatch(setUserInfo({ ...res }))
      navigate('/')
    } catch (error) {
      toast.error(error.data.message)
    }
  }

  return (
    <>
      <Navbar />
      <section className='pl-[10rem] flex flex-wrap bg-[#1d1d1f] h-screen'>
        <div className='mr-[4rem] mt-[5rem]'>
          <h1 className='text-2xl font-semibold mb-4 text-white'>Register</h1>

          <form onSubmit={submitHandler} className='container w-[40rem]'>
            <div className='my-[2rem]'>
              <label
                htmlFor='name'
                className='block text-lg font-medium text-white'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                className='mt-1 p-3 border rounded w-full bg-white focus:outline-none focus:ring-3 focus:ring-blue-500'
                placeholder='Enter name'
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
                required
              />
            </div>

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
                className='mt-1 p-3 border rounded w-full bg-white focus:outline-none focus:ring-3 focus:ring-blue-500'
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
                className='mt-1 p-3 border rounded w-full bg-white focus:outline-none focus:ring-3 focus:ring-blue-500'
                placeholder='Enter password'
                value={user.password}
                onChange={e => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>

            <div className='my-[2rem]'>
              <label
                htmlFor='confirmPassword'
                className='block text-lg font-medium text-white'
              >
                Confirm Password
              </label>
              <input
                type='password'
                id='confirmPassword'
                className='mt-1 p-3 border rounded w-full bg-white focus:outline-none focus:ring-3 focus:ring-blue-500'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              disabled={isLoading}
              type='submit'
              className='bg-[#0071E3] text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className='mt-4'>
            <p className='text-lg text-white'>
              Already have an account?{' '}
              <Link to={'/login'} className='text-blue-500 hover:underline'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
export default Register
