export function ArticleLink({
  href,
  title,
  pubDateString,
}: {
  href: string;
  title: string;
  pubDateString: string;
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
      <div className="tw-text-right tw-flex tw-items-center tw-justify-end">
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
