import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { Cart } from "@/interfaces/Cart";

type CartResponse = {
  data: Cart[];
};

export const cartApi = createApi({
  reducerPath: "cartApi",
  // baseQuery: createBaseQuery(),
  tagTypes: ["Cart"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getCarts: builder.query<CartResponse, void>({
      query: () => `carts`,
      providesTags: ["Cart"],
    }),
    addCart: builder.mutation({
      query: (body) => ({
        url: "carts/store",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: builder.mutation({
      query: (cartId) => ({
        url: `carts/delete/${cartId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});
export const { useGetCartsQuery, useAddCartMutation, useDeleteCartMutation } = cartApi;
