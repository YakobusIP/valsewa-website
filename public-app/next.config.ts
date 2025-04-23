import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "production" ? "https" : "http",
        hostname:
          process.env.NODE_ENV === "production"
            ? "storage.googleapis.com"
            : "localhost",
        port: process.env.NODE_ENV === "production" ? "" : "5000",
        pathname:
          process.env.NODE_ENV === "production"
            ? `/${process.env.NEXT_PUBLIC_GCS_BUCKET}/account-images/**`
            : undefined
      }
    ],
    minimumCacheTTL: 60 * 60 * 24 * 90
  },
  rewrites: async () => {
    return [
      {
        source: "/account-images/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_GCS_BUCKET}/account-images/:path*`
            : `http://localhost:5000/uploads/account-images/:path*`
      },
      {
        source: "/carousel-images/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_GCS_BUCKET}/carousel-images/:path*`
            : `http://localhost:5000/uploads/carousel-images/:path*`
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
