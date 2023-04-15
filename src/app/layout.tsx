import { Partytown } from "@builder.io/partytown/react";
import type { ReactNode } from "react";
import { gaEnabled, GA_ID } from "../lib/gtag";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globalStyle.css";

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
          rel="stylesheet"
        />
        {gaEnabled && (
          <>
            <Partytown forward={["dataLayer.push"]} />
            <script
              type="text/partytown"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              type="text/partytown"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
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
      <body>{children}</body>
    </html>
  );
}
