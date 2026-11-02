import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add the hostnames of any remote image CDN you use for menu / outlet photos.
    remotePatterns: [],
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
