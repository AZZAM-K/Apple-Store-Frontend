import hero from '../assets/hero_iphone_medium.jpg'
import { useNavigate } from 'react-router-dom'

const IPhoneHero = () => {
  const navigate = useNavigate()

  return (
    <div
      className='h-screen bg-cover bg-center text-white flex items-start justify-center text-center'
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className='mt-50'>
        <h1 className='text-6xl font-bold text-black mb-3'>iPhone</h1>
        <p className='text-2xl md:text-3xl mb-6 text-blue-400'>
          Meet the iPhone 16 family.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className='bg-white text-black font-semibold py-2 px-4 border-2 border-black rounded-full hover:bg-gray-200 transition'
        >
          Learn More
        </button>
      </div>
    </div>
  )
}

export default IPhoneHero
