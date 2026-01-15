import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: (() => {
      const patterns: NonNullable<NextConfig['images']>['remotePatterns'] = [
        { protocol: 'http', hostname: '127.0.0.1', port: '8000', pathname: '/**' },
        { protocol: 'http', hostname: 'localhost', port: '8000', pathname: '/**' },
        { protocol: 'https', hostname: 'api.anaespanafisioterapia.com', pathname: '/**' },
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
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    localPatterns: [
      {
        pathname: '/api/image',
      },
      {
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
