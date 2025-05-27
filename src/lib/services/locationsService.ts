import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { Location } from "@/interfaces/Location";
import { ApiResponse } from "@/interfaces/ApiResponse";

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: createBaseQuery(),
  // baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getLocations: builder.query<ApiResponse<Location[]>, void>({
      query: () => `api/locations`,
    }),
  }),
});
export const { useGetLocationsQuery } = locationApi;
