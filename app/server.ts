import { createApp } from "honox/server";

const app = createApp();

if (import.meta.env.DEV) {
  // oxlint-disable-next-line node/no-top-level-await -- for debugging purposes
  const { showRoutes } = await import("hono/dev");
  showRoutes(app);
}

export default app;
