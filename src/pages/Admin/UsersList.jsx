import { useEffect, useState } from 'react'
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '../../app/api/usersApiSlice'
import { toast } from 'react-toastify'
import Navbar from '../../components/Navbar'

const UsersList = () => {
  const { data: users, refetch, isLoading, error } = useGetAllUsersQuery()

  const [deleteUser] = useDeleteUserMutation()

  const [editableUserId, setEditableUserId] = useState(null)
  const [editableUserName, setEditableUserName] = useState('')
  const [editableUserEmail, setEditableUserEmail] = useState('')

  const [updateUser] = useUpdateUserMutation()

  useEffect(() => {
    refetch()
  }, [refetch])

  const deleteHandler = async id => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id)
        toast.success('User deleted successfully')
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id)
    setEditableUserName(username)
    setEditableUserEmail(email)
  }

  const updateHandler = async id => {
    try {
      await updateUser({
        userId: id,
        name: editableUserName,
        email: editableUserEmail,
      })
      setEditableUserId(null)
      toast.success('User updated successfully')
      refetch()
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <>
      <Navbar />
      <div className='p-4 mt-10'>
        <h1 className='text-2xl font-semibold mb-4 text-white mt-10'>Users</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className='flex flex-col md:flex-row'>
            {/* <AdminMenu /> */}
            <table className='w-full md:w-4/5 mx-auto bg-gray-500 border rounded-lg shadow-lg border-collapse'>
              <thead className='bg-blue-500 text-white rounded-lg'>
                <tr>
                  <th className='px-4 py-2 text-left'>ID</th>
                  <th className='px-4 py-2 text-left'>NAME</th>
                  <th className='px-4 py-2 text-left'>EMAIL</th>
                  <th className='px-4 py-2 text-left'>ADMIN</th>
                  <th className='px-4 py-2'></th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className='border-b text-white text-lg'>
                    <td className='px-4 py-2'>{user._id}</td>
                    <td className='px-4 py-2'>
                      {editableUserId === user._id ? (
                        <div className='flex items-center'>
                          <input
                            type='text'
                            value={editableUserName}
                            onChange={e => setEditableUserName(e.target.value)}
                            className='w-full p-2 rounded-lg bg-white focus:outline-none focus:ring-3 focus:ring-blue-500 text-black'
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className='flex items-center'>
                          {user.name}{' '}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.name, user.email)
                            }
                          >
                            <FaEdit className='ml-[1rem]' />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className='px-4 py-2'>
                      {editableUserId === user._id ? (
                        <div className='flex items-center'>
                          <input
                            type='text'
                            value={editableUserEmail}
                            onChange={e => setEditableUserEmail(e.target.value)}
                            className='w-full p-2 rounded-lg bg-white focus:outline-none focus:ring-3 focus:ring-blue-500 text-black'
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className='flex items-center'>
                          <a href={`mailto:${user.email}`}>{user.email}</a>{' '}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.name, user.email)
                            }
                          >
                            <FaEdit className='ml-[1rem]' />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className='px-4 py-2'>
                      {user.isAdmin ? (
                        <FaCheck style={{ color: 'green' }} />
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td className='px-4 py-2'>
                      {!user.isAdmin && (
                        <div className='flex'>
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default UsersList
