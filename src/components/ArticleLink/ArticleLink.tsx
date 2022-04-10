export function ArticleLink({
  href,
  title,
  pubDateString,
  withHatenaBookmark,
}: {
  href: string;
  title: string;
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

      <div className="tw-text-right tw-flex tw-items-center tw-justify-end tw-gap-1">
        {withHatenaBookmark ? (
          <a
            href={`https://b.hatena.ne.jp/entry/${href}`}
            className="tw-flex tw-items-center tw-rounded-md tw-px-1 tw-h-6 tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
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
          className="tw-block tw-text-right tw-text-xs tw-no-underline"
          dateTime={pubDateString}
        >
          {pubDateString}
        </time>
      </div>
    </div>
  );
}
