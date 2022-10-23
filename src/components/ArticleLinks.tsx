import { BlogMarble } from "./BlogMarble/BlogMarble";

const BLOGS = [
  {
    title: "Hatena Blog",
    href: "https://berlysia.hatenablog.com/",
  },
  {
    title: "Zenn",
    href: "https://zenn.dev/berlysia",
  },
  {
    title: "Qiita",
    href: "https://qiita.com/berlysia",
  },
] as const;
export const ArticleLinks = () => (
  <div className="tw-mt-6">
    {BLOGS.map(({ href, title }) => (
      <BlogMarble key={href} href={href} title={title} />
    ))}
  </div>
);
