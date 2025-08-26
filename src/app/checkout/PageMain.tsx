"use client";

import React, { FC, Fragment, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormCheckout from "./component/FormCheckout";
import BookingSummary from "@/components/BookingSummary";
import BookingSummarySkeleton from "@/components/skeleton/BookingSummarySkeleton";
import { useGetCartsQuery } from "@/lib/services/cartService";
import { redirect, useSearchParams } from "next/navigation";
export interface CheckOutPagePageMainProps {
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
}) => {
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // State untuk menyimpan selectedItems
  const type = searchParams.get("type");

  useEffect(() => {
    const savedItems = sessionStorage.getItem("selectedItems");

    if (savedItems) {
      setSelectedItems(JSON.parse(savedItems)); // Parse string JSON menjadi array
    }
  }, []);

  const {
    data: carts,
    isLoading: isLoadingGetCart,
    isFetching: isFetchingGetCart,
    error,
  } = useGetCartsQuery({
    ids: selectedItems,
    is_instant: type === "instant" ? true : false,
  });
  const pickupRequiredFlags =
    carts?.data?.map((cart) => cart.package?.pickup_included === true) || [];
    
  const enableFlags = {
    enable_phone: carts?.data?.some((c) => !!c.package?.enable_phone) ?? false,
    enable_country:
      carts?.data?.some((c) => !!c.package?.enable_country) ?? false,
    enable_city: carts?.data?.some((c) => !!c.package?.enable_city) ?? false,
  };

  const loading = isFetchingGetCart || isLoadingGetCart;

  if (!loading && carts?.data.length === 0) {
    redirect("/");
  }
  // build schema
  const buildSchema = (pickupRequiredFlags: boolean[], enableFlags: any) => {
    return yup.object().shape({
      name: yup
        .string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must not exceed 50 characters"),
      email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),

      phone: enableFlags.enable_phone
        ? yup
            .string()
            .matches(/^\d+$/, "Phone must be a valid number")
            .min(10, "Phone number must be at least 10 digits")
            .max(15, "Phone number must not exceed 15 digits")
            .required("Phone is required")
        : yup.string().nullable(),

      country: enableFlags.enable_country
        ? yup.string().max(50).required("Country is required")
        : yup.string().nullable(),

      city: enableFlags.enable_city
        ? yup.string().max(50).required("City is required")
        : yup.string().nullable(),

      requirement: yup.string().max(500).nullable(),

      payment_gateway: yup.string().required("Select a payment method"),

      term_conditions: yup
        .boolean()
        .oneOf([true], "You must accept the Terms and Conditions"),

      pickup_locations: yup
        .array()
        .of(yup.string().nullable())
        .test(
          "pickup-location-required-per-item",
          "Pickup location required for some items",
          function (value) {
            const { path, createError } = this;
            for (let i = 0; i < pickupRequiredFlags.length; i++) {
              if (pickupRequiredFlags[i]) {
                if (!value || !value[i] || value[i].trim() === "") {
                  return createError({
                    path: `${path}[${i}]`,
                    message: "Pickup location is required",
                  });
                }
              }
            }
            return true;
          }
        ),
    });
  };

  const schema = buildSchema(pickupRequiredFlags, enableFlags);
  type FormData = yup.InferType<typeof schema>;

  const defaultPickupLocations = carts?.data?.map(() => "") || [];

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      requirement: "",
      payment_gateway: "",
      term_conditions: false,
      pickup_locations: defaultPickupLocations,
    },
  });

  const renderSidebar = () => {
    return (
      <BookingSummary
        bookingData={carts?.data || []}
        title="Your Item"
        form={form}
      />
    );
  };

  return (
    <FormProvider {...form}>
      <div className={`nc-CheckOutPagePageMain ${className}`}>
        <main className="container mt-11 mb-24 lg:mb-32 lg:flex lg:flex-row">
          <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
            <FormCheckout form={form} enableFlags={enableFlags} />
          </div>
          <div className="flex-grow">
            {loading ? <BookingSummarySkeleton /> : renderSidebar()}
          </div>
        </main>
      </div>
    </FormProvider>
  );
};

export default CheckOutPagePageMain;
