import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Types are checked by TypeScript 7 (`npm run typecheck`), which the build
    // script runs right after `next build`. Next's own check would run the
    // TypeScript 6 fallback instead — same errors, ~50x slower.
    ignoreBuildErrors: true,
  },
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
