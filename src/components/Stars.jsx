import { FaStar, FaStarHalfAlt } from 'react-icons/fa'

const Stars = ({ rating }) => {
  if (rating === 0.5) {
    return <FaStarHalfAlt color='yellow' size={25} />
  }
  return (
    <>
      {[...Array(Math.floor(rating))].map((_, index) => (
        <FaStar key={index} color='yellow' size={25} />
      ))}
      {rating % 1 !== 0 && <FaStarHalfAlt color='yellow' size={25} />}
    </>
  )
}

export default Stars
