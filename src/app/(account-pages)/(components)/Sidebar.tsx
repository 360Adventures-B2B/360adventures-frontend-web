"use client";
import { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = [
    { href: "/account-booking", icon: "la-calendar-check", label: "Booking" },
    { href: "/account-topup", icon: "la-wallet", label: "Topup" },
    { href: "/account-savelists", icon: "la-heart", label: "Wishlists" },
    { href: "/account", icon: "la-user", label: "Profile" },
    { href: "/account-password", icon: "la-key", label: "Change Password" },
    { href: "/logout", icon: "la-sign-out-alt", label: "Logout" },
  ];

  return (
    <div className="hidden sm:block w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 p-8">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.href} className="">
            <Link
              href={item.href as Route}
              className={`flex items-center space-x-2 rounded-lg p-2 transition-colors ${
                pathname === item.href ? "bg-primary-6000 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              <i className={`las ${item.icon} text-lg`}></i>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
