import { apiSlice } from './apiSlice'
import { ORDERS_URL, ADMIN_URL } from '../urls'

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: orderData => ({
        url: ORDERS_URL,
        method: 'POST',
        body: orderData,
        credentials: 'include',
      }),
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/my-orders`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    getOrderById: builder.query({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/orders`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    deleteOrder: builder.mutation({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),

    payOrder: builder.mutation({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        credentials: 'include',
      }),
    }),

    deliverOrder: builder.mutation({
      query: orderId => ({
        url: `${ADMIN_URL}/orders/${orderId}/deliver`,
        method: 'PUT',
        credentials: 'include',
      }),
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  usePayOrderMutation,
  useDeliverOrderMutation,
} = orderApiSlice
