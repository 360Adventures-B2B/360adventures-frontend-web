import React, { FC } from "react";
import Logo from "@/shared/Logo";
import FormOTP from "./form";

export interface PageOTPProps {}

const PageOTP: FC<PageOTPProps> = ({}) => {
  return (
    <div className={`nc-PageOTP`}>
      <div className="container mb-24 lg:mb-32">
        <div className="text-center">
          <Logo className="pt-20" />
        </div>
        <h2 className="py-10 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Validate OTP
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <FormOTP />
          {/* ==== */}
        </div>
      </div>
    </div>
  );
};

export default PageOTP;
