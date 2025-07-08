import { apiSlice } from './apiSlice'
import { ORDERS_URL, ADMIN_URL } from '../urls'

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: orderData => ({
        url: ORDERS_URL,
        method: 'POST',
        body: orderData,
      }),
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/my-orders`,
        method: 'GET',
      }),
    }),

    getOrderById: builder.query({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: 'GET',
      }),
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/orders`,
        method: 'GET',
      }),
    }),

    deleteOrder: builder.mutation({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: 'DELETE',
      }),
    }),

    payOrder: builder.mutation({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
      }),
    }),

    deliverOrder: builder.mutation({
      query: orderId => ({
        url: `${ADMIN_URL}/orders/${orderId}/deliver`,
        method: 'PUT',
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
