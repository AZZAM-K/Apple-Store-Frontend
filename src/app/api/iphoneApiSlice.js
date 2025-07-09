import { apiSlice } from './apiSlice'
import { IPHONE_URL } from '../urls'

export const iphoneApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getIphoneById: builder.query({
      query: id => ({
        url: `${IPHONE_URL}/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    createIphone: builder.mutation({
      query: data => ({
        url: IPHONE_URL,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),

    getAllIPhones: builder.query({
      query: () => ({
        url: IPHONE_URL,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    addIPhoneReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${IPHONE_URL}/${id}/reviews`,
        method: 'POST',
        body: { rating, comment },
        credentials: 'include',
      }),
    }),

    editIPhoneReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${IPHONE_URL}/${id}/reviews`,
        method: 'PUT',
        body: { rating, comment },
        credentials: 'include',
      }),
    }),

    deleteIPhoneReview: builder.mutation({
      query: id => ({
        url: `${IPHONE_URL}/${id}/reviews`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),

    getLastIPhones: builder.query({
      query: () => ({
        url: `${IPHONE_URL}/last`,
        method: 'GET',
        credentials: 'include',
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
