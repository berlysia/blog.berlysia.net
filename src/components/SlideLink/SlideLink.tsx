export function SlideLink({
  eventTitle,
  talkTitle,
  talkLink,
  slideLink,
  pubDateString,
  talkArchiveLink,
}: {
  eventTitle: string;
  talkTitle: string;
  talkLink: string;
  slideLink?: string;
  pubDateString: string;
  talkArchiveLink?: string;
}) {
  return (
    <div>
      <a
        className="tw-block tw-rounded-md tw-py-3 tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
        href={talkLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {talkTitle} at {eventTitle}
      </a>
      <div className="tw-text-right tw-flex tw-items-center tw-justify-end">
        {slideLink && (
          <div className="tw-mx-1">
            <a
              href={slideLink}
              className="tw-rounded-md tw-py-1 tw-px-1 tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              slide
            </a>
          </div>
        )}
        {talkArchiveLink && (
          <div className="tw-mx-1">
            <a
              href={talkArchiveLink}
              className="tw-rounded-md tw-py-1 tw-px-1 tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              talk archive
            </a>
          </div>
        )}

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
