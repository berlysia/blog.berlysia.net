import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { MyThemeProvider } from "../components/MyThemeProvider";
import { GlobalStyle } from "../components/GlobalStyle";
import { gaEnabled, sendPageView } from "../lib/gtag";

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
      <GlobalStyle />
      <MyThemeProvider daylight>
        <Component {...pageProps} />
      </MyThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
