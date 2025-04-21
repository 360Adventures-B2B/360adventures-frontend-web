import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { PaginationParams } from "@/interfaces/PaginationParams";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: createBaseQuery(),
  tagTypes: ["Bookings"],
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: ({ page = 1, limit = 10, bookingStatus = "" }: PaginationParams) =>
        `/api/bookings?page=${page}&limit=${limit}&booking_status=${bookingStatus}`,
      providesTags: ["Bookings"],
    }),
    getBookingSummary: builder.query({
      query: (orderId) => `/api/bookings/summary/${orderId}`,
    }),
    downloadTicket: builder.query({
      query: (bookingId) => `/api/bookings/download-ticket/${bookingId}`,
    }),
    cancelBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/api/bookings/cancel/${bookingId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Bookings"],
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
export const {
  useGetBookingsQuery,
  useGetBookingSummaryQuery,
  useLazyDownloadTicketQuery,
  useCancelBookingMutation,
  useUpdateBookingMutation,
} = bookingApi;
