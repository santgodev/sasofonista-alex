import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    qualities: [75, 90],
    unoptimized: true, // Required for static export unless using a custom loader
  },
  trailingSlash: true,
};

export default nextConfig;
