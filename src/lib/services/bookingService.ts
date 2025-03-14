import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// type CartResponse = {
//   data: Cart[];
// };

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  // baseQuery: createBaseQuery(),
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getBooking: builder.query({
      query: (orderId) => `booking/${orderId}`,
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
export const { useGetBookingQuery, useUpdateBookingMutation } = bookingApi;
