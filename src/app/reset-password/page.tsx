import React, { FC } from "react";
import Logo from "@/shared/Logo";
import FormResetPassword from "./form";
import { redirect } from "next/navigation";

export interface PageResetPasswordProps {}

// async function validateResetToken(token: string) {
//   try {
//     // const response = await fetch('/api/validate-reset-token', {
//     //   method: 'POST',
//     //   body: JSON.stringify({ token })
//     // })
//     if (token === "123123") {
//       return true;
//     }
//   } catch (error) {
//     return false;
//   }
// }

export default async function PageResetPassword({ searchParams }: { searchParams: { token: string } }) {
  const { token } = searchParams;
  // const isValidToken = await validateResetToken(token);

  // if (!isValidToken) {
  //   redirect("/login");
  // }
  return (
    <div className={`nc-PageResetPassword`}>
      <div className="container mb-24 lg:mb-32">
        <div className="text-center">
          <Logo className="pt-20" />
        </div>
        <h2 className="py-10 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Reset Password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <FormResetPassword />
          {/* ==== */}
        </div>
      </div>
    </div>
  );
}
