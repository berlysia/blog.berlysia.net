export function ArticleLink({
  href,
  title,
  site,
  pubDateString,
  withHatenaBookmark,
  target = "_self",
}: {
  readonly href: string;
  readonly title: string;
  readonly site?: {
    url: string;
    title: string;
  };
  readonly pubDateString: string;
  readonly withHatenaBookmark?: boolean;
  readonly target?: "_blank" | "_self" | "_parent" | "_top" | (string & {});
}) {
  return (
    <div className="tw:rounded-xl tw:border-pink-200 tw:border tw:p-2 tw:my-1">
      <a
        className="tw:block tw:rounded-md tw:pt-4 tw:pb-4 tw:text-2xl tw:text-blue-600 tw:visited:text-purple-800 tw:hover:bg-pink-100 tw:focus:bg-pink-100"
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : ""}
      >
        {title}
      </a>

      <hr className="tw:border-pink-100 tw:border-dotted" />

      <div className="tw:flex tw:items-center tw:min-w-0">
        {site ? (
          <a
            href={site.url}
            className="tw:grow tw:rounded-md tw:text-sm tw:overflow-hidden tw:whitespace-nowrap tw:text-ellipsis tw:no-underline tw:text-blue-600 tw:visited:text-purple-800 tw:hover:bg-gray-200 tw:focus:bg-gray-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.title}
          </a>
        ) : null}
        <div className="tw:ml-auto tw:flex tw:items-center tw:gap-1 tw:shrink-0">
          <time
            className="tw:shrink-0 tw:block tw:text-right tw:text-xs tw:no-underline"
            dateTime={pubDateString}
          >
            {pubDateString}
          </time>
        </div>
      </div>
    </div>
  );
}
