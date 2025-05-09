"use client";
import React, { useEffect } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import Textarea from "@/shared/Textarea";
import Label from "@/components/Label";
import { useGetUserQuery, useUpdateUserMutation } from "@/lib/services/authService";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { handleError } from "@/lib/handleApiError";

export default function FormAccount() {
  const { data: user, isLoading: isLoadingData, isError } = useGetUserQuery(undefined);

  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();

  const phoneRegex = /^[0-9+\-() ]{7,20}$/;

  const schema = yup.object().shape({
    name: yup.string().required("Full name is required"),
    // username: yup.string().required("Username is required"),
    // email: yup.string().nullable().notRequired().email("Invalid email format"),
    // phone: yup
    //   .string()
    //   .nullable()
    //   .notRequired()
    //   .test("phone", "Invalid phone format", (value) => {
    //     if (!value) return true;
    //     return phoneRegex.test(value);
    //   }),
    company_name: yup.string().required("Company name is required"),
    company_address: yup.string().required("Company address is required"),
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    zip_code: yup.string().matches(/^\d+$/, "Zip code must contain only numbers").required("Zip code is required"),

    tax_id: yup.string().required("Tax ID is required").matches(/^\d+$/, "Tax ID must contain only numbers"),

    vat_id: yup.string().required("VAT ID is required").matches(/^\d+$/, "VAT ID must contain only numbers"),
    // trade_license: yup.string().url("Trade license must be a valid URL").required("Trade license is required"),
  });

  type FormData = yup.InferType<typeof schema>;

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      // username: "",
      // email: "",
      // phone: "",
      company_name: "",
      company_address: "",
      country: "",
      state: "",
      zip_code: "",
      tax_id: "",
      vat_id: "",
      // trade_license: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.data.name || "");
      // form.setValue("username", user.data.username || "");
      // form.setValue("email", user.data.email || "");
      // form.setValue("phone", user.data.phone || "");
      form.setValue("company_name", user.data.company_name || "");
      form.setValue("company_address", user.data.company_address || "");
      form.setValue("country", user.data.country || "");
      form.setValue("state", user.data.state || "");
      form.setValue("zip_code", user.data.zip_code || "");
      form.setValue("tax_id", user.data.tax_id || "");
      form.setValue("vat_id", user.data.vat_id || "");
      // form.setValue("trade_license", user.data.trade_license || "");
    }
  }, [user, form]);

  async function onSubmit(formData: FormData) {
    try {
      const res = await updateUser(formData).unwrap();

      if (res.code === 200) {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Success",
          description: "Update User!",
          variant: "success",
          duration: 5000,
        });
      } else {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Error",
          description: "Something Wrong, Try Again!",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error: any) {
      handleError(error);
    }
  }

  if (isLoadingData) {
    return (
      <div className="flex justify-center w-full">
        <div className="flex justify-center items-center">
          <LoadingSpinner type="long" className="mr-2 mt-10 h-10 w-10 animate-spin text-primary-700" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Full Name</Label>
                  <FormControl>
                    <Input className="mt-1.5" placeholder="Full Name" autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Username */}
            <FormItem>
              <Label>Username</Label>
              <div className="flex items-center gap-2">
                <Input className="mt-1.5" type="email" placeholder="Email" readOnly value={user.data.username || ""} />
              </div>
            </FormItem>

            {/* Email */}
            <FormItem>
              <Label>Email</Label>
              <div className="flex items-center gap-2">
                <Input className="mt-1.5" type="email" placeholder="Email" readOnly value={user.data.email || ""} />
                <ButtonPrimary type="button" className="h-8 w-8 p-0 flex items-center justify-center">
                  <i className="las la-pen text-base"></i>
                </ButtonPrimary>
              </div>
            </FormItem>
            {/* Phone Number */}
            <FormItem>
              <Label>Phone Number</Label>
              <div className="flex items-center gap-2">
                <Input
                  className="mt-1.5"
                  type="tel"
                  placeholder="Phone Number"
                  readOnly
                  value={user.data.phone || ""}
                />
                <ButtonPrimary type="button" className="h-8 w-8 p-0 flex items-center justify-center">
                  <i className="las la-pen text-base"></i>
                </ButtonPrimary>
              </div>
            </FormItem>

            {/* Company Name */}
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <Label>Company Name</Label>
                  <FormControl>
                    <Input className="mt-1.5" placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Company Address */}
            <FormField
              control={form.control}
              name="company_address"
              render={({ field }) => (
                <FormItem>
                  <Label>Company Address</Label>
                  <FormControl>
                    <Input className="mt-1.5" placeholder="Company Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <Label>Country</Label>
                  <FormControl>
                    <Input className="mt-1.5" placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* State */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <Label>State</Label>
                  <FormControl>
                    <Input className="mt-1.5" placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Zip Code */}
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <Label>Zip Code</Label>
                  <FormControl>
                    <Input className="mt-1.5" placeholder="Zip Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Tax ID */}
            <FormField
              control={form.control}
              name="tax_id"
              render={({ field }) => (
                <FormItem>
                  <Label>Tax ID</Label>
                  <FormControl>
                    <Input className="mt-1.5" placeholder="Tax ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* VAT ID */}
            <FormField
              control={form.control}
              name="vat_id"
              render={({ field }) => (
                <FormItem>
                  <Label>VAT ID</Label>
                  <FormControl>
                    <Input className="mt-1.5" placeholder="VAT ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="lg:col-span-2 col-span-1">
              <FormItem>
                <Label>Trade License</Label>
                <div className="mt-1.5 flex items-center gap-3 p-3 border rounded-md bg-gray-50">
                  {user.data.trade_license ? (
                    <>
                      <i className="las la-file-alt text-xl text-blue-600"></i>
                      <a
                        href={user.data.trade_license}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                      >
                        View Trade License
                      </a>
                    </>
                  ) : (
                    <>
                      <i className="las la-exclamation-circle text-xl text-gray-400"></i>
                      <span className="text-sm text-gray-500">No file uploaded</span>
                    </>
                  )}
                </div>
              </FormItem>
            </div>
          </div>

          {/* Submit Button - Full Width */}
          <div className="pt-2">
            <ButtonPrimary type="submit" loading={isLoadingUpdate}>
              Submit
            </ButtonPrimary>
          </div>
        </form>
      </Form>
    </>
  );
}
