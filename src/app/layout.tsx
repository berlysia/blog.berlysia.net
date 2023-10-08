import { Partytown } from "@builder.io/partytown/react";
import type { ReactNode } from "react";
import { Lato } from "next/font/google";
import Script from "next/script";
import { gaEnabled, GA_ID } from "../lib/gtag";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globalStyle.css";
import { SITE_NAME } from "../constant";

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-family-lato",
});

export const metadata = {
  title: `${SITE_NAME}`,
};

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <html lang="ja" className={lato.variable}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {gaEnabled && (
          <>
            <Partytown forward={["dataLayer.push"]} />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="worker"
            />
            <Script
              id="gtag-init"
              strategy="worker"
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
