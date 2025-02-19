"use client";

import SiteHeader from "@/app/(client-components)/(Header)/SiteHeader";
import ClientCommons from "@/app/ClientCommons";
import { usePathname } from "next/navigation";
import FooterNav from "./FooterNav";
import Footer from "./Footer";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";
import ReduxProvider from "@/lib/provider/redux";
import { BookingProvider } from "@/context/BookingContext";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hiddenPaths = ["/login", "/register", "/account-review", "/forgot-password", "/reset-password", "/otp"];

  const hideLayout = hiddenPaths.includes(pathname);

  return (
    <ReduxProvider>
      <AuthProvider>
        <BookingProvider>
        <div>
          {!hideLayout && <ClientCommons />}
          {!hideLayout && <SiteHeader />}
          {children}
          {!hideLayout && <FooterNav />}
          {!hideLayout && <Footer />}
        </div>
        </BookingProvider>
      </AuthProvider>
    </ReduxProvider>
  );
};

export default LayoutWrapper;
