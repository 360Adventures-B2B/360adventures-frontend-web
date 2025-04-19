import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { PaginationParams } from "@/interfaces/PaginationParams";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: ({ page = 1, limit = 10, bookingStatus = "" }: PaginationParams) =>
        `/api/bookings?page=${page}&limit=${limit}&booking_status=${bookingStatus}`,
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
export const { useGetBookingsQuery, useGetBookingSummaryQuery, useUpdateBookingMutation } = bookingApi;
