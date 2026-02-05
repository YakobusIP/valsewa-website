import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "production" ? "https" : "http",
        hostname:
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_AXIOS_BASE_URL || ""
            : "localhost",
        port: process.env.NODE_ENV === "production" ? undefined : "5000"
      },
      {
        protocol: "https",
        hostname: "debit-sandbox.faspay.co.id",
        pathname: "/__assets/qr/**"
      },
      {
        protocol: "https",
        hostname: "images.valsewa.com"
      }
    ]
  }
};

export default nextConfig;
