import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { FullHeightContainer } from "./FullHeightContainer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "FullHeightContainer",
  component: FullHeightContainer,
} as ComponentMeta<typeof FullHeightContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FullHeightContainer> = (args) => (
  <FullHeightContainer {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  className: "tw-bg-blue-50",
};
