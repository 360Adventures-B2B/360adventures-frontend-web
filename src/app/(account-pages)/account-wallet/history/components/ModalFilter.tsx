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

interface Props {
  onApply: (filters: { fromDate: string; toDate: string }) => void;
  initialFilters: { fromDate: string; toDate: string };
}

// Schema dengan validasi fromDate <= toDate
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
});

type FormData = yup.InferType<typeof schema>;

export default function ModalFilter({ onApply, initialFilters }: Props) {
  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fromDate: initialFilters.fromDate,
      toDate: initialFilters.toDate,
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    onApply({
      fromDate: values.fromDate,
      toDate: values.toDate,
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

        {/* Apply Button */}
        <div className="flex justify-end">
          <ButtonPrimary type="submit" className="px-6 py-2">
            Apply Filter
          </ButtonPrimary>
        </div>
      </form>
    </Form>
  );
}
