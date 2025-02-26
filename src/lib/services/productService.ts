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

export const productApi = createApi({
  reducerPath: "productApi",
  // baseQuery: createBaseQuery(),
  baseQuery: fetchBaseQuery({ baseUrl: "/json/" }),
  endpoints: (builder) => ({
    // getProduct: builder.query<Product[], void>({
    //   query: () => `${process.env.NEXTAUTH_URL}/api/products`,
    // }),
    getProduct: builder.query<ProductsResponse, Record<string, unknown> | void>({
      async queryFn(filters = {}, _queryApi, _extraOptions, fetchWithBQ) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const url = new URL(`${baseUrl}/api/products`);

        if (filters && typeof filters === "object" && Object.keys(filters).length > 0) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              url.searchParams.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
            }
          });
        }
        const response = await fetchWithBQ(url.toString());
        return response.error ? { error: response.error } : { data: response.data as Product[] };
      },
    }),

    getDetailProduct: builder.query<Product, number>({
      query: (id) => `__products_${id}.json`,
    }),
    getDetailPackage: builder.query<Package, number>({
      query: (id) => `package/__package_${id}.json`,
      async transformResponse(response) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return response;
      },
    }),
  }),
});
export const { useGetProductQuery, useGetDetailProductQuery, useGetDetailPackageQuery } = productApi;
