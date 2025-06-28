import type { PropsWithChildren } from "hono/jsx";

type Props = PropsWithChildren;

export default function Header({ children }: Props) {
  return (
    <header className="tw-sticky tw-z-10 tw-top-0 tw-left-0 tw-right-0 tw-bg-semantic-surface tw-h-10 tw-border-b tw-border-semantic-accent tw-w-full tw-flex tw-justify-center">
      <div className="contentAreaRestricter tw-flex tw-flex-row tw-w-full tw-h-full tw-relative">
        <div className="tw-left-0 tw-leading-10 tw-align-baseline tw-grow tw-h-full tw-flex tw-flex-row tw-overflow-hidden">
          {children}
        </div>
        <div className="tw-flex tw-h-full tw-items-center tw-flex-shrink-0">
          <a
            href="https://berlysia.net"
            className="tw-block tw-w-fit tw-h-fit tw-mx-2"
          >
            <img
              src="/static/avatar/avatar-128.webp"
              alt="avatar"
              width={36}
              height={36}
              decoding="async"
              className="tw-block tw-rounded-md tw-border tw-border-semantic-subtle"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
