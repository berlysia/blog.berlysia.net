import Header from "#components/Header";
import { SITE_BLOG_NAME } from "#constant";
import { Categories } from "#components/Categories";

export const metadata = {
  title: `categories - ${SITE_BLOG_NAME}`,
};

export default async function BlogPageIndex() {
  return (
    <div>
      <Header>
        <div>
          <a className="tw-text-lg tw-font-semibold tw-ml-2" href="/">
            blog.berlysia.net
          </a>
        </div>
      </Header>
      <div className="tw-w-full tw-flex tw-justify-center">
        <div className="contentAreaRestricter tw-w-full tw-h-full tw-relative">
          <Categories />
        </div>
      </div>
    </div>
  );
}
