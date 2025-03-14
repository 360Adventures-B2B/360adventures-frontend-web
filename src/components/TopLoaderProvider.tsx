// components/TopLoaderProvider.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

export default function TopLoaderProvider() {
  const router = useRouter();

  useEffect(() => {
    const startLoader = () => (window as any).nextJsTopLoader?.start();
    const stopLoader = () => (window as any).nextJsTopLoader?.done();

    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (...args) => {
      startLoader();
      return originalPush(...args);
    };

    router.replace = (...args) => {
      startLoader();
      return originalReplace(...args);
    };

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router]);

  return (
    <NextTopLoader
      color="#587A72"
      height={4}
      showSpinner={false}
      speed={300}
    />
  );
}
