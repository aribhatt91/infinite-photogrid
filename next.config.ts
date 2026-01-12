import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // Allows all paths under this hostname
      },
    ],
    // Staff-level performance tip: 
    // Increase the cache TTL for external images to reduce re-optimization costs
    minimumCacheTTL: 60, 
  },
};

export default nextConfig;
