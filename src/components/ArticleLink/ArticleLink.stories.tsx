import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { ArticleLink } from "./ArticleLink";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ArticleLink",
  component: ArticleLink,
} as ComponentMeta<typeof ArticleLink>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ArticleLink> = (args) => (
  <ArticleLink {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  href: "https://example.com",
  title: "Title",
  pubDateString: "2021-01-01",
};
