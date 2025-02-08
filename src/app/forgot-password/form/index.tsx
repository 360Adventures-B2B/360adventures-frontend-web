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

  const [isLoading, setLoading] = useState(false);


  async function onSubmit(formData: FormData) {
    setLoading(true);
    try {
      if (formData.email === "test@gmail.com") {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Success",
          variant: "success",
          description: "Send reset link send to your email or whatsapp",
          duration: 5000,
        });
      } else {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Error",
          description: "Invalid Credentials",
          variant: "destructive",
          duration: 5000,
        });

        setLoading(false);
      }
    } catch (error) {
      toast({
        className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
        title: "Error",
        description: "Server Error",
        variant: "destructive",
        duration: 5000,
      });
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
