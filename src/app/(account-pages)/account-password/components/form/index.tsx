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
import { useRegisterUserMutation } from "@/lib/services/authService";
import { handleError } from "@/lib/handleApiError";
import Label from "@/components/Label";

export default function FormChangePassword() {
  const schema = yup.object().shape({
    currentPassword: yup.string().required("Current password is required"),
    newPassword: yup.string().min(6, "Password must be at least 6 characters").required("New password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
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

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const router = useRouter();

  async function onSubmit(formData: FormData) {
    try {
      // const value = {
      //   name: formData.name,
      //   username: formData.username,
      //   email: formData.email,
      //   password: formData.password,
      // };
      // const res = await registerUser(value).unwrap();
      // if (res.code == 201) {
      //   const user = res.data.user;
      //   const result = await signIn("credentials", {
      //     id: user.ulid,
      //     email: user.email,
      //     name: user.name,
      //     token: res.data.token,
      //     callbackUrl: "/",
      //     action: "register",
      //     redirect: false,
      //   });
      //   if (result) {
      //     toast({
      //       className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
      //       title: "Success",
      //       description: "Check Email Your OTP",
      //       variant: "success",
      //       duration: 5000,
      //     });
      //     router.push("/otp");
      //   } else {
      //     toast({
      //       className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
      //       title: "Error",
      //       description: "Something Wrong, Try Again!",
      //       variant: "destructive",
      //       duration: 5000,
      //     });
      //     router.push("/register");
      //   }
      // } else {
      //   toast({
      //     className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
      //     title: "Error",
      //     description: "Invalid Credentials",
      //     variant: "destructive",
      //     duration: 5000,
      //   });
      // }
    } catch (error: any) {
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
                    placeholder="Current password"
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
                    placeholder="New password"
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
                    placeholder="Confirm password"
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
            <ButtonPrimary type="submit">Update password</ButtonPrimary>
          </div>
        </form>
      </Form>
    </>
  );
}
