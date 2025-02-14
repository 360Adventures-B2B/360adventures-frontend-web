"use client";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Link from "next/link";
import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useRequestUserResetPasswordMutation } from "@/lib/services/authService";
import { handleError } from "@/lib/handleApiError";

export default function FormForgotPassword() {
  const phoneRegex = /^[0-9]{10,15}$/;
  const schema = yup.object().shape({
    email: yup
      .string()
      .test("email-or-phone", "email or phone invalid", (value) => {
        if (!value) return false;
        return yup.string().email().isValidSync(value) || phoneRegex.test(value);
      })
      .required(),
  });

  type FormData = yup.InferType<typeof schema>;

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const [requestUserResetPassword, { isLoading }] = useRequestUserResetPasswordMutation();

  async function onSubmit(formData: FormData) {
    try {
      const res = await requestUserResetPassword(formData).unwrap();
      if (res.code === 200) {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Success",
          description: "Check Email Your Reset Password Link",
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

  return (
    <>
      <Form {...form}>
        <form className="grid grid-cols-1 gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">Email address or Mobile phone</span>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Email address or Mobile phone"
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
          <ButtonPrimary loading={isLoading} type="submit">
            Send Reset Link
          </ButtonPrimary>
        </form>
      </Form>
      <span className="block text-center text-neutral-700 dark:text-neutral-300">
        <Link href="/login" className="font-semibold underline">
          Login Here
        </Link>
      </span>
    </>
  );
}
