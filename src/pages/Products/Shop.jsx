import Navbar from '../../components/Navbar'
import { useState } from 'react'
import { useGetAllIPhonesQuery } from '../../app/api/iphoneApiSlice'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import IPhoneCard from './IPhoneCard'

const Shop = () => {
  const [model, setModel] = useState('')
  const { data, isLoading, isError } = useGetAllIPhonesQuery()
  const changeModel = e => setModel(e.target.value)

  if (isLoading)
    return (
      <div className='flex mt-50 justify-center items-center'>
        <Loader />
      </div>
    )
  if (isError)
    return (
      <div className='flex mt-50 justify-center items-center'>
        <Message variant='danger'>
          {isError?.data?.message || isError.error}
        </Message>
      </div>
    )
  const iPhones = model ? data.filter(d => d.name.includes(model)) : data
  return (
    <>
      <Navbar />
      <div className='px-5 mt-25 md:px-10 lg:px-20 xl:px-30 mb-20'>
        <h1 className='md:text-5xl text-3xl font-bold text-center text-white mb-5'>
          iPhone Shop
        </h1>
        <div className='flex items-center mt-10 gap-3'>
          <p className='text-white text-2xl font-medium'>Explore models</p>
          <select
            className='ml-2 border border-gray-300 rounded-md px-3 py-2 bg-white text-black focus:outline-none focus:ring-2
             focus:ring-blue-500 font-medium text-2xl'
            onChange={changeModel}
            value={model}
          >
            <option value=''>All Models</option>
            <option value='11'>11</option>
            <option value='12'>12</option>
            <option value='13'>13</option>
            <option value='14'>14</option>
            <option value='15'>15</option>
            <option value='16'>16</option>
          </select>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10'>
          {iPhones.map(iPhone => (
            <IPhoneCard key={iPhone._id} iPhone={iPhone} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Shop
