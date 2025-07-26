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

const appName = process.env.NEXT_PUBLIC_APP_NAME || "Your Company";

const Footer: React.FC = () => {
  const androidAppUrl = useSettingValue("anroid_app_url");
  const iosAppUrl = useSettingValue("ios_app_url");
  return (
    <>
      <footer className="bg-white border-t border-gray-200 text-gray-700 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Review Us */}
          <div className="flex flex-col items-start space-y-4">
            <h4 className="font-bold text-lg">Review Us</h4>
            <div className="flex items-center space-x-4">
              <Link
                href="https://www.tripadvisor.com/Attraction_Review-g295424-d25548548-Reviews-360_Adventures_Tourism_LLC-Dubai_Emirate_of_Dubai.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={TripadvisorPng}
                  alt="Tripadvisor Travelers Choice"
                  width={100}
                  height={100}
                  className="object-contain hover:scale-105 transition-transform"
                />
              </Link>

              <Link
                href="https://g.co/kgs/JHPv82R"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={ReviewUsJpg}
                  alt="Review Us"
                  width={100}
                  height={100}
                  className="object-contain hover:scale-105 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* Business Links - Vertikal */}
          <div className="flex flex-col items-start space-y-4">
            <h4 className="font-bold text-lg mb-2">Business</h4>
            <div className="flex items-center space-x-2 text-sm">
              <Link
                href="https://360adventures.ae/about-us"
                target="_blank"
                className="hover:text-primary-6000 transition text-sm"
              >
                About Us
              </Link>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Link
                href="/privacy-policy"
                className="hover:text-primary-6000 transition text-sm"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <Link
                href="/terms-condition"
                className="hover:text-primary-6000 transition text-sm"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-start space-y-4">
            <h4 className="font-bold text-lg">Contact Us</h4>
            <div className="flex items-center space-x-2 text-sm">
              <i className="las la-envelope text-primary-6000 text-xl"></i>
              <a
                href="mailto:support@360adventures.ae"
                className="hover:text-primary-6000 transition"
              >
                support@360adventures.ae
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <i className="las la-phone text-primary-6000 text-xl"></i>
              <a
                href="tel:+971501234567"
                className="hover:text-primary-6000 transition"
              >
                +971 58 273 4717
              </a>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <i className="lab la-whatsapp text-primary-6000 text-xl"></i>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                className="hover:text-primary-6000 transition"
              >
                +971 58 273 4717
              </a>
            </div>
          </div>

          {/* Social Media + App Links */}
          <div className="flex flex-col items-start md:items-end space-y-4">
            <h4 className="font-bold text-lg">Social Media</h4>
            <div className="flex space-x-4 text-2xl">
              <Link
                href="https://www.instagram.com/360adventures.ae/"
                target="_blank"
              >
                <i className="lab la-instagram hover:text-primary-6000 transition"></i>
              </Link>
              <Link href="https://www.facebook.com/" target="_blank">
                <i className="lab la-facebook hover:text-primary-6000 transition"></i>
              </Link>
              <Link
                href="https://www.linkedin.com/company/360-adventures-tourism/"
                target="_blank"
              >
                <i className="lab la-linkedin hover:text-primary-6000 transition"></i>
              </Link>
              <Link
                href="https://www.youtube.com/@360Adventures-ae"
                target="_blank"
              >
                <i className="lab la-youtube hover:text-primary-6000 transition"></i>
              </Link>
            </div>

            {/* Download Apps */}
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
