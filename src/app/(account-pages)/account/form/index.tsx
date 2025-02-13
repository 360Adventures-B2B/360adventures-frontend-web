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
  const phoneRegex = /^[0-9]{10,15}$/;
  const { data: user, isLoading: isLoadingData, isError } = useGetUserQuery(undefined);

  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    // email: yup.string().email("Invalid email format").required("Email is required"),
    // phone: yup
    //   .string()
    //   .test("phone", "Invalid phone format", (value) => {
    //     if (!value) return false;
    //     return phoneRegex.test(value);
    //   })
    //   .required(),
    // companyName: yup.string().required("Company name is required"),
    // companyAddress: yup.string().required("Company address is required"),
    // country: yup.string().required("Country is required"),
    // state: yup.string().required("State is required"),
    // zipCode: yup
    //   .string()
    //   .matches(/^\d{5}$/, "Zip code must be 5 digits")
    //   .required("Zip code is required"),
  });

  type FormData = yup.InferType<typeof schema>;

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.data.name);
      //   form.setValue("email", user.data.email);
      //   form.setValue("phone", user.data.phone);
      //   form.setValue("companyName", user.data.companyName);
      //   form.setValue("companyAddress", user.data.companyAddress);
      //   form.setValue("country", user.data.country);
      //   form.setValue("state", user.data.state);
      //   form.setValue("zipCode", user.data.zipCode);
    }
  }, [user, form.setValue]);

  async function onSubmit(formData: FormData) {
    try {
      console.log("🚀 ~ onSubmit ~ formData:", formData);
      const res = await updateUser(formData).unwrap();

      if (res.status === 200) {
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>Name</Label>
                <FormControl>
                  <Input
                    className="mt-1.5"
                    type="text"
                    placeholder="Name"
                    autoComplete="name"
                    {...form.register("name")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Name */}

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
