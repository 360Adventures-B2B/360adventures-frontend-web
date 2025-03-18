import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import { Metadata } from "next";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

const funnelDisplay = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "360Adventures - B2B Platform",
  description: "360Adventures B2B Platform",
  // themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/360adventures-favicon.png" },
    { rel: "icon", url: "icons/360adventures-favicon.png" },
  ],
};

export default function RootLayout({ children, params }: { children: React.ReactNode; params: any }) {
  return (
    <html lang="en" className={funnelDisplay.className}>
      <body className="bg-white theme-360adventures text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
     
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster />
      </body>
    </html>
  );
}
