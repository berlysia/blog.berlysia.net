import { useEffect } from "react";
import type { ReactNode } from "react";
import { gaEnabled, GA_ID } from "../lib/gtag";
import "../globalStyle.css";
import { InjectGA } from "../components/InjectGA";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="crossOrigin"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
          rel="stylesheet"
        />
        {gaEnabled && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <InjectGA />
        {children}
      </body>
    </html>
  );
}
