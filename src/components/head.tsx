"use client";
import type { FC } from "react";
import BaseHead from "next/head";

export const Head: FC<{
  title: string;
  description?: string;
}> = ({ title, description }) => (
  <BaseHead>
    <title key="title">{title}</title>
    <meta key="og:title" property="og:title" content={title} />
    {description && (
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
    )}
    <meta key="og:type" property="og:type" content="blog" />
    <meta key="og:site_name" property="og:site_name" content="berlysia.net" />
    <meta key="twitter:card" name="twitter:card" content="summary" />
    <meta key="twitter:title" name="twitter:title" content={title} />
    {description && (
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description}
      />
    )}
    <meta key="twitter:creator" name="twitter:creator" content="@berlysia" />
  </BaseHead>
);
