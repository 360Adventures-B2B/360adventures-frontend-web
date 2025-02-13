// services/baseQuery.ts
import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createBaseQuery = () => {
  return async (args: any, api: any, extraOptions: any) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const baseQuery = fetchBaseQuery({
      baseUrl: baseUrl,
      prepareHeaders: async (headers) => {
        const session = await getSession();

        if (session?.user?.token) {
          headers.set("Authorization", `Bearer ${session.user.token}`);
        }
        if (apiKey) {
          headers.set("x-api-key", apiKey);
        }
        headers.set("Accept", "Application/json");
        return headers;
      },
    });

    const result = await baseQuery(args, api, extraOptions);
    console.log("🚀 ~ return ~ result:", result);

    if (result.error && result.error.status === 403) {
      await signOut({ redirect: false });
      const router = useRouter();
      router.push("/login");
    }

    return result;
  };
};
