"use client";

export const LinkMarbles = () => (
  <ul className="">
    <li>
      <a
        className="tw-underline"
        rel="noopener noreferrer"
        target="_blank"
        href="https://twitter.com/berlysia"
        aria-label="Twitter / berlysia"
      >
        Twitter
      </a>
    </li>
    <li>
      <a
        className="tw-underline"
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/berlysia"
        aria-label="GitHub / berlysia"
      >
        GitHub
      </a>
    </li>
    <li>
      <a
        className="tw-underline"
        // eslint-disable-next-line react/no-invalid-html-attribute -- rel="me" https://microformats.org/wiki/rel-me
        rel="noopener noreferrer me"
        target="_blank"
        href="https://imastodon.net/@berlysia"
        aria-label="Imastodon / berlysia"
      >
        Im@stodon
      </a>
    </li>
    <li>
      <a
        className="tw-underline"
        // eslint-disable-next-line react/no-invalid-html-attribute -- rel="me" https://microformats.org/wiki/rel-me
        rel="noopener noreferrer me"
        target="_blank"
        href="https://mstdn.jp/@berlysia"
        aria-label="mstdn.jp / berlysia"
      >
        mstdn.jp
      </a>
    </li>
  </ul>
);
