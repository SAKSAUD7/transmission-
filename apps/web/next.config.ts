import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",  // Uncomment for production Hostinger build
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
