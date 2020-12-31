import { createClient } from "contentful";

function getClient(preview: boolean) {
  const accessToken = preview
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;

  if (!accessToken) {
    throw new Error(
      preview
        ? "NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN is empty"
        : "NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN is empty"
    );
  }

  if (!space) {
    throw new Error("NEXT_PUBLIC_CONTENTFUL_SPACE_ID is empty");
  }

  return createClient({
    space,
    accessToken,
  });
}

export async function fetchContentTypes(preview = false) {
  return getClient(preview).getContentTypes();
}

export type LinkedArticle = {
  id: string;
  title: string;
  url: string;
  categories: {
    name: string;
  }[];
};

function toLinkedArticle(raw: any): LinkedArticle {
  return {
    id: raw.sys.id,
    title: raw.fields.title,
    url: raw.fields.url,
    categories: raw.fields.categories.map((x: any) => ({
      name: x.fields.name,
    })),
  };
}

export async function fetchLinkedArticles(preview: boolean) {
  const entries = await getClient(preview).getEntries({
    content_type: "linkedArticle",
    select: "fields",
    order: "-fields.addedAt",
  });

  return (entries.items ?? []).map(toLinkedArticle);
}
