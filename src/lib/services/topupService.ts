import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { PaginationParams } from "@/interfaces/PaginationParams";

export const topupApi = createApi({
  reducerPath: "topupApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getTopupRequest: builder.query({
      query: ({ page = 1, limit = 10, status = "All" }: PaginationParams) => {
        return `/api/topup/request?page=${page}&limit=${limit}&status=${status}`;
      },
    }),
  }),
});
export const { useGetTopupRequestQuery } = topupApi;
