"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Select from "@/shared/Select";

interface Props {
  onExport: (filters: {
    fromDate: string;
    toDate: string;
    type: string;
  }) => void;
  initialFilters: {
    fromDate: string;
    toDate: string;
    type: string;
  };
  isLoadingButton: boolean;
}

const typeOption = [
  { label: "All", value: "" },
  { label: "Topup", value: "topup" },
  { label: "Payment", value: "payment" },
  { label: "Refund", value: "refund" },
];

const schema = yup.object().shape({
  fromDate: yup
    .string()
    .required("From date is required")
    .test(
      "valid-date",
      "Invalid date",
      (value) => !!value && !isNaN(Date.parse(value))
    ),
  toDate: yup
    .string()
    .required("To date is required")
    .test(
      "valid-date",
      "Invalid date",
      (value) => !!value && !isNaN(Date.parse(value))
    )
    .when("fromDate", (fromDate: string, schema: yup.StringSchema) =>
      fromDate
        ? schema.test(
            "date-check",
            "To Date must be after or same as From Date",
            (toDate) => {
              if (!toDate || !fromDate) return true;
              return new Date(toDate) >= new Date(fromDate);
            }
          )
        : schema
    ),
  type: yup.string().optional(),
});

type FormData = yup.InferType<typeof schema>;

export default function ModalExportCreditHistory({
  onExport,
  initialFilters,
  isLoadingButton = false,
}: Props) {
  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fromDate: initialFilters.fromDate,
      toDate: initialFilters.toDate,
      type: initialFilters.type || "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    onExport({
      fromDate: values.fromDate,
      toDate: values.toDate,
      type: values.type || "",
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* From Date */}
          <FormField
            control={form.control}
            name="fromDate"
            render={({ field }) => (
              <FormItem>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <FormControl>
                  <Input type="date" className="mt-1 w-full" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* To Date */}
          <FormField
            control={form.control}
            name="toDate"
            render={({ field }) => (
              <FormItem>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <FormControl>
                  <Input type="date" className="mt-1 w-full" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Booking Status Select */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <FormControl>
                <Select
                  className="mt-1 w-full"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {typeOption.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Export Button */}
        <div className="flex justify-end">
          <ButtonPrimary
            loading={isLoadingButton}
            type="submit"
            className="px-6 py-2"
          >
            Export Data
          </ButtonPrimary>
        </div>
      </form>
    </Form>
  );
}
