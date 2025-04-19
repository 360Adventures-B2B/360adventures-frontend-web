import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { PaginationParams } from "@/interfaces/PaginationParams";

export const creditHistoryApi = createApi({
  reducerPath: "creditHistoryApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getCreditHistories: builder.query({
      query: ({ page = 1, limit = 10, type = "" }: PaginationParams) =>
        `/api/credit-histories?page=${page}&limit=${limit}&type=${type}`,
    }),
  }),
});
export const { useGetCreditHistoriesQuery } = creditHistoryApi;
