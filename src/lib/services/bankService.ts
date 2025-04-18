import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";

export const bankApi = createApi({
  reducerPath: "bankApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getBanks: builder.query({
      query: () => {
        return `/api/banks`;
      },
    }),
  }),
});
export const { useGetBanksQuery } = bankApi;
