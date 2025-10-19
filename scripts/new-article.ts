import * as prompts from "@inquirer/prompts";
import type { Frontmatter } from "../app/lib/mdx/utils";

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function formatDate(date: Date): string {
  // yyyy-MM-dd HH:mm
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}`;
}

const created = await prompts.input({
  message: "記事の作成日時",
  default: formatDate(new Date()),
});

const title = await prompts.input({
  message: "記事のタイトル",
});

const slug = await prompts.input({
  message: "記事のスラッグ",
  default: title.replaceAll(/\s+/g, "-").toLowerCase(),
});

const category = await prompts.select<Frontmatter["category"]>({
  message: "記事のカテゴリ",
  choices: [
    { name: "imas", value: "imas" },
    { name: "tech", value: "tech" },
  ],
});

const tagsRaw = await prompts.input({
  message: "記事のタグ（カンマ区切り）",
});
const tags = tagsRaw.split(",").map((tag) => tag.trim());

const description = await prompts.input({
  message: "記事の概要",
  default: "TODO",
});

const publishStatus = await prompts.select<Frontmatter["publishStatus"]>({
  message: "記事の公開状態",
  choices: [
    { name: "draft", value: "draft" },
    { name: "published", value: "published" },
    { name: "unlisted", value: "unlisted" },
  ],
  default: "draft",
});

const preferVertical = await prompts.select({
  message: "記事の表示形式",
  choices: [
    { name: "vertical", value: true },
    { name: "horizontal", value: false },
  ],
});

const frontmatter: Frontmatter = {
  title,
  created,
  lastModified: created,
  publishedAt: created,
  category,
  tags,
  description,
  publishStatus,
  preferVertical,
  canonical: "",
};

console.log(frontmatter);
