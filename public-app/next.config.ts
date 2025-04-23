import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: `/${process.env.NEXT_PUBLIC_GCS_BUCKET}/account-images/**`
      }
    ],
    minimumCacheTTL: 60 * 60 * 24 * 90
  },
  rewrites: async () => {
    return [
      {
        source: "/account-images/:path*",
        destination: `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_GCS_BUCKET}/account-images/:path*`
      }
    ];
  },
  headers: async () => {
    return [
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=7776000, immutable"
          },
          {
            key: "Vercel-CDN-Cache-Control",
            value: "public, max-age=7776000, immutable"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
