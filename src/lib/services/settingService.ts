import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { Product } from "@/interfaces/Product";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { SettingItem } from "@/interfaces/SettingItem";

export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: createBaseQuery(),
  // baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Setting"],
  endpoints: (builder) => ({
    getSetting: builder.query<ApiResponse<SettingItem[]>, void>({
      query: () => `/api/setting-websites`,
      keepUnusedDataFor: 3600,
      refetchOnMountOrArgChange: false,
    }),
  }),
});

export const { useGetSettingQuery } = settingApi;
