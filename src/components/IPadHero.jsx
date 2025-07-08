import hero from '../assets/hero_ipadpro_large.jpg'

const IPadHero = () => {
  return (
    <div
      className='h-screen bg-cover bg-center text-white flex items-start justify-center text-center'
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className='mt-50'>
        <h1 className='text-5xl md:text-6xl font-bold mb-4'>iPad Pro</h1>
        <p className='text-xl md:text-2xl mb-6'>Supercharged by M2.</p>
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

export default IPadHero
