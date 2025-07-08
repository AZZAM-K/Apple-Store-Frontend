import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { removeFromFavorites } from '../../app/slices/favoriteSlice'
import { removeFavoriteFromLocalStorage } from '../../app/utils/localStorage'

const FavoriteProduct = ({ favorite }) => {
  let urlPath
  const navigate = useNavigate()
  const dispatch = useDispatch()

  switch (true) {
    case favorite.name.includes('iPhone'):
      urlPath = `/iPhone/${favorite._id}`
      break
    case favorite.name.includes('iPad'):
      urlPath = `/iPad/${favorite._id}`
      break
    case favorite.name.includes('MacBook'):
      urlPath = `/MacBook/${favorite._id}`
      break
    case favorite.name.includes('Apple Watch'):
      urlPath = `/AppleWatch/${favorite._id}`
      break
  }

  const handleRemoveFromFavorites = id => {
    dispatch(removeFromFavorites(id))
    removeFavoriteFromLocalStorage(id)
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-5 flex flex-col justify-between'>
      <img
        src={favorite.images[0].img}
        alt={favorite.name}
        className='w-full rounded-lg mb-4'
      />
      <h2 className='text-3xl font-bold text-gray-800'>{favorite.name}</h2>
      <div className='flex items-center gap-5 mt-3'>
        <button
          className='bg-blue-500 rounded-lg text-white cursor-pointer active:scale-105 transition-transform
         duration-150 ease-in px-4 py-2 hover:bg-blue-600 font-semibold text-lg'
          onClick={() => navigate(urlPath)}
        >
          See More
        </button>
        <button
          className='bg-red-500 rounded-lg text-white cursor-pointer active:scale-105 transition-transform
         duration-150 ease-in px-4 py-2 hover:bg-red-600 font-semibold text-lg'
          onClick={() => {
            handleRemoveFromFavorites(favorite._id)
            navigate('/favorites')
          }}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default FavoriteProduct
