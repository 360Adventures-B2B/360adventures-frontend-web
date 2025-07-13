import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { createBaseQuery } from "./baseQuery";
import { createFormData } from "@/utils/formData";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: createBaseQuery(),
  tagTypes: ["User"], 
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
        body: createFormData(credentials),
      }),
    }),
    validateUserOtp: builder.query({
      query: ({ token, otpCode, is_reset_password }) => {
        let url = `api/auth/verify-otp?token=${token}&otp_code=${otpCode}`;
        if (is_reset_password !== undefined) {
          url += `&is_reset_password=${is_reset_password}`;
        }
        return { url };
      },
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
      query: ({ credentials, token, otp }) => ({
        url: `api/auth/reset-password?token=${token}&otp_code=${otp}`,
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query({
      query: () => "api/user",
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (credentials) => ({
        url: "api/user/update",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    changePasswordUser: builder.mutation({
      query: (body) => ({
        url: "api/user/change-password",
        method: "POST",
        body: body,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "api/auth/logout",
        method: "POST",
      }),
    }),
    requestUpdateContact: builder.mutation({
      query: (body) => ({
        url: "api/user/request-update-contact",
        method: "POST",
        body: body,
      }),
    }),
    updateContact: builder.mutation({
      query: (body) => ({
        url: "api/user/update-contact",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
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
  useChangePasswordUserMutation,
  useLogoutUserMutation,
  useRequestUpdateContactMutation,
  useUpdateContactMutation,
} = authApi;
