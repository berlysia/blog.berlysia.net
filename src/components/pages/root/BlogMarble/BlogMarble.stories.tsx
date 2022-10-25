import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { BlogMarble } from "./BlogMarble";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "BlogMarble",
  component: BlogMarble,
} as ComponentMeta<typeof BlogMarble>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BlogMarble> = (args) => (
  <BlogMarble {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  href: "https://example.com",
  title: "Title",
};
