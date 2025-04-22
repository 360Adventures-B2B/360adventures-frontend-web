"use client";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useChangePasswordUserMutation, useRegisterUserMutation } from "@/lib/services/authService";
import { handleError } from "@/lib/handleApiError";
import Label from "@/components/Label";

export default function FormChangePassword() {
  const schema = yup.object().shape({
    currentPassword: yup.string().required("Old password is required"),

    newPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
      .required("New password is required"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), undefined], "Confirmation password doesn't match")
      .required("Confirm password is required"),
  });

  type FormData = yup.InferType<typeof schema>;

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [changePassword, { isLoading }] = useChangePasswordUserMutation();

  const router = useRouter();

  async function onSubmit(formData: FormData) {
    try {
      const value = {
        old_password: formData.currentPassword,
        new_password: formData.newPassword,
        password_confirmation: formData.confirmPassword,
      };
      const res = await changePassword(value).unwrap();
      if (res.code == 200) {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Success",
          description: "Password successfully changed!",
          variant: "success",
          duration: 2000,
        });
      } else {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Error",
          description: "Failed to change password",
          variant: "destructive",
          duration: 200,
        });
      }
      form.reset();
    } catch (error: any) {
      form.reset();
      handleError(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form className="max-w-xl space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <Label>Old Password</Label>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Old Password"
                    autoComplete="current-password"
                    className="mt-1 w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <Label>New Password</Label>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New Password"
                    autoComplete="new-password"
                    className="mt-1 w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <Label>New Password Confirmation</Label>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New Password Confirmation"
                    autoComplete="new-password"
                    className="mt-1 w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <ButtonPrimary loading={isLoading} type="submit">
              Update password
            </ButtonPrimary>
          </div>
        </form>
      </Form>
    </>
  );
}
