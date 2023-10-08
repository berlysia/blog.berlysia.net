import type { StoryFn, Meta } from "@storybook/react";

import { FullHeightContainer } from "./FullHeightContainer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "FullHeightContainer",
  component: FullHeightContainer,
} as Meta<typeof FullHeightContainer>;

export const Default = {
  args: {
    className: "tw-bg-blue-50",
  },
};
