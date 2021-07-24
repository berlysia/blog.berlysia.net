import "modern-css-reset/dist/reset.min.css";
import "../global.scss";
import type { AppProps } from "next/app";
import { Shell } from "../components/Shell";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Shell>
      <Component {...pageProps} />
    </Shell>
  );
}
export default MyApp;
