import Stars from './Stars'

const Review = ({ review }) => {
  return (
    <div className='flex items-center gap-2 mb-3'>
      <p className='text-blue-500 text-lg font-semibold'>-{review.name} :</p>
      <p className='text-white text-lg'>{`"${review.comment}"`}</p>
      <Stars rating={review.rating} />
    </div>
  )
}

export default Review
