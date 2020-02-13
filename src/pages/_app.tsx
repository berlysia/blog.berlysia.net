import React from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { MyThemeProvider } from "../components/MyThemeProvider";
import { GlobalStyle } from "../components/GlobalStyle";

function App({ Component }: { Component: any }) {
  return (
    <ErrorBoundary>
      <GlobalStyle />
      <MyThemeProvider daylight>
        <Component />
      </MyThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
