export function ArticleLink({
  href,
  title,
  site,
  pubDateString,
  withHatenaBookmark,
}: {
  href: string;
  title: string;
  site?: {
    url: string;
    title: string;
  };
  pubDateString: string;
  withHatenaBookmark?: boolean;
}) {
  return (
    <div>
      <a
        className="tw-block tw-rounded-md tw-py-2 tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>

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
        <div className="tw-ml-auto tw-flex tw-items-center tw-gap-1">
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
