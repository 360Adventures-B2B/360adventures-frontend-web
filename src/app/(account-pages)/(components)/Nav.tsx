"use client";

import { Route } from "@/routers/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Nav = () => {
  const pathname = usePathname();

  const listNav = [
    { href: "/account-booking", label: "Booking" },
    { href: "/account-topup", label: "Topup" },
    { href: "/account-savelists", label: "Wishlists" },
    { href: "/account", label: "Profile" },
    { href: "/account-password", label: "Change Password" },
  ];

  return (
    <div className="container">
      <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
        {listNav.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href as Route}
              className={`block py-5 md:py-8 border-b-2 flex-shrink-0 capitalize ${
                isActive ? "border-primary-500 font-medium" : "border-transparent"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
