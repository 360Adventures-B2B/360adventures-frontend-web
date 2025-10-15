"use client";

import React from "react";
import Link from "next/link";
import { useLogo } from "@/context/LogoProvider";
import { StaticImageData } from "next/image";

export interface LogoProps {
  className?: string;
  imgLight?: StaticImageData; // optional, hanya untuk className dark:hidden
}

const Logo: React.FC<LogoProps> = ({ className = "w-24", imgLight }) => {
  const { logo } = useLogo();

  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      <img
        className={`block max-h-12 ${imgLight ? "dark:hidden" : ""}`}
        src={logo}
        alt="Logo"
      />
    </Link>
  );
};

export default Logo;
