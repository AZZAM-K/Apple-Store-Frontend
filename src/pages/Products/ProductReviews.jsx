import { useState } from 'react'
import { useSelector } from 'react-redux'
import Review from '../../components/Review'
import Stars from '../../components/Stars'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import {
  useAddIPhoneReviewMutation,
  useDeleteIPhoneReviewMutation,
  useEditIPhoneReviewMutation,
} from '../../app/api/iphoneApiSlice'

const ProductReviews = ({ product, refetch }) => {
  const { userInfo } = useSelector(state => state.user)

  const otherReviews = userInfo
    ? product.reviews.filter(
        review => review.user.toString() !== userInfo._id.toString()
      )
    : product.reviews

  const userReview = userInfo
    ? product.reviews.find(
        review => review.user.toString() === userInfo._id.toString()
      )
    : null

  const [rating, setRating] = useState(userReview?.rating || 1)
  const [comment, setComment] = useState(userReview?.comment || '')
  const [isEditable, setIsEditable] = useState(false)

  const [addReview, { isLoading: loadingAdding }] = useAddIPhoneReviewMutation()
  const [deleteReview, { isLoading: loadingDeleting }] =
    useDeleteIPhoneReviewMutation()
  const [editReview, { isLoading: loadingEditing }] =
    useEditIPhoneReviewMutation()

  const handleSubmitReview = async e => {
    e.preventDefault()
    try {
      await addReview({
        rating: rating,
        comment: comment,
        id: product._id,
      }).unwrap()
      setIsEditable(false)
      toast.success('review added')
      refetch()
    } catch (error) {
      toast.error(error.data.message)
    }
  }

  const handleEditReview = async e => {
    e.preventDefault()
    try {
      await editReview({
        rating: rating,
        comment: comment,
        id: product._id,
      }).unwrap()
      toast.success('Review edited')
      refetch()
    } catch (error) {
      toast.error(error.data.message)
    }
  }

  const handleDeleteReview = async () => {
    try {
      await deleteReview(product._id).unwrap()
      toast.success('Your review was deleted')
      refetch()
    } catch (error) {
      toast.error(error.data.message)
    }
  }

  return (
    <>
      <div className='mt-5'>
        <h2 className='text-3xl font-bold text-white'>Reviews</h2>
        {otherReviews.length === 0 ? (
          <p className='text-white text-lg mt-4'>No other reviews yet</p>
        ) : (
          <div className='mt-3'>
            {otherReviews.map(review => (
              <Review key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
      {userInfo ? (
        !userReview ? (
          <form onSubmit={handleSubmitReview} className='mt-5'>
            <div className='flex flex-col xl:flex-row gap-10 mt-5'>
              <div className='flex items-center gap-3'>
                <label className='text-white text-2xl' htmlFor='rating'>
                  Select Rating
                </label>
                <select
                  onChange={e => setRating(e.target.value)}
                  value={rating}
                  className='border border-gray-300 rounded-md px-3 py-2 bg-gray-300 text-black focus:outline-none
                         focus:ring-2 focus:ring-blue-500 font-medium text-md'
                >
                  {[...Array(5)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1} Star{index > 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
                <Stars rating={rating} />
              </div>
              <div className='flex items-center gap-3'>
                <label className='text-white text-2xl' htmlFor='comment'>
                  Comment
                </label>
                <input
                  type='text'
                  id='comment'
                  required
                  placeholder='Write your comment here...'
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className='border border-gray-300 rounded-md w-full px-3 py-2 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-md'
                />
              </div>
              <button
                type='submit'
                className='bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 font-semibold text-lg
                 active:scale-105 transition-transform
                 duration-150 ease-in cursor-pointer'
                disabled={loadingAdding}
              >
                Submit Review
              </button>
            </div>
          </form>
        ) : !isEditable ? (
          <div className='mt-10'>
            <h1 className='text-white text-2xl mb-5 font-bold'>Your Review</h1>
            <Review review={userReview} />
            <div className='flex items-center gap-2'>
              <button
                className='bg-red-500 rounded-lg text-white cursor-pointer active:scale-105 transition-transform
         duration-150 ease-in px-4 py-2 hover:bg-red-600 font-semibold text-lg'
                onClick={handleDeleteReview}
                disabled={loadingDeleting}
              >
                Delete
              </button>
              <button
                className='bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 font-semibold text-lg
                 active:scale-105 transition-transform
                 duration-150 ease-in cursor-pointer'
                onClick={() => setIsEditable(true)}
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleEditReview} className='mt-5'>
            <div className='flex flex-col xl:flex-row gap-10 mt-5'>
              <div className='flex items-center gap-3'>
                <label className='text-white text-2xl' htmlFor='rating'>
                  Change Rating
                </label>
                <select
                  onChange={e => setRating(e.target.value)}
                  value={rating}
                  className='border border-gray-300 rounded-md px-3 py-2 bg-gray-300 text-black focus:outline-none
                         focus:ring-2 focus:ring-blue-500 font-medium text-md'
                >
                  {[...Array(5)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1} Star{index > 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
                <Stars rating={rating} />
              </div>
              <div className='flex items-center gap-3'>
                <label className='text-white text-2xl' htmlFor='comment'>
                  Change Comment
                </label>
                <input
                  type='text'
                  id='comment'
                  required
                  placeholder='Write your comment here...'
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className='border border-gray-300 rounded-md w-full px-3 py-2 bg-gray-300 text-black focus:outline-none
                   focus:ring-2 focus:ring-blue-500 font-medium text-md'
                />
              </div>
              <div className='flex items-center gap-2'>
                <button
                  type='submit'
                  className='bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 font-semibold text-lg
                 active:scale-105 transition-transform
                 duration-150 ease-in cursor-pointer'
                  disabled={loadingEditing}
                >
                  Update
                </button>
                <button
                  className='bg-red-500 rounded-lg text-white cursor-pointer active:scale-105 transition-transform
         duration-150 ease-in px-4 py-2 hover:bg-red-600 font-semibold text-lg'
                  onClick={() => setIsEditable(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )
      ) : (
        <p className='mt-6 text-lg font-bold text-white'>
          Please{' '}
          <Link
            to={`/login?redirect=/iPhone/${product._id}`}
            className='text-blue-400 underline underline-offset-4'
          >
            sign in
          </Link>{' '}
          to write a review
        </p>
      )}
    </>
  )
}

export default ProductReviews
