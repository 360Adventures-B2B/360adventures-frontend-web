import React, { FC } from "react";
import Link from "next/link";
import Logo from "@/shared/Logo";
import FormLogin from "./form";

export interface PageLoginProps {}


const PageLogin: FC<PageLoginProps> = ({}) => {
  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <div className="text-center">
          <Logo className="pt-20" />
        </div>
        <h2 className="py-10 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login Agent
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <FormLogin />
          {/* ==== */}
         
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
