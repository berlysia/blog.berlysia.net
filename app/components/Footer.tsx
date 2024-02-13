import { css } from "hono/css";
import type { PropsWithChildren } from "hono/jsx";

type Props = PropsWithChildren;

export default function Footer({ children }: Props) {
  return (
    <footer className="footer tw-is-full tw-bs-14 tw-flex tw-justify-center">
      <div className="tw-flex tw-flex-col tw-max-w-screen-lg tw-w-full tw-h-full tw-relative tw-px-2">
        {children}
      </div>
    </footer>
  );
}
