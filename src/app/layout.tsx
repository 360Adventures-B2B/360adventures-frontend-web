import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "@/components/ui/toaster";
import { LogoProvider } from "@/context/LogoProvider";

const funnelDisplay = Poppins({ subsets: ["latin"], display: "swap", weight: ["300","400","500","600","700"] });

async function getSetting(key: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/setting-websites`, {
    headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "" },
    cache: "no-store",
  });
  const data = await res.json();
  return data.data.find((s: any) => s.key === key)?.value || "";
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const favicon = (await getSetting("site_favicon")) || "/icons/360adventures-favicon.png";
  const siteLogo = (await getSetting("site_logo")) || "/img/360adventures-logo.png";

  return (
    <html lang="en" className={funnelDisplay.className}>
      <head>
        <title>360Adventures - B2B Platform</title>
        <link rel="icon" href={favicon} />
        <link rel="apple-touch-icon" href={favicon} />
      </head>
      <body className="bg-white theme-360adventures text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <LogoProvider logo={siteLogo}>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster />
        </LogoProvider>
      </body>
    </html>
  );
}
