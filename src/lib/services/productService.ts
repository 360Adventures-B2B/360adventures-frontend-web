import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { createBaseQuery } from "./baseQuery";
import { Product } from "@/interfaces/Product";
import { Package } from "@/interfaces/Package";

// const baseUrl = process.env.NEXT_PUBLIC_API_URL;
type ProductsResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Product[];
};

type ProductResponse = {
  data: Product;
};

type PackageResponse = {
  data: Package;
};

export const productApi = createApi({
  reducerPath: "productApi",
  // baseQuery: createBaseQuery(),
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getProduct: builder.query<ProductsResponse, Record<string, unknown> | void>({
      async queryFn(filters = {}, _queryApi, _extraOptions, fetchWithBQ) {
        const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);

        Object.entries(filters ?? {}).forEach(([key, value]) => {
          if (value != null && value !== "") {
            url.searchParams.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
          }
        });

        const response = await fetchWithBQ(url.toString());
        return response.error ? { error: response.error } : { data: response.data as ProductsResponse };
      },
    }),

    getDetailProduct: builder.query<ProductResponse, string>({
      query: (slug) => `products/${slug}`,
    }),
    getDetailPackage: builder.query<PackageResponse, number>({
      query: (id) => `packages/${id}`,
    }),
  }),
});
export const { useGetProductQuery, useGetDetailProductQuery, useGetDetailPackageQuery } = productApi;
