import React from 'react'

const ContactInfo = () => {
  return (
    <div className='bg-gray-800 text-white p-6 mt-10'>
      <h2>Contact Information</h2>
      <ul className='list-disc pl-5 flex flex-col gap-2 mt-4'>
        <li>
          Email:{' '}
          <a
            href='mailto:azzam.alkahil@icloud.com'
            className='text-blue-400 hover:underline'
          >
            azzam.alkahil@icloud.com
          </a>
        </li>
        <li>
          Secondary Email:{' '}
          <a
            href='mailto:tsm.azzamkahil@gmail.com'
            className='text-blue-400 hover:underline'
          >
            tsm.azzamkahil@gmail.com
          </a>
        </li>
        <li>
          Phone:{' '}
          <a href='tel:+96176338952' className='text-blue-400 hover:underline'>
            +961 76 338 952
          </a>
        </li>
        <li>
          Github:{' '}
          <a
            href='https://github.com/AZZAM-K'
            className='text-blue-400 hover:underline'
          >
            github.com/AZZAM-K
          </a>
        </li>
      </ul>
      <p className='text-center text-white text-lg mt-6 font-semibold'>
        &copy; Copyright 2025. Made by AZZAM-K
      </p>
    </div>
  )
}

export default ContactInfo
