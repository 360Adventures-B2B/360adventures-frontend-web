"use client";

import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import FooterNav from "./FooterNav";
import Link from "next/link";
import Image from "next/image";
import PlaystorePng from "@/images/download-play-store.png";
import AppstorePng from "@/images/download-app-store.png";
import TripadvisorPng from "@/images/trip-advisor.png";
import ReviewUsJpg from "@/images/review-us.jpg";
import { useSettingValue } from "@/utils/getSettings";
import { Route } from "next";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Getting started",
    menus: [
      { href: "#", label: "Installation" },
      { href: "#", label: "Release Notes" },
      { href: "#", label: "Upgrade Guide" },
      { href: "#", label: "Browser Support" },
      { href: "#", label: "Editor Support" },
    ],
  },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "#", label: "Design features" },
      { href: "#", label: "Prototyping" },
      { href: "#", label: "Design systems" },
      { href: "#", label: "Pricing" },
      { href: "#", label: "Security" },
    ],
  },
  {
    id: "2",
    title: "Resources",
    menus: [
      { href: "#", label: "Best practices" },
      { href: "#", label: "Support" },
      { href: "#", label: "Developers" },
      { href: "#", label: "Learn design" },
      { href: "#", label: "Releases" },
    ],
  },
  {
    id: "4",
    title: "Community",
    menus: [
      { href: "#", label: "Discussion Forums" },
      { href: "#", label: "Code of Conduct" },
      { href: "#", label: "Community Resources" },
      { href: "#", label: "Contributing" },
      { href: "#", label: "Concurrent Mode" },
    ],
  },
];

const appName = process.env.NEXT_PUBLIC_APP_NAME || "Your Company";

const Footer: React.FC = () => {
  const androidAppUrl = useSettingValue("anroid_app_url");
  const iosAppUrl = useSettingValue("ios_app_url");

  return (
    // <>
    //   <FooterNav />

    //   <div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
    //     <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
    //       <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
    //         <div className="col-span-2 md:col-span-1">
    //           <Logo />
    //         </div>
    //         <div className="col-span-2 flex items-center md:col-span-3">
    //           <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
    //         </div>
    //       </div>
    //       {widgetMenus.map(renderWidgetMenuItem)}
    //     </div>
    //   </div>
    // </>
    <>
      <footer className="bg-white border-t border-gray-200 text-gray-700 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo & Award / Review Us */}
          <div className="flex flex-col items-start md:items-start space-y-4">
            <h4 className="font-bold text-lg">Review Us</h4>
            <div className="flex items-center space-x-4">
              <Image
                src={TripadvisorPng}
                alt="Tripadvisor Travelers Choice"
                width={100}
                height={100}
                className="object-contain hover:scale-105 transition-transform"
              />
              <Image
                src={ReviewUsJpg}
                alt="Review Us"
                width={100}
                height={100}
                className="object-contain hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Business Links - Responsive (stack di mobile, inline di desktop) */}
          <div className="flex flex-col items-start md:items-center">
            <h4 className="font-bold text-lg mb-3">Business</h4>
            <div className="flex flex-col md:flex-row text-sm space-y-2 md:space-y-0 md:space-x-3">
              <Link href="#" className="hover:text-primary-6000 transition">
                About Us
              </Link>
              <span className="hidden md:inline">|</span>
              <Link href="#" className="hover:text-primary-6000 transition">
                Privacy Policy
              </Link>
              <span className="hidden md:inline">|</span>
              <Link href="#" className="hover:text-primary-6000 transition">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Social Media + App Links */}
          <div className="flex flex-col items-start md:items-end space-y-4">
            <h4 className="font-bold text-lg">Social Media</h4>
            <div className="flex space-x-4 text-2xl">
              <Link href="#">
                <i className="lab la-facebook hover:text-primary-6000 transition"></i>
              </Link>
              <Link href="#">
                <i className="lab la-linkedin hover:text-primary-6000 transition"></i>
              </Link>
              <Link href="#">
                <i className="lab la-instagram hover:text-primary-6000 transition"></i>
              </Link>
              <Link href="#">
                <i className="lab la-youtube hover:text-primary-6000 transition"></i>
              </Link>
            </div>

            {/* Download Apps (Image buttons) */}
            <div className="flex space-x-4 mt-4">
              <Link href={(androidAppUrl || "#") as Route} target="_blank">
                <Image
                  src={PlaystorePng}
                  alt="Download on Google Play"
                  width={150}
                  height={45}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <Link href={(iosAppUrl || "#") as Route} target="_blank">
                <Image
                  src={AppstorePng}
                  alt="Download on App Store"
                  width={150}
                  height={45}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 py-4 text-center text-sm">
          © {new Date().getFullYear()} {appName}. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
