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
import { DateProvider } from "@/context/DateContext";
import TopLoaderProvider from "./TopLoaderProvider";
import { TopupProvider } from "@/context/TopupContext";
import { ForgotPasswordProvider } from "@/context/ForgotPasswordContext";
import { UnavailableDatesProvider } from "@/context/ProductUnavailableContext";
import { ErrorProvider } from "@/context/ErrorContext";
import ErrorModal from "./ErrorModal";
import { useGetSettingQuery } from "@/lib/services/settingService";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setSettings } from "@/lib/features/settingSlices";
import { LayoutContent } from "./LayoutContent";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hiddenPaths = [
    "/login",
    "/register",
    "/account-review",
    "/forgot-password",
    "/reset-password",
    "/otp",
  ];

  const hideLayout = hiddenPaths.includes(pathname);

  return (
    <>
      <TopLoaderProvider />
      <ReduxProvider>
        <ErrorProvider>
          <ErrorModal />
          <AuthProvider>
            <BookingProvider>
              <DateProvider>
                <TopupProvider>
                  <ForgotPasswordProvider>
                    <UnavailableDatesProvider>
                      {/* <div>
                         {!hideLayout && <ClientCommons />}
                        {!hideLayout && <SiteHeader />}
                        {children}
                        {!hideLayout && <FooterNav />}
                        {!hideLayout && <Footer />}
                      </div> */}
                      <LayoutContent hideLayout={hideLayout}>
                        {children}
                      </LayoutContent>
                    </UnavailableDatesProvider>
                  </ForgotPasswordProvider>
                </TopupProvider>
              </DateProvider>
            </BookingProvider>
          </AuthProvider>
        </ErrorProvider>
      </ReduxProvider>
    </>
  );
};

export default LayoutWrapper;
