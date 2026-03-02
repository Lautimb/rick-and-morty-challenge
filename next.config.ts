import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "rickandmortyapi.com" }],
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;
