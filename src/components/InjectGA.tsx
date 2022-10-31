"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { gaEnabled, sendPageView } from "../lib/gtag";

export function InjectGA() {
  const router = useRouter();
  useEffect(() => {
    if (!gaEnabled || !router) {
      return;
    }

    const handleRouteChange = (path: string) => {
      sendPageView(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, router?.events]);
  return null;
}
