import type { NextConfig } from "next";

export const basePath = "/blog";

const nextConfig: NextConfig = {
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === "production" ? "/blog/" : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.output.publicPath = `${process.env.ASSET_PREFIX || ""}${config.output.publicPath}`;
    return config;
  },
};

export default nextConfig;
