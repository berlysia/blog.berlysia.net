import type { StoryFn, Meta } from "@storybook/react";

import { ArticleLink } from "./ArticleLink";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ArticleLink",
  component: ArticleLink,
} as Meta<typeof ArticleLink>;

export const Default = {
  args: {
    href: "https://example.com",
    title: "Title",
    pubDateString: "2021-01-01",
    site: {
      title: "Site Title",
      url: "https://example.com",
    },
  },
};

export const LongSiteName = {
  args: {
    href: "https://example.com",
    title: "Title",
    pubDateString: "2021-01-01",
    site: {
      title:
        "Site Title Site Title Site Title Site Title Site Title Site Title Site Title Site Title Site Title Site Title",
      url: "https://example.com",
    },
  },
};
