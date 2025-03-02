import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "valsewa-website-bucket.storage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
