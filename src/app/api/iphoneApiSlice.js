import { apiSlice } from './apiSlice'
import { IPHONE_URL } from '../urls'

export const iphoneApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getIphoneById: builder.query({
      query: id => ({
        url: `${IPHONE_URL}/${id}`,
        method: 'GET',
      }),
    }),

    createIphone: builder.mutation({
      query: data => ({
        url: IPHONE_URL,
        method: 'POST',
        body: data,
      }),
    }),

    getAllIPhones: builder.query({
      query: () => ({
        url: IPHONE_URL,
        method: 'GET',
      }),
    }),

    addIPhoneReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${IPHONE_URL}/${id}/reviews`,
        method: 'POST',
        body: { rating, comment },
      }),
    }),

    editIPhoneReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${IPHONE_URL}/${id}/reviews`,
        method: 'PUT',
        body: { rating, comment },
      }),
    }),

    deleteIPhoneReview: builder.mutation({
      query: id => ({
        url: `${IPHONE_URL}/${id}/reviews`,
        method: 'DELETE',
      }),
    }),

    getLastIPhones: builder.query({
      query: () => ({
        url: `${IPHONE_URL}/last`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetIphoneByIdQuery,
  useCreateIphoneMutation,
  useGetAllIPhonesQuery,
  useAddIPhoneReviewMutation,
  useEditIPhoneReviewMutation,
  useDeleteIPhoneReviewMutation,
  useGetLastIPhonesQuery,
} = iphoneApiSlice
