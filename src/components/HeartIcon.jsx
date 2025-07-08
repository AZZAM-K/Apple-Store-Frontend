import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from '../app/slices/favoriteSlice'
import {
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
  addFavoriteToLocalStorage,
} from '../app/utils/localStorage'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.favorite)
  const isFavorite = favorites.some(fav => fav._id === product._id)

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
    dispatch(setFavorites(favoritesFromLocalStorage))
  }, [dispatch])

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product._id))
      removeFavoriteFromLocalStorage(product._id)
      toast.error(`${product.name} removed from favorites`)
    } else {
      dispatch(addToFavorites(product))
      addFavoriteToLocalStorage(product)
      toast.success(`${product.name} added to favorites`)
    }
  }

  return (
    <div onClick={toggleFavorite} className='cursor-pointer'>
      {isFavorite ? (
        <FaHeart color='red' size={30} />
      ) : (
        <FaRegHeart color='red' size={30} />
      )}
    </div>
  )
}

export default HeartIcon
