import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { createBaseQuery } from "./baseQuery";
import { Product } from "@/interfaces/Product";
import { Package } from "@/interfaces/Package";
import { Pagination } from "@/interfaces/Pagination";

// const baseUrl = process.env.NEXT_PUBLIC_API_URL;
type ProductsResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Product[];
  pagination: Pagination;
};

type ProductResponse = {
  data: Product;
};

type PackageResponse = {
  data: Package;
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: createBaseQuery(),
  // baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    // getProduct: builder.query<ProductsResponse, Record<string, unknown> | void>({
    //   async queryFn(filters = {}, _queryApi, _extraOptions, fetchWithBQ) {
    //     const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);

    //     Object.entries(filters ?? {}).forEach(([key, value]) => {
    //       if (value != null && value !== "") {
    //         url.searchParams.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
    //       }
    //     });

    //     const response = await fetchWithBQ(url.toString());
    //     return response.error ? { error: response.error } : { data: response.data as ProductsResponse };
    //   },
    // }),

    getProduct: builder.query<ProductsResponse, Record<string, unknown> | void>({
      async queryFn(filters = {}, _queryApi, _extraOptions, fetchWithBQ) {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);

        Object.entries(filters ?? {}).forEach(([key, value]) => {
          if (value != null && value !== "") {
            if (Array.isArray(value)) {
              // Gabungkan array jadi string dipisah koma
              url.searchParams.append(key, value.join(","));
            } else {
              url.searchParams.append(key, String(value));
            }
          }
        });

        const response = await fetchWithBQ(url.toString());

        if (response.error) {
          return { error: response.error };
        }

        const res = response.data as {
          code: number;
          status: string;
          message: string;
          data: Product[];
          pagination: ProductsResponse["pagination"];
        };

        return {
          data: {
            data: res.data,
            pagination: res.pagination,
          },
        };
      },
    }),

    getDetailProduct: builder.query<ProductResponse, string>({
      query: (slug) => `api/products/${slug}`,
    }),
    checkAvailableProduct: builder.mutation<any, { ulid: string; body: any }>({
      query: ({ ulid, body }) => ({
        url: `/api/products/check-available/${ulid}`,
        method: "POST",
        body,
      }),
    }),

    getDetailPackage: builder.mutation<any, { ulid: string; body: any }>({
      query: ({ ulid, body }) => ({
        url: `api/packages/${ulid}`,
        method: "POST",
        body,
      }),
    }),
  }),
});
export const {
  useGetProductQuery,
  useGetDetailProductQuery,
  useGetDetailPackageMutation,
  useCheckAvailableProductMutation,
} = productApi;
