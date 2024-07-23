import type { PropsWithChildren } from "hono/jsx";

type Props = PropsWithChildren<{ className?: string }>;

export default function Footer({ children, className }: Props) {
  return (
    <footer className="footer tw-is-full tw-bs-14 tw-flex tw-justify-center">
      <div className="contentAreaRestricter tw-flex tw-flex-col tw-w-full tw-h-full tw-relative tw-px-2">
        {children}
      </div>
    </footer>
  );
}
