"use client";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Link from "next/link";
import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLoginUserMutation } from "@/lib/services/authService";
import { handleError } from "@/lib/handleApiError";
import { Route } from "next";

export default function FormLogin() {
  const phoneRegex = /^[0-9]{10,15}$/;
  const schema = yup.object().shape({
    email: yup
      .string()
      .test("email-or-phone", "email or phone invalid", (value) => {
        if (!value) return false;
        return yup.string().email().isValidSync(value) || phoneRegex.test(value);
      })
      .required(),
    password: yup.string().min(6).max(32).required(),
  });

  type FormData = yup.InferType<typeof schema>;

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const router = useRouter();
  const searchParams = useSearchParams();

  async function onSubmit(formData: FormData) {
    try {
      const value = {
        user: formData.email,
        password: formData.password,
      };
      const res = await loginUser(value).unwrap();

      if (res.code == 200) {
        const user = res.data.user;
        const result = await signIn("credentials", {
          id: user.ulid,
          email: user.email,
          name: user.name,
          token: res.data.token,
          callbackUrl: searchParams.get("callbackUrl") || "/",
          action: "login",
          redirect: false,
        });

        window.location.href = (result?.url || "/")
        // router.push((result?.url as Route) || "/");

        // if (result?.ok) {
        //   router.push("/");
        // } else {
        //   toast({
        //     className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
        //     title: "Error",
        //     description: "Something Wrong, Try Again!",
        //     variant: "destructive",
        //     duration: 5000,
        //   });
        //   router.push("/login");
        // }
      } else {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Error",
          description: "Invalid Credentials",
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
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Password
              <Link href="/forgot-password" className="text-sm underline font-medium">
                Forgot password?
              </Link>
            </span>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" autoComplete="password" className="mt-1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </label>
          <ButtonPrimary loading={isLoading} type="submit">
            Login
          </ButtonPrimary>
        </form>
      </Form>
      <span className="block text-center text-neutral-700 dark:text-neutral-300">
        New agent? {` `}
        <Link href="/register" className="font-semibold underline">
          Create an account
        </Link>
      </span>
    </>
  );
}
