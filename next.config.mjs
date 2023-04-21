import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
};

export default withMDX()(nextConfig);
