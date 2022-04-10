type Feed = {
  siteTitle?: string;
  siteUrl?: string;
  feedUrl: string;
};

export const tech: Feed[] = [
  {
    siteTitle: "Qiita / berlysia",
    siteUrl: "https://qiita.com/berlysia",
    feedUrl: "https://qiita.com/berlysia/feed",
  },
  {
    siteTitle: "Zenn / berlysia",
    siteUrl: "https://zenn.dev/berlysia",
    feedUrl: "https://zenn.dev/berlysia/feed",
  },
  {
    siteTitle: "ドワンゴ教育サービス開発者ブログ",
    siteUrl: "https://blog.nnn.dev/",
    feedUrl: "https://blog.nnn.dev/feed/author/berlysia",
  },
];

export const imas: Feed[] = [
  {
    feedUrl:
      "https://berlysia.hatenablog.com/feed/category/%E3%82%A2%E3%82%A4%E3%83%89%E3%83%AB%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC",
  },
];
