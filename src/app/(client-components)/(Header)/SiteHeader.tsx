"use client";

import React, { useRef } from "react";
import Header from "./Header";
import { useThemeMode } from "@/utils/useThemeMode";

const SiteHeader = () => {
  useThemeMode();
  return (
    <>
      <Header />
    </>
  );
};

export default SiteHeader;
