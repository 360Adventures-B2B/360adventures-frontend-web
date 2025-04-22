// services/baseQuery.ts
import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalUpdateToken } from "@/context/AuthContext";
import { useForgotPassword } from "@/context/ForgotPasswordContext";
import { getForgotPasswordToken } from "@/utils/globalToken";

export const createBaseQuery = () => {
  return async (args: any, api: any, extraOptions: any) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const baseQuery = fetchBaseQuery({
      baseUrl: baseUrl,
      prepareHeaders: async (headers) => {
        const session = await getSession();

        let token = session?.user?.token || getForgotPasswordToken();

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }

        if (apiKey) {
          headers.set("x-api-key", apiKey);
        }
        headers.set("Accept", "Application/json");
        return headers;
      },
    });

    const result = await baseQuery(args, api, extraOptions);

    if (result.error && (result.error.status === 401 || result.error.status === 403)) {
      const session = await getSession();
      const refreshToken = session?.user?.token;

      const requestUrl = args?.url || args;

      if (
        requestUrl &&
        !requestUrl.includes("api/auth/verify-otp") &&
        !requestUrl.includes("api/auth/reset-password") &&
        !requestUrl.includes("api/auth/login") &&
        !requestUrl.includes("api/auth/register")
      ) {
        if (refreshToken) {
          try {
            // Memanggil API untuk refresh token
            const refreshResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
                Authorization: `Bearer ${refreshToken}`,
              },
            });

            if (refreshResult.ok) {
              const data = await refreshResult.json();

              if (data.code === 200 && data.data?.token) {
                const newAccessToken = data.data.token;

                await globalUpdateToken(newAccessToken);

                return await baseQuery(args, api, extraOptions);
              }
            }
          } catch (error) {
            console.error("Refresh token failed", error);
          }
        }
        await signOut({ redirect: true });
      }
    }

    return result;
  };
};
