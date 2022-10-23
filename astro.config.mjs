import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
// https://github.com/withastro/astro/issues/5172 動かない
// import vercel from "@astrojs/vercel/static";
import vercel from "@astrojs/vercel/edge";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: "server",
  adapter: vercel()
});
