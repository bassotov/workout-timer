import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/instructions/:ai',
        destination: '/getting-started/instructions/:ai',
        permanent: true,
      },
      {
        source: '/troubleshooting',
        destination: '/getting-started/troubleshooting',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
