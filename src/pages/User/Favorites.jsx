import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux'
import FavoriteProduct from '../Products/FavoriteProduct'

const Favorites = () => {
  const favorites = useSelector(state => state.favorite)

  return (
    <>
      <Navbar />
      <div className='px-5 mt-25 md:px-10 lg:px-20 xl:px-30 mb-20'>
        <h1 className='md:text-5xl text-3xl font-bold text-center text-white mb-5'>
          Favorites
        </h1>
        {favorites.length === 0 ? (
          <div className='flex items-center justify-center mt-10'>
            <p className='text-white text-2xl font-medium'>No favorites yet</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10'>
            {favorites.map(fav => (
              <FavoriteProduct key={fav._id} favorite={fav} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Favorites
