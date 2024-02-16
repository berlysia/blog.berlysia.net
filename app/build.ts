import fs from "node:fs/promises";
import type { Hono } from "hono";
import { toSSG } from "hono/ssg";
import { createServer } from "vite";

const entry = "app/server.ts";
const outDir = "dist";

async function main() {
  // Create a server to load the module
  const server = await createServer({
    plugins: [],
    build: { ssr: true },
  });
  const module = await server.ssrLoadModule(entry);
  server.close();

  const app = module.default as Hono;

  if (!app) {
    throw new Error(`Failed to find a named export "default" from ${entry}`);
  }

  await toSSG(app, fs, { dir: outDir });
}

// eslint-disable-next-line unicorn/prefer-top-level-await -- run in cjs
main().catch(console.error);
