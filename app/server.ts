import { createApp } from "honox/server";

const app = createApp();

if (import.meta.env.DEV) {
  // eslint-disable-next-line node/no-top-level-await -- for debugging purposes
  const { showRoutes } = await import("hono/dev");
  showRoutes(app);
}

export default app;
