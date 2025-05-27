import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { Cart } from "@/interfaces/Cart";
import { ApiResponse } from "@/interfaces/ApiResponse";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: createBaseQuery(),
  tagTypes: ["Cart"],
  // baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getCarts: builder.query<ApiResponse<Cart[]>, { ids?: string[]; is_instant?: boolean } | void>({
      query: (args) => {
        const ids = args?.ids;
        const is_instant = args?.is_instant ?? false;
        return {
          url: `/api/carts?is_instant=${is_instant}`,
          method: "POST",
          body: { ids },
        };
      },
      providesTags: ["Cart"],
    }),
    addCart: builder.mutation({
      query: ({ body, is_instant }) => ({
        url: `/api/carts/store?is_instant=${is_instant}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: builder.mutation({
      query: (body) => ({
        url: `/api/carts/delete`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Cart"],
    }),
    checkoutCart: builder.mutation({
      query: ({ body, is_instant }) => ({
        url: `/api/carts/checkout?is_instant=${is_instant}`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});
export const { useGetCartsQuery, useAddCartMutation, useDeleteCartMutation, useCheckoutCartMutation } = cartApi;
