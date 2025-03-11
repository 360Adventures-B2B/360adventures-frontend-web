import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { handleError } from "@/lib/handleApiError";
import Input from "@/shared/Input";
import Label from "@/components/Label";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useGetUserQuery } from "@/lib/services/authService";
import ErrorText from "@/components/ErrorText";
export default function FormCheckout() {
  const { data: user, isLoading: isLoadingUser, isError } = useGetUserQuery(undefined);

  const userData = user?.data;
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters"),
    email: yup.string().required("Email is required").email("Invalid email format"),
    phone: yup
      .string()
      .matches(/^\d+$/, "Phone must be a valid number")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits")
      .required(),
    country: yup.string().max(50, "Country must not exceed 50 characters").required(),
    city: yup.string().max(50, "City must not exceed 50 characters").required(),
    requirement: yup.string().max(500, "Special requirement must not exceed 500 characters").required(),
    payment_gateway: yup.string().required("Select a payment method"),
    term_conditions: yup.boolean().oneOf([true], "You must agree to terms"),
  });
  type FormData = yup.InferType<typeof schema>;

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
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        country: userData.country || "",
        city: userData.state || "",
        requirement: "",
      });
    }
  }, [userData, form]);

  async function onSubmit(formData: FormData) {
    try {
      console.log("🚀 ~ onSubmit ~ formData:", formData);
    } catch (error: any) {
      handleError(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-8 p-6 sm:p-6 xl:p-8">
          <h2 className="text-2xl font-semibold">Let us know who you are</h2>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">Name</span>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        autoComplete="name"
                        className="mt-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">Email</span>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        className="mt-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">Phone</span>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your phone number"
                        autoComplete="tel"
                        className="mt-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">Country</span>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Enter your country" className="mt-1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">City</span>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Enter your city" className="mt-1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </label>

            <label className="block md:col-span-2">
              <span className="text-neutral-800 dark:text-neutral-200">Special Requirement</span>
              <FormField
                control={form.control}
                name="requirement"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Special requirement" className="mt-1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </label>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">Pay with</h3>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

            <div className="mt-6 space-y-4 w-full mb-5">
              <FormField
                control={form.control}
                name="payment_gateway"
                render={({ field, fieldState }) => (
                  <>
                    <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-100 w-full">
                      <label className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            value="credit_balance"
                            checked={field.value === "credit_balance"}
                            onChange={field.onChange}
                            className="form-radio h-5 w-5 checked:bg-primary-700 hover:checked:bg-primary-700 focus:checked:bg-primary-700 focus:outline-none focus:ring-0 accent-primary-700"
                          />
                          <span className="text-lg font-medium">Credit Balance</span>
                        </div>
                        <span className="text-sm text-gray-600">Balance: {userData?.credit_amount}</span>
                      </label>
                    </div>

                    <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-100 w-full">
                      <label className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            value="visa_mastercard"
                            checked={field.value === "visa_mastercard"}
                            onChange={field.onChange}
                            className="form-radio h-5 w-5 checked:bg-primary-700 hover:checked:bg-primary-700 focus:checked:bg-primary-700 focus:outline-none focus:ring-0 accent-primary-700"
                          />
                          <span className="text-lg font-medium">Visa / Mastercard / Apple Pay / G Pay</span>
                        </div>
                      </label>
                    </div>

                    {fieldState.error && <ErrorText text={fieldState.error.message} />}
                  </>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="term_conditions"
              render={({ field, fieldState }) => (
                <>
                  <div className="flex items-center text-gray-500 text-sm">
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      className="w-4 h-4 border-gray-300 rounded checked:bg-primary-700 hover:checked:bg-primary-700 focus:checked:bg-primary-700 focus:outline-none focus:ring-0"
                      checked={field.value ?? false}
                      onChange={(e) => field.onChange(e.target.checked)}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                    <label htmlFor="termsCheckbox" className="ml-2">
                      By continuing, you agree to the
                      <a target="_blank" href="#" className="text-blue-600 hover:underline">
                        {" "}
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                  {fieldState.error && <ErrorText text={fieldState.error.message} />}
                </>
              )}
            />

            <div className="pt-8">
              <ButtonPrimary type="submit" className="w-full">
                Confirm and pay
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
