import type { StoryFn, Meta } from "@storybook/react";

import { BlogMarble } from "./BlogMarble";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "BlogMarble",
  component: BlogMarble,
} as Meta<typeof BlogMarble>;

export const Default = {
  args: {
    href: "https://example.com",
    title: "Title",
  },
};
