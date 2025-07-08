import { useState } from 'react'
import { useNavigate } from 'react-router'
import HeartIcon from '../../components/HeartIcon'
import Stars from '../../components/Stars'

const IPhoneCard = ({ iPhone }) => {
  const [color, setColor] = useState(iPhone.images[0].color)
  const [image, setImage] = useState(iPhone.images[0].img)
  const [price, setPrice] = useState(iPhone.memory[0].price)
  const navigate = useNavigate()

  const changePrice = e => setPrice(e.target.value)

  return (
    <div className='bg-white rounded-lg shadow-md p-5 group flex flex-col justify-between'>
      <img
        src={image}
        alt={iPhone.name}
        className='w-full rounded-lg mb-4 group-hover:-translate-y-4 transition-transform duration-300 ease-in-out'
      />
      <div className='flex gap-2 mb-4'>
        {iPhone.images.map(m => (
          <div
            key={m.color}
            className={`h-10 w-10 rounded-full cursor-pointer ${
              color === m.color ? 'border-3 border-blue-500' : ''
            }`}
            style={{ backgroundColor: m.color }}
            onClick={() => {
              setColor(m.color)
              setImage(m.img)
            }}
          ></div>
        ))}
      </div>
      <h2 className='text-3xl font-bold text-gray-800'>{iPhone.name}</h2>
      <div className='flex items-center mt-2'>
        <Stars rating={iPhone.rating} />
      </div>
      <div className='flex items-center mt-3 gap-2 flex-wrap'>
        <select
          onChange={changePrice}
          value={price}
          className='border border-gray-300 max-w-full rounded-md px-2 py-1 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-md'
        >
          {iPhone.memory.map(m => (
            <option key={m._id} value={m.price}>
              {m.rom} ROM - {m.ram} RAM
            </option>
          ))}
        </select>
        <span className='text-black text-xl ml-2'>{price}$</span>
      </div>
      <div className='flex items-center justify-between gap-1 mt-5'>
        <button
          className='bg-blue-500 rounded-lg text-white cursor-pointer active:scale-105 transition-transform
         duration-150 ease-in px-4 py-2 hover:bg-blue-600 font-semibold text-lg'
          onClick={() => navigate(`/iPhone/${iPhone._id}`)}
        >
          See More
        </button>
        <HeartIcon product={iPhone} />
      </div>
    </div>
  )
}

export default IPhoneCard
