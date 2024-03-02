import type {} from "hono";

type Head = {
  title?: string;
  description?: string;
  canonical?: string;
  ogImagePath?: string;
};

declare module "hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      head?: Head
    ): Response | Promise<Response>;
  }
}
