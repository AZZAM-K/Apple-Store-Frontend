import Navbar from '../components/Navbar'
import AppleWatchHero from '../components/AppleWatchHero'
import IPhoneHero from '../components/IPhoneHero'
import IPadHero from '../components/IPadHero'
import Loader from '../components/Loader'
import IPhoneCard from './Products/IPhoneCard'
import ContactInfo from '../components/ContactInfo'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { useGetLastIPhonesQuery } from '../app/api/iphoneApiSlice'

const Home = () => {
  const { data: lastIPhones, isLoading, isError } = useGetLastIPhonesQuery()

  return (
    <>
      <Navbar />
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide>
          <IPhoneHero />
        </SwiperSlide>
        <SwiperSlide>
          <IPadHero />
        </SwiperSlide>
        <SwiperSlide>
          <AppleWatchHero />
        </SwiperSlide>
      </Swiper>
      {isLoading ? (
        <div className='flex mt-50 justify-center items-center'>
          <Loader />
        </div>
      ) : isError ? (
        <div className='flex mt-50 justify-center items-center'>
          <p className='text-red-500'>Error loading iPhones</p>
        </div>
      ) : (
        <div className='px-5 mt-25 md:px-10 lg:px-20 xl:px-30 mb-20'>
          <h1 className='md:text-5xl text-3xl font-bold text-center text-white mb-5'>
            Latest iPhones
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10'>
            {lastIPhones.map(iPhone => (
              <IPhoneCard key={iPhone._id} iPhone={iPhone} />
            ))}
          </div>
        </div>
      )}
      <ContactInfo />
    </>
  )
}

export default Home
