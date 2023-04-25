export function ArticleLink({
  href,
  title,
  site,
  pubDateString,
  withHatenaBookmark,
  target = "_self",
}: {
  href: string;
  title: string;
  site?: {
    url: string;
    title: string;
  };
  pubDateString: string;
  withHatenaBookmark?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types -- idiom
  target?: "_blank" | "_self" | "_parent" | "_top" | (string & {});
}) {
  return (
    <div className="tw-rounded-xl tw-border-pink-200 tw-border tw-p-2 tw-mlb-1">
      <a
        className="tw-block tw-rounded-md tw-py-4 tw-text-2xl tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-pink-100 focus:tw-bg-pink-100"
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : ""}
      >
        {title}
      </a>

      <hr className="tw-border-pink-100 tw-border-dotted" />

      <div className="tw-flex tw-items-center tw-min-w-0">
        {site ? (
          <a
            href={site.url}
            className="tw-flex-grow tw-rounded-md tw-text-sm tw-overflow-hidden tw-whitespace-nowrap tw-overflow-ellipsis tw-no-underline tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.title}
          </a>
        ) : null}
        <div className="tw-ml-auto tw-flex tw-items-center tw-gap-1 tw-flex-shrink-0">
          {withHatenaBookmark ? (
            <a
              href={`https://b.hatena.ne.jp/entry/${href}`}
              className="tw-flex tw-items-center tw-rounded-md tw-px-1 tw-h-6 tw-flex-shrink-0 tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="tw-block tw-object-contain"
                src={`https://b.hatena.ne.jp/entry/image/${href}`}
                alt="はてなブックマーク"
              />
            </a>
          ) : null}
          <time
            className="tw-flex-shrink-0 tw-block tw-text-right tw-text-xs tw-no-underline"
            dateTime={pubDateString}
          >
            {pubDateString}
          </time>
        </div>
      </div>
    </div>
  );
}
