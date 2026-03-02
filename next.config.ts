import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  experimental: {
    optimizePackageImports: ["@tanstack/react-query", "lucide-react"],
  },
};

export default nextConfig;
