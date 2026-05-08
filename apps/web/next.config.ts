import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  // Dev proxy: Next.js rewrites /api/* → Django:8000
  // Prod:      Nginx already proxies /api/* → Django:8000
  // So all fetch calls use relative "/api/..." — works everywhere
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
