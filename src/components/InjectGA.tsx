"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { gaEnabled, sendPageView } from "../lib/gtag";

export function InjectGA() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!gaEnabled) return;
    const url = pathname + searchParams.toString();
    sendPageView(url);
  }, [pathname, searchParams]);
  return null;
}
