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
    validateUserOtp: builder.query({
      query: ({ token, otpCode }) => ({
        url: `api/auth/verify-otp?token=${token}&otp_code=${otpCode}`,
      }),
    }),
    resendUserOtp: builder.mutation({
      query: () => ({
        url: "api/auth/resend-otp",
        method: "POST",
      }),
    }),
    requestUserResetPassword: builder.mutation({
      query: (credentials) => ({
        url: "api/auth/request-reset-password",
        method: "POST",
        body: credentials,
      }),
    }),
    resetUserPassword: builder.mutation({
      query: ({ credentials, token }) => ({
        url: `api/auth/reset-password?token=${token}`,
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
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLazyValidateUserOtpQuery,
  useResendUserOtpMutation,
  useRequestUserResetPasswordMutation,
  useResetUserPasswordMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = authApi;
