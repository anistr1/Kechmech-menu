import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.sanity.io/**")],
    qualities: [75],
    formats: ["image/webp"],
  },
};

export default nextConfig;
