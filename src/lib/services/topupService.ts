import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { PaginationParams } from "@/interfaces/PaginationParams";
import { createFormData } from "@/utils/formData";

export const topupApi = createApi({
  reducerPath: "topupApi",
  baseQuery: createBaseQuery(),
  tagTypes: ["TopupRequest"],
  endpoints: (builder) => ({
    getTopupRequest: builder.query({
      query: ({ page = 1, limit = 10, status = "All" }: PaginationParams) =>
        `/api/topup/request?page=${page}&limit=${limit}&status=${status}`,
      providesTags: ["TopupRequest"],
    }),
    getDetailTopupRequest: builder.query({
      query: (paymentLinkId) => `/api/topup/request/${paymentLinkId}`,
    }),
    storeTopupRequest: builder.mutation({
      query: (body) => ({
        url: "/api/topup/request",
        method: "POST",
        body: createFormData(body),
      }),
      invalidatesTags: ["TopupRequest"],
    }),
  }),
});

export const { useGetTopupRequestQuery, useGetDetailTopupRequestQuery, useStoreTopupRequestMutation } = topupApi;
