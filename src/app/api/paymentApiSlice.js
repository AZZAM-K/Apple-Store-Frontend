import { apiSlice } from './apiSlice'
import { PAYMENT_URL } from '../urls'

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createCheckoutSession: builder.mutation({
      query: ({ items, orderId }) => ({
        url: PAYMENT_URL,
        method: 'POST',
        body: { items, orderId },
      }),
    }),
  }),
})

export const { useCreateCheckoutSessionMutation } = paymentApiSlice
