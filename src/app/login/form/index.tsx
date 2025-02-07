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

export default function FormLogin() {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
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

  const [isLoading, setLoading] = useState(false);
  
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    setLoading(true);
    try {
      if (formData.email === "test@gmail.com" && formData.password === "123123") {
        const result = await signIn("credentials", {
          id: 1,
          email: formData.email,
          name: "tes123",
          token: "mantap123",
          callbackUrl: "/",
          redirect: false,
        });
        if (result) {
          router.push("/");
        } else {
          router.push("/login");
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setLoading(false);
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
            <span className="text-neutral-800 dark:text-neutral-200">Password</span>
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
