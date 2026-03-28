"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// This component tracks page views
// To use Google Analytics 4, replace the inside of useEffect with:
// gtag('config', 'G-XXXXXXXXXX', { page_path: pathname });

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();

    // Track pageview (console log for dev verification)
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics] Page view:", url);
    }

    // Send to Plausible (if using)
    // window.plausible?.("pageview", { props: { path: url } });

    // Send to GA4
    // if (typeof window.gtag !== "undefined") {
    //   window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, { page_path: url });
    // }
  }, [pathname, searchParams]);

  return null;
}
