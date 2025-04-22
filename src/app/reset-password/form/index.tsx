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
import { useRouter, useSearchParams } from "next/navigation";
import { useResetUserPasswordMutation } from "@/lib/services/authService";
import { handleError } from "@/lib/handleApiError";

export default function FormResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const otp = searchParams.get("otp");

  const schema = yup.object().shape({
    password: yup.string().min(6).max(32).required(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "confirmation password doesn't match")
      .required("password confirmation is a required field"),
  });

  type FormData = yup.InferType<typeof schema>;

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const [resetUserPassword, { isLoading }] = useResetUserPasswordMutation();
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    try {
      const values = {
        password: formData.password,
      };
      const res = await resetUserPassword({ credentials: values, token, otp }).unwrap();
      console.log("🚀 ~ onSubmit ~ res:", res);

      if (res.code === 200) {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Success",
          description: "Reset Password Successfully, Please Login",
          variant: "success",
          duration: 5000,
        });
        router.push("/login");
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
            <span className="text-neutral-800 dark:text-neutral-200">Password</span>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      autoComplete="password"
                      className="mt-1 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </label>

          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">Confirmation Password</span>
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirmation Password"
                      autoComplete="confirmation_password"
                      className="mt-1 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </label>

          <ButtonPrimary loading={isLoading} type="submit">
            Reset Password
          </ButtonPrimary>
        </form>
      </Form>
    </>
  );
}
