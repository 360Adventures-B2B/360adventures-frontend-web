import React, { FC } from "react";
import Logo from "@/shared/Logo";
import FormResetPassword from "./form";

export interface PageResetPasswordProps {}

const PageResetPassword: FC<PageResetPasswordProps> = ({}) => {
  return (
    <div className={`nc-PageResetPassword`}>
      <div className="container mb-24 lg:mb-32">
        <div className="text-center">
          <Logo className="pt-20" />
        </div>
        <h2 className="py-10 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Forgot Password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <FormResetPassword />
          {/* ==== */}
        </div>
      </div>
    </div>
  );
};

export default PageResetPassword;
