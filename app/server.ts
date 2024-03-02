import { createApp } from "honox/server";

const app = createApp();

if (import.meta.env.DEV) {
  const { showRoutes } = await import("hono/dev");
  showRoutes(app);
}

export default app;
