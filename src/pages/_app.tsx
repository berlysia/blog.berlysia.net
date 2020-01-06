import React from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";

function App({ Component }: { Component: any }) {
  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  );
}

export default App;
