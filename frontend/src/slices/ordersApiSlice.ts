import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrderItems: builder.mutation({
      query: (body) => ({
        url: ORDERS_URL,
        method: 'POST',
        body,
      }),
    }),
    getMyOrders: builder.query<any, void>({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5 * 60,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
      }),
    }),
    getPaypalClientId: builder.query<any, void>({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    updateOrderToPaid: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}/pay`,
        method: 'PUT',
      }),
    }),
    updateOrderToDelivered: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}/deliver`,
        method: 'PUT',
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddOrderItemsMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderToPaidMutation,
  useUpdateOrderToDeliveredMutation,
  useGetOrdersQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
} = ordersApiSlice;
