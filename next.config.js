/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
};

const withMDX = require("@next/mdx")();

module.exports = withMDX(nextConfig);
