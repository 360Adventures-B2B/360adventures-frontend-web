"use client";

import SiteHeader from "@/app/(client-components)/(Header)/SiteHeader";
import ClientCommons from "@/app/ClientCommons";
import { usePathname } from "next/navigation";
import FooterNav from "./FooterNav";
import Footer from "./Footer";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hiddenPaths = ["/login", "/register"];

  const hideLayout = hiddenPaths.includes(pathname);

  return (
    <SessionProvider>
      <AuthProvider>
        <div>
          {!hideLayout && <ClientCommons />}
          {!hideLayout && <SiteHeader />}
          {children}
          {!hideLayout && <FooterNav />}
          {!hideLayout && <Footer />}
        </div>
      </AuthProvider>
    </SessionProvider>
  );
};

export default LayoutWrapper;
