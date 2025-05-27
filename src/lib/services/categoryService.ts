import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { Category } from "@/interfaces/Category";
import { ApiResponse } from "@/interfaces/ApiResponse";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: createBaseQuery(),
  // baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<Category[]>, void>({
      query: () => `api/categories`,
    }),
  }),
});
export const { useGetCategoriesQuery } = categoryApi;
