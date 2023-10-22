import type { ReactNode } from "react";
import Image from "next/image";

type Props = {
  readonly children: ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <header className="tw-sticky tw-z-10 tw-top-0 tw-left-0 tw-right-0 tw-bg-keyColor-50 tw-h-10 tw-border-b tw-border-keyColor-200 tw-w-full tw-flex tw-justify-center">
      <div className="tw-flex tw-flex-row tw-max-w-screen-lg tw-w-full tw-h-full tw-relative">
        <div className="tw-left-0 tw-leading-10 tw-align-baseline tw-grow tw-h-full tw-flex tw-flex-row tw-overflow-hidden">
          {children}
        </div>
        <div className="tw-flex tw-h-full tw-items-center">
          <a href="/" className="tw-block tw-w-fit tw-h-fit tw-mx-2">
            <Image
              src="/avatar.jpg"
              alt="avatar"
              width={36}
              height={36}
              className="tw-block tw-rounded-md tw-border tw-border-keyColor-100"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
