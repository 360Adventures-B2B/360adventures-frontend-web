import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { Category } from "@/interfaces/Category";

type CategoryResponse = {
  data: Category[];
};

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  // baseQuery: createBaseQuery(),
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryResponse, void>({
      query: () => `categories`,
    }),
  }),
});
export const { useGetCategoriesQuery } = categoryApi;
