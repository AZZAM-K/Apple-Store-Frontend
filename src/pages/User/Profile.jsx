import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setUserInfo } from '../../app/slices/userSlice'
import { useUpdateProfileMutation } from '../../app/api/usersApiSlice'
import Navbar from '../../components/Navbar'
import Loader from '../../components/Loader'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector(state => state.user)
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const [user, setUser] = useState({
    name: userInfo.name || '',
    email: userInfo.email || '',
    password: '',
  })
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if (userInfo) {
      setUser({
        name: userInfo.name,
        email: userInfo.email,
      })
    }
  }, [dispatch, userInfo])

  const handleUpdate = async e => {
    e.preventDefault()
    if (user.password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
      const res = await updateProfile(user).unwrap()
      dispatch(setUserInfo({ ...res }))
      navigate('/')
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error(error.data.message || error.error)
    }
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto p-4 mt-[10rem]'>
        <div className='flex justify-center align-center md:flex md:space-x-4'>
          <div className='md:w-1/3'>
            <h2 className='text-2xl font-semibold mb-4 text-white'>
              Update Profile
            </h2>
            <form onSubmit={handleUpdate}>
              <div className='mb-4'>
                <label className='block text-white mb-2'>Name</label>
                <input
                  type='text'
                  placeholder='Enter name'
                  className='form-input p-4 rounded-sm w-full bg-white focus:outline-none focus:ring-3 focus:ring-blue-500'
                  value={user.name}
                  onChange={e => setUser({ ...user, name: e.target.value })}
                  required
                />
              </div>

              <div className='mb-4'>
                <label className='block text-white mb-2'>Email Address</label>
                <input
                  type='email'
                  placeholder='Enter email'
                  className='form-input p-4 rounded-sm w-full bg-white focus:outline-none focus:ring-3 focus:ring-blue-500'
                  value={user.email}
                  onChange={e => setUser({ ...user, email: e.target.value })}
                  required
                />
              </div>

              <div className='mb-4'>
                <label className='block text-white mb-2'>Password</label>
                <input
                  type='password'
                  placeholder='Enter password'
                  className='form-input p-4 rounded-sm w-full bg-white focus:outline-none focus:ring-3 focus:ring-blue-500'
                  value={user.password}
                  onChange={e => setUser({ ...user, password: e.target.value })}
                  required
                />
              </div>

              <div className='mb-4'>
                <label className='block text-white mb-2'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  placeholder='Confirm password'
                  className='form-input p-4 rounded-sm w-full bg-white focus:outline-none focus:ring-3 focus:ring-blue-500'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <button
                  type='submit'
                  className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-300'
                >
                  Update
                </button>
              </div>
              {isLoading && <Loader />}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
