"use client";

import { useCallback, useRef } from "react";

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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const handleModalOpen = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

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

      <div className="tw-flex tw-items-center tw-min-w-0 tw-text-sm">
        <a
          href={eventLink}
          className="tw-flex-grow tw-flex-shrink tw-p-1 tw-rounded-md tw-overflow-hidden tw-whitespace-nowrap tw-overflow-ellipsis tw-no-underline tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          {eventTitle}
        </a>
        <div className="tw-flex tw-items-center tw-gap-1 tw-flex-shrink-0">
          <div className="tw-hidden md:tw-flex">
            {slideLink && (
              <>
                <a
                  href={slideLink}
                  className="tw-rounded-md tw-p-1 tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  slide
                </a>
                {withHatenaBookmark ? (
                  <a
                    href={`https://b.hatena.ne.jp/entry/${slideLink}`}
                    className="tw-flex tw-items-center tw-rounded-md tw-p-1 tw-h-8 tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
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
              <a
                href={talkArchiveLink}
                className="tw-rounded-md tw-p-1 tw-overflow-hidden tw-whitespace-nowrap tw-overflow-ellipsis tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                talk archive
              </a>
            )}
          </div>

          {slideLink || talkArchiveLink ? (
            <div className="md:tw-hidden tw-flex tw-p-2">
              <button
                type="button"
                className="tw-border tw-rounded-md"
                onClick={handleModalOpen}
              >
                🔗
              </button>
              <dialog
                ref={dialogRef}
                onClick={() => dialogRef.current?.close()}
                className="tw-w-2/3 tw-rounded-lg tw-shadow-lg tw-shadow-pink-50 tw-border-2 tw-border-pink-200"
              >
                <div onClick={(e) => e.stopPropagation()}>
                  <form method="dialog">
                    <h2>{talkTitle}</h2>
                    <hr className="tw-mlb-2 tw-border-pink-100 tw-border-dashed" />

                    <ul>
                      {slideLink && (
                        <li className="tw-mlb-2 tw-flex tw-flex-row">
                          <a
                            href={slideLink}
                            className="tw-rounded-md tw-p-1 tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
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
                        </li>
                      )}
                      {talkArchiveLink && (
                        <li className="tw-mlb-2">
                          <a
                            href={talkArchiveLink}
                            className="tw-rounded-md tw-p-1 tw-text-blue-600 visited:tw-text-purple-800 hover:tw-bg-gray-200 focus:tw-bg-gray-200"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            talk archive
                          </a>
                        </li>
                      )}
                    </ul>
                  </form>
                </div>
              </dialog>
            </div>
          ) : null}
        </div>

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
