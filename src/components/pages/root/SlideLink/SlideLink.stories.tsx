import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { SlideLink } from "./SlideLink";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "SlideLink",
  component: SlideLink,
} as ComponentMeta<typeof SlideLink>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SlideLink> = (args) => (
  <div className="tw-w-[460px] tw-border-2 tw-border-gray-600">
    <SlideLink {...args} />
  </div>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  eventTitle: "eventTitle",
  talkTitle: "talkTitle",
  talkLink: "https://example.com/talkLink",
  slideLink: "https://example.com/slideLink",
  pubDateString: "2021-11-01",
  talkArchiveLink: "https://example.com/talkArchiveLink",
};
