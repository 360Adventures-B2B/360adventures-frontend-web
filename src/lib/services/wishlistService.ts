import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { Product } from "@/interfaces/Product";
import { ApiResponse } from "@/interfaces/ApiResponse";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: createBaseQuery(),
  // baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    getWishlist: builder.query<ApiResponse<Product[]>, Record<string, any>>({
      query: (params) => {
        const searchParams = new URLSearchParams(params).toString();
        return `api/wishlist${searchParams ? `?${searchParams}` : ""}`;
      },
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation<any, { productId: number }>({
      query: ({ productId }) => ({
        url: `api/wishlist/store`,
        method: "POST",
        body: { product_id: productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation<any, { productId: number }>({
      query: ({ productId }) => ({
        url: `api/wishlist/delete`,
        method: "DELETE",
        body: { product_id: productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});
export const { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } = wishlistApi;
