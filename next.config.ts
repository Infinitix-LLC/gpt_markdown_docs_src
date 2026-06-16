import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.replit.dev",
    "*.janeway.replit.dev",
    "*.kirk.replit.dev",
    "*.repl.co",
  ],
  async redirects() {
    return [
      {
        source: "/examples",
        destination: "/playground",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
