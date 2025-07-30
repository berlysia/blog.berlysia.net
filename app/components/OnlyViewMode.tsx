import type { PropsWithChildren } from "hono/jsx";

export function OnlyVertical({ children }: PropsWithChildren) {
  return <div className="only-vertical">{children}</div>;
}

export function OnlyHorizontal({ children }: PropsWithChildren) {
  return <div className="only-horizontal">{children}</div>;
}

export function OnlyVerticalColumn({ children }: PropsWithChildren) {
  return <div className="only-vertical-multicol">{children}</div>;
}

export function NotInVertical({ children }: PropsWithChildren) {
  return <div className="not-in-vertical">{children}</div>;
}

export function NotInHorizontal({ children }: PropsWithChildren) {
  return <div className="not-in-horizontal">{children}</div>;
}

export function NotInVerticalColumn({ children }: PropsWithChildren) {
  return <div className="not-in-vertical-multicol">{children}</div>;
}
