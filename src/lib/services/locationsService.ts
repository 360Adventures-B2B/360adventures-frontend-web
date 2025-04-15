import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { Location } from "@/interfaces/Location";

type LocationResponse = {
  data: Location[];
};

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: createBaseQuery(),
  // baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getLocations: builder.query<LocationResponse, void>({
      query: () => `api/locations`,
    }),
  }),
});
export const { useGetLocationsQuery } = locationApi;
