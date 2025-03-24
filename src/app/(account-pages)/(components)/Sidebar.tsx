"use client";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export const Sidebar = () => {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const menuItems = [
    {
      href: "/account-booking",
      icon: "la-calendar-check",
      label: "Booking",
    },
    {
      href: "/",
      icon: "la-wallet",
      label: "Wallet",
      submenu: [
        { href: "/account-wallet/topup", icon: "la-credit-card", label: "Topup Request" },
        { href: "/account-wallet/history", icon: "la-money-check", label: "Credit Histories" },
      ],
    },
    { href: "/account-savelists", icon: "la-heart", label: "Wishlists" },
    { href: "/account", icon: "la-user", label: "Profile" },
    { href: "/account-password", icon: "la-key", label: "Change Password" },  
    { href: "/logout", icon: "la-sign-out-alt", label: "Logout" },
  ];

  return (
    <div className="hidden sm:block w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 p-8">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.href}>
            <div
              className={`flex items-center justify-between space-x-2 rounded-lg p-2 cursor-pointer transition-colors ${
                pathname === item.href ? "bg-primary-6000 text-white" : "hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
              onClick={() => item.submenu && toggleSubmenu(item.label)}
            >
              {item.href !== "/" ? (
                <Link href={item.href as Route} className="flex items-center space-x-2">
                  <i className={`las ${item.icon} text-lg`}></i>
                  <span>{item.label}</span>
                </Link>
              ) : (
                <div className="flex items-center space-x-2">
                  <i className={`las ${item.icon} text-lg`}></i>
                  <span>{item.label}</span>
                </div>
              )}
              {item.submenu && (
                <i className={`las ${openSubmenu === item.label ? "la-angle-up" : "la-angle-down"}`}></i>
              )}
            </div>
            {item.submenu && openSubmenu === item.label && (
              <ul className="pl-3 mt-2 ml-4 space-y-2">
                {item.submenu.map((sub) => (
                  <li key={sub.href}>
                    <Link
                      href={sub.href as Route}
                      className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                        pathname === sub.href
                          ? "bg-primary-500 text-white"
                          : "hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      }`}
                    >
                      <i className={`las ${sub.icon} text-lg`}></i>
                      <span>{sub.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
