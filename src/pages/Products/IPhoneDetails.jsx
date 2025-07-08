import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useGetIphoneByIdQuery } from '../../app/api/iphoneApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Navbar from '../../components/Navbar'
import moment from 'moment'
import {
  FaWeight,
  FaMobile,
  FaCalendar,
  FaBatteryFull,
  FaMicrochip,
  FaCamera,
} from 'react-icons/fa'
import ProductReviews from './ProductReviews'
import { addToCart } from '../../app/slices/cartSlice'
import { toast } from 'react-toastify'

const IPhoneDetails = () => {
  const { id } = useParams()
  const {
    data: iPhone,
    isLoading,
    isError,
    refetch,
  } = useGetIphoneByIdQuery(id)
  const [color, setColor] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const { cartItems } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const isInCart = cartItems.find(item => item.productId === iPhone?._id)

  useEffect(() => {
    if (iPhone?.images?.length > 0) {
      setColor(iPhone?.images[0]?.color)
      setImage(iPhone?.images[0]?.img)
      setPrice(iPhone?.memory[0]?.price)
    }
  }, [iPhone])

  const changePrice = e => setPrice(Number(e.target.value))
  const changeQuantity = e => setQuantity(Number(e.target.value))
  const handleAddToCart = () => {
    const selectedMemory = iPhone.memory.find(m => m.price === price)
    dispatch(
      addToCart({
        productId: iPhone._id,
        name: iPhone.name,
        image,
        price,
        quantity,
        color,
        memory: selectedMemory
          ? { rom: selectedMemory.rom, ram: selectedMemory.ram }
          : null,
      })
    )
    toast.success('Item added to cart')
  }
  if (isLoading) return <Loader />
  if (isError)
    return (
      <Message variant='danger'>
        {isError?.data?.message || isError.error}
      </Message>
    )
  if (!iPhone) return <Message variant='danger'>iPhone not found</Message>

  return (
    <>
      <Navbar />
      <div className='px-5 mt-25 md:px-10 lg:px-15 xl:px-20 mb-20'>
        <h1 className='md:text-5xl text-3xl font-bold text-center text-white mb-5'>
          {iPhone.name}
        </h1>
        <div className='flex flex-col items-center bg-white rounded-2xl shadow-md p-5 border-5 border-blue-400 group relative'>
          <img
            src={image}
            alt={iPhone.name}
            className='w-full rounded-lg mb-4 max-w-md group-hover:-translate-y-4 transition-transform duration-300 ease-in-out'
          />
          <div className='flex gap-2 mb-4 flex-wrap'>
            {iPhone.images.map((img, index) => (
              <div
                key={index}
                className={`h-10 w-10 rounded-full cursor-pointer border ${
                  color === img.color
                    ? 'border-blue-500 border-4'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: img.color }}
                onClick={() => {
                  setColor(img.color)
                  setImage(img.img)
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10'>
          <div className='flex flex-col bg-white shadow-md p-5 gap-3 rounded-2xl border-5 border-blue-400 justify-between'>
            <div className='flex items-center gap-5 hover:text-blue-600'>
              <FaCalendar size={40} />
              <p className='text-lg font-semibold'>
                {moment(iPhone.released).format('MMMM Do YYYY')}
              </p>
            </div>
            <div className='flex items-center gap-5 hover:text-blue-600 border-t-1 border-gray-300 pt-3'>
              <FaWeight size={40} />
              <p className='text-lg font-semibold'>{iPhone.weight} g</p>
            </div>
            <div className='flex items-center gap-5 hover:text-blue-600 border-t-1 border-gray-300 pt-3'>
              <FaMobile size={40} />
              <p className='text-lg font-semibold'>
                {iPhone.dimensions.height} x {iPhone.dimensions.width} x{' '}
                {iPhone.dimensions.depth} mm
              </p>
            </div>
            <div className='flex items-center gap-5 hover:text-blue-600 border-t-1 border-gray-300 pt-3'>
              <FaBatteryFull size={40} />
              <p className='text-lg font-semibold'>{iPhone.battery}</p>
            </div>
          </div>
          <div className='flex flex-col bg-white shadow-md p-5 gap-3 rounded-2xl border-5 border-blue-400 justify-between'>
            <div className='flex items-center gap-7 hover:text-blue-600'>
              <p className='text-2xl font-extrabold'>Type</p>
              <p className='text-lg font-semibold'>{iPhone.displayType}</p>
            </div>
            <div className='flex items-center gap-7 hover:text-blue-600 border-t-1 border-gray-300 pt-3'>
              <p className='text-2xl font-extrabold'>Size</p>
              <p className='text-lg font-semibold'>
                {iPhone.displaySize} inches
              </p>
            </div>
            <div className='flex items-center gap-7 hover:text-blue-600 border-t-1 border-gray-300 pt-3'>
              <p className='text-2xl font-extrabold'>Resolution</p>
              <p className='text-lg font-semibold'>
                {iPhone.resolution.replace('x', ' x ')} pixels
              </p>
            </div>
            <div className='flex items-center gap-7 hover:text-blue-600 border-t-1 border-gray-300 pt-3'>
              <p className='text-2xl font-extrabold'>Protection</p>
              <p className='text-lg font-semibold'>{iPhone.protection}</p>
            </div>
          </div>
          <div className='flex flex-col bg-white shadow-md p-5 gap-3 rounded-2xl border-5 border-blue-400 justify-between'>
            <div className='flex items-center gap-7 hover:text-blue-600'>
              <p className='text-2xl font-extrabold'>OS</p>
              <p className='text-lg font-semibold'>
                IOS {iPhone.os.original}, upgradable to IOS {iPhone.os.upgrade}
              </p>
            </div>
            <div className='flex items-center gap-7 hover:text-blue-600 border-t-1 border-gray-300 pt-3'>
              <FaMicrochip size={40} />
              <p className='text-lg font-semibold'>{iPhone.chipSet}</p>
            </div>
            <div className='flex items-center gap-7 hover:text-blue-600 border-t-1 border-gray-300 pt-3'>
              <p className='text-2xl font-extrabold'>CPU</p>
              <p className='text-xl font-semibold'>{iPhone.cpu}</p>
            </div>
            <div className='flex items-center gap-7 hover:text-blue-600 border-t-1 border-gray-300 pt-3'>
              <p className='text-2xl font-extrabold'>GPU</p>
              <p className='text-xl font-semibold'>{iPhone.gpu}</p>
            </div>
          </div>
          <div className='flex flex-col bg-white shadow-md p-5 gap-3 rounded-2xl border-5 border-blue-400 justify-between'>
            <div className='flex items-center gap-7 hover:text-blue-600'>
              <FaCamera size={40} />
              <div className='flex flex-col gap1'>
                <p className='text-lg font-semibold'>
                  Rear Camera :{' '}
                  {iPhone.camera.rear.map(cam => cam + ' MP').join(', ')}
                </p>
                <p className='text-lg font-semibold'>
                  Front Camera : {iPhone.camera.front} MP
                </p>
              </div>
            </div>
            <div className='flex items-center gap-7 hover:text-blue-600 border-t-1 border-gray-300 pt-3'>
              <p className='text-2xl font-extrabold'>Storage</p>
              <div className='text-lg font-semibold flex flex-col '>
                {iPhone.memory.map(m => (
                  <span>
                    {m.rom} ROM - {m.ram} RAM - {m.price}$
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col xl:flex-row gap-5 mt-10'>
          <div className='flex items-center gap-3'>
            <label className='text-white text-2xl' htmlFor='price'>
              Select Price
            </label>
            <select
              onChange={changePrice}
              value={price}
              className='border border-gray-300 rounded-md px-3 py-2 bg-gray-300 text-black focus:outline-none focus:ring-2
               focus:ring-blue-500 font-medium text-md'
            >
              {iPhone.memory.map(m => (
                <option key={m._id} value={m.price}>
                  {m.rom} ROM - {m.ram} RAM
                </option>
              ))}
            </select>
            <span className='text-white text-2xl ml-2'>{price}$</span>
          </div>
          <div className='flex items-center gap-3'>
            <label className='text-white text-2xl' htmlFor='price'>
              Select Quantity
            </label>
            <select
              onChange={changeQuantity}
              value={quantity}
              className='border border-gray-300 rounded-md px-3 py-2 bg-gray-300 text-black focus:outline-none focus:ring-2
               focus:ring-blue-500 font-medium text-md'
            >
              {[...Array(10)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          {isInCart ? (
            <p className='text-white text-lg'>Item is already in cart</p>
          ) : (
            <button
              className='bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 font-semibold text-lg
                 active:scale-105 transition-transform
                 duration-150 ease-in cursor-pointer'
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
        <ProductReviews product={iPhone} refetch={refetch} />
      </div>
    </>
  )
}

export default IPhoneDetails
