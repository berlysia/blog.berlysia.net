export function SlideLink({
  eventTitle,
  eventLink,
  talkTitle,
  talkLink,
  slideLink,
  pubDateString,
  talkArchiveLink,
  withHatenaBookmark,
}: {
  eventTitle: string;
  eventLink: string;
  talkTitle: string;
  talkLink: string;
  slideLink?: string;
  pubDateString: string;
  talkArchiveLink?: string;
  withHatenaBookmark?: boolean;
}) {
  return (
    <div className="tw-rounded-xl tw-border-pink-200 tw-border tw-p-2 tw-mlb-1">
      <a
        className="tw-block tw-rounded-md tw-py-4 tw-text-2xl tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-pink-100 focus:tw-bg-pink-100"
        href={talkLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {talkTitle}
      </a>

      <hr className="tw-border-pink-100 tw-border-dotted" />

      <div className="tw-text-right tw-flex tw-items-center tw-justify-end tw-gap-1">
        {eventTitle ? (
          <a
            href={eventLink}
            className="tw-flex-grow tw-rounded-md tw-text-sm tw-overflow-hidden tw-whitespace-nowrap tw-overflow-ellipsis tw-no-underline tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            {eventLink}
          </a>
        ) : null}
        {slideLink && (
          <>
            <a
              href={slideLink}
              className="tw-rounded-md tw-px-1 tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              slide
            </a>
            {withHatenaBookmark ? (
              <a
                href={`https://b.hatena.ne.jp/entry/${slideLink}`}
                className="tw-flex tw-items-center tw-rounded-md tw-px-1 tw-h-6 tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="tw-block tw-object-contain"
                  src={`https://b.hatena.ne.jp/entry/image/${slideLink}`}
                  alt="はてなブックマーク"
                />
              </a>
            ) : null}
          </>
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
