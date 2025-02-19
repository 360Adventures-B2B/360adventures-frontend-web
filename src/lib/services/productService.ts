import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { createBaseQuery } from "./baseQuery";
import { Product } from "@/interfaces/Product";
import { Package } from "@/interfaces/Package";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const productApi = createApi({
  reducerPath: "productApi",
  // baseQuery: createBaseQuery(),
  baseQuery: fetchBaseQuery({ baseUrl: "/json/" }),
  endpoints: (builder) => ({
    getProduct: builder.query<Product[], void>({
      query: () => "__products.json",
    }),
    getDetailProduct: builder.query<Product, number>({
      query: (id) => `__products_${id}.json`,
    }),
    getDetailPackage: builder.query<Package, number>({
      query: (id) => `package/__package_${id}.json?timestamp=${new Date().getTime()}`,
      async transformResponse(response) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return response;
      },
    }),
  }),
});
export const { useGetProductQuery, useGetDetailProductQuery, useGetDetailPackageQuery } = productApi;
