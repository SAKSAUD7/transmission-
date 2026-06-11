import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // Prevent Next.js from adding/removing trailing slashes on /api/* and /media/*
  // paths — Django handles that itself, and double redirects cause ERR_TOO_MANY_REDIRECTS
  skipTrailingSlashRedirect: true,
  images: { unoptimized: true },
  // Dev proxy: Next.js rewrites /api/* → Django:8000
  // Prod:      Nginx already proxies /api/* → Django:8000
  async rewrites() {
    return [
      {
        source: "/api/:path*/",
        destination: "http://127.0.0.1:8000/api/:path*/",
      },
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*",
      },
      {
        source: "/media/:path*",
        destination: "http://127.0.0.1:8000/media/:path*",
      },
    ];
  },
};

export default nextConfig;
