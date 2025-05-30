import React, { FC } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import FormRegister from "./form";
import Logo from "@/shared/Logo";

export interface PageRegisterProps {}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageRegister: FC<PageRegisterProps> = ({}) => {
  return (
    <div className={`nc-PageRegister  `}>
      <div className="container mb-24 lg:mb-32">
        <div className="text-center">
          <Logo className="pt-20" />
        </div>
        <h2 className="py-10 flex items-center text-2xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Register Agent
        </h2>
       <div className="max-w-2xl mx-auto px-4 lg:px-6 py-8 space-y-6">
          <FormRegister />
        </div>
      </div>
    </div>
  );
};

export default PageRegister;
