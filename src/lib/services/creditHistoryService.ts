import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseQuery";
import { PaginationParams } from "@/interfaces/PaginationParams";

export const creditHistoryApi = createApi({
  reducerPath: "creditHistoryApi",
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getCreditHistories: builder.query({
      query: ({
        page = 1,
        limit = 10,
        type,
        fromDate = "",
        toDate = "",
      }: PaginationParams & { fromDate?: string; toDate?: string }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (type) {
          params.append("type", type);
        }
        if (fromDate) params.append("from", fromDate);
        if (toDate) params.append("to", toDate);

        return `/api/credit-histories?${params.toString()}`;
      },
    }),
    exportExcel: builder.mutation<
      Blob,
      { from: string; to: string; type?: string }
    >({
      query: ({ from, to, type }) => {
        const bodyPayload: Record<string, string> = { from, to };
        if (type && type.trim() !== "") {
          bodyPayload.booking_status = type;
        }

        return {
          url: "/api/credit-histories/export/excel",
          method: "POST",
          body: bodyPayload,
          responseHandler: (response) => response.blob(),
          validateStatus: (response, result) => response.status < 500,
        };
      },
    }),
    exportPdf: builder.mutation<
      Blob,
      { from: string; to: string; type?: string }
    >({
      query: ({ from, to, type }) => {
        const bodyPayload: Record<string, string> = { from, to };
        if (type && type.trim() !== "") {
          bodyPayload.booking_status = type;
        }

        return {
          url: "/api/credit-histories/export/pdf",
          method: "POST",
          body: bodyPayload,
          responseHandler: (response) => response.blob(),
          validateStatus: (response, result) => response.status < 500,
        };
      },
    }),
  }),
});
export const {
  useGetCreditHistoriesQuery,
  useExportExcelMutation,
  useExportPdfMutation,
} = creditHistoryApi;
