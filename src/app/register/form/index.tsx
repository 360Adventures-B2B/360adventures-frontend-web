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
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useRegisterUserMutation } from "@/lib/services/authService";
import { handleError } from "@/lib/handleApiError";

export default function FormRegister() {
  const phoneRegex = /^[0-9]{10,15}$/;
  const schema = yup.object().shape({
    name: yup.string().min(3, "full name must be at least 3 characters").required("full name is a required field"),
    username: yup.string().min(5, "username must be at least 5 characters").required("username is a required field"),
    email: yup
      .string()
      .test("email-or-phone", "email or phone invalid", (value) => {
        if (!value) return false;
        return yup.string().email().isValidSync(value) || phoneRegex.test(value);
      })
      .required(),
    password: yup.string().min(6).max(32).required(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "confirmation password doesn't match")
      .required("password confirmation is a required field"),
  });

  type FormData = yup.InferType<typeof schema>;

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const router = useRouter();

  async function onSubmit(formData: FormData) {
    try {
      const value = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      const res = await registerUser(value).unwrap();

      if (res.code == 201) {
        const user = res.data.user;

        const result = await signIn("credentials", {
          id: user.id,
          email: user.email,
          name: user.name,
          token: res.data.token,
          callbackUrl: "/",
          action: "register",
          redirect: false,
        });
        if (result) {
          toast({
            className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
            title: "Error",
            description: "Check Email Your OTP",
            variant: "success",
            duration: 5000,
          });
          router.push("/otp");
        } else {
          toast({
            className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
            title: "Error",
            description: "Something Wrong, Try Again!",
            variant: "destructive",
            duration: 5000,
          });
          router.push("/register");
        }
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
        <form className="grid grid-cols-1 gap-6 gap-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">Full Name</span>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Name" autoComplete="name" className="mt-1 w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </label>

          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">Username</span>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
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

          <ButtonPrimary loading={isLoading} type="submit" className="w-full">
            Register
          </ButtonPrimary>
        </form>
      </Form>

      <span className="block text-center text-neutral-700 dark:text-neutral-300">
        Already an account? {` `}
        <Link href="/login" className="font-semibold underline">
          Login
        </Link>
      </span>
    </>
  );
}
