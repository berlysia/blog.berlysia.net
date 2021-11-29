import clsx from "clsx";
import type { HTMLAttributes } from "react";

export function FullHeightContainer(props: HTMLAttributes<HTMLDivElement>) {
  const { children, className = "", ...rest } = props;
  return (
    <div
      {...rest}
      className={clsx(
        "tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
