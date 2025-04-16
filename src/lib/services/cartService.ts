import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { Cart } from "@/interfaces/Cart";

type CartResponse = {
  data: Cart[];
};

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: createBaseQuery(),
  tagTypes: ["Cart"],
  // baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getCarts: builder.query<CartResponse, { ids?: string[] } | void>({
      query: (body) => ({
        url: "/api/carts",
        method: "POST",
        body,
      }),
      providesTags: ["Cart"],
    }),
    addCart: builder.mutation({
      query: (body) => ({
        url: "/api/carts/store",
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
      query: (body) => ({
        url: `/api/carts/checkout`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});
export const { useGetCartsQuery, useAddCartMutation, useDeleteCartMutation, useCheckoutCartMutation } = cartApi;
