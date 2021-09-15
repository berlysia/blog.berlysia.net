import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { gaEnabled, sendPageView } from "../lib/gtag";
import "../globalStyle.css";

function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  const router = useRouter();
  useEffect(() => {
    if (!gaEnabled) {
      return;
    }

    const handleRouteChange = (path: string) => {
      sendPageView(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default App;
