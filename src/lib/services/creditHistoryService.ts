import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { PaginationParams } from "@/interfaces/PaginationParams";

export const creditHistoryApi = createApi({
  reducerPath: "creditHistoryApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getCreditHistories: builder.query({
      query: ({ page = 1, limit = 10, type }: PaginationParams) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (type) {
          params.append("type", type);
        }
        return `/api/credit-histories?${params.toString()}`;
      },
    }),
  }),
});
export const { useGetCreditHistoriesQuery } = creditHistoryApi;
