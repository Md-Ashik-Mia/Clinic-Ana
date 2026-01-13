import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: (() => {
      const patterns: NonNullable<NextConfig['images']>['remotePatterns'] = [
        { protocol: 'http', hostname: '127.0.0.1', port: '8000', pathname: '/**' },
        { protocol: 'http', hostname: 'localhost', port: '8000', pathname: '/**' },
      ];

      const raw = process.env.NEXT_PUBLIC_API_URL;
      if (!raw) return patterns;

      try {
        const url = new URL(raw);
        patterns.push({
          protocol: (url.protocol.replace(':', '') as 'http' | 'https'),
          hostname: url.hostname,
          port: url.port || undefined,
          pathname: '/**',
        });
      } catch {
        // Ignore invalid URLs; fall back to localhost patterns.
      }

      return patterns;
    })(),
  },
};

export default nextConfig;
