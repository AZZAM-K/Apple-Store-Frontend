import { useSelector } from 'react-redux'

const FavoritesCount = () => {
  const favorites = useSelector(state => state.favorite)
  const count = favorites.length

  return (
    <div className='absolute -top-4 left-5'>
      {count > 0 && (
        <span className='bg-blue-500 text-white rounded-full  px-1.5 py-0.5 text-xs font-bold'>
          {count}
        </span>
      )}
    </div>
  )
}

export default FavoritesCount
