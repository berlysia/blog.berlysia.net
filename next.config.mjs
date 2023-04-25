import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    unoptimized: process.env.NODE_ENV !== "production",
  },
};

export default withMDX()(nextConfig);
