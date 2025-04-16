import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";

// type CartResponse = {
//   data: Cart[];
// };

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: createBaseQuery(),
  // baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getBooking: builder.query({
      query: (orderId) => `booking/${orderId}`,
    }),
    getBookingSummary: builder.query({
      query: (orderId) => `/api/bookings/summary/${orderId}`,
    }),
    updateBooking: builder.mutation({
      query: ({ orderId, body }) => ({
        url: `booking/update/${orderId}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});
export const { useGetBookingQuery, useGetBookingSummaryQuery, useUpdateBookingMutation } = bookingApi;
