import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { createBaseQuery } from "./baseQuery";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "api/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    validateUserOtp: builder.mutation({
      query: (credentials) => ({
        url: "api/auth/validate-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query({
      query: () => "api/user",
    }),
    updateUser: builder.mutation({
      query: (credentials) => ({
        url: "api/user/update",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
  console.log("🚀 ~ createBaseQuery:", createBaseQuery)
  console.log("🚀 ~ createBaseQuery:", createBaseQuery)

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useValidateUserOtpMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = authApi;
