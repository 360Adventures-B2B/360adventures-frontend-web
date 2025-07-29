import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { PaginationParams } from "@/interfaces/PaginationParams";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: createBaseQuery(),
  tagTypes: ["Bookings"],
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: ({
        page = 1,
        limit = 10,
        bookingStatus = "",
        fromDate = "",
        toDate = "",
      }: PaginationParams & { fromDate?: string; toDate?: string }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          booking_status: bookingStatus,
        });

        if (fromDate) params.append("from", fromDate);
        if (toDate) params.append("to", toDate);

        return `/api/bookings?${params.toString()}`;
      },
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
    exportExcel: builder.mutation<
      Blob,
      { from: string; to: string; bookingStatus?: string }
    >({
      query: ({ from, to, bookingStatus }) => {
        const bodyPayload: Record<string, string> = { from, to };
        if (bookingStatus && bookingStatus.trim() !== "") {
          bodyPayload.booking_status = bookingStatus;
        }

        return {
          url: "/api/bookings/export/excel",
          method: "POST",
          body: bodyPayload,
          responseHandler: (response) => response.blob(),
          validateStatus: (response, result) => response.status < 500,
        };
      },
    }),
    exportPdf: builder.mutation<
      Blob,
      { from: string; to: string; bookingStatus?: string }
    >({
      query: ({ from, to, bookingStatus }) => {
        const bodyPayload: Record<string, string> = { from, to };
        if (bookingStatus && bookingStatus.trim() !== "") {
          bodyPayload.booking_status = bookingStatus;
        }

        return {
          url: "/api/bookings/export/pdf",
          method: "POST",
          body: bodyPayload,
          responseHandler: (response) => response.blob(),
          validateStatus: (response, result) => response.status < 500,
        };
      },
    }),
  }),
});
export const {
  useGetBookingsQuery,
  useGetBookingSummaryQuery,
  useLazyDownloadTicketQuery,
  useCancelBookingMutation,
  useUpdateBookingMutation,
  useExportExcelMutation,
  useExportPdfMutation,
} = bookingApi;
