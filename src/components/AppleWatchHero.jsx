import hero from '../assets/hero_apple_watch_large.jpg'
import PayButton from './PayButton'

const AppleWatchHero = () => {
  return (
    <div
      className='h-screen bg-cover bg-center flex items-start justify-center text-center text-black'
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className='mt-50'>
        <h1 className='text-4xl md:text-6xl font-semibold mb-4'>
          Apple Watch Series 9
        </h1>
        <p className='text-xl md:text-2xl mb-6'>Smarter. Brighter. Mightier.</p>
        <span
          className='bg-white text-black font-semibold py-2 px-4 border-2 border-black rounded-full 
        hover:bg-gray-200 transition'
        >
          Coming Soon
        </span>
      </div>
    </div>
  )
}

export default AppleWatchHero
