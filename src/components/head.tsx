"use client";
import type { FC } from "react";
import BaseHead from "next/head";

export const Head: FC<{
  title: string;
  description?: string;
}> = ({ title, description }) => (
  <BaseHead>
    <title key="title">{title}</title>
    <meta property="og:title" content={title} key="og:title" />
    {description && (
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
    )}
    <meta property="og:type" content="blog" key="og:type" />
    <meta property="og:site_name" content="berlysia.net" key="og:site_name" />
    <meta name="twitter:card" content="summary" key="twitter:card" />
    <meta name="twitter:title" content={title} key="twitter:title" />
    {description && (
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />
    )}
    <meta name="twitter:creator" content="@berlysia" key="twitter:creator" />
  </BaseHead>
);
