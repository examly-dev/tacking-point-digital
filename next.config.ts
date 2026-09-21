import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Dev server is viewed through OrbStack domains, not localhost.
  allowedDevOrigins: [
    "tackingpoint.local",
    "*.tackingpoint.orb.local",
    "*.orb.local",
    "127.0.0.1",
    "localhost",
  ],
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: isGithubPages,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  ...(isGithubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath,
      }
    : {
        async headers() {
          return [
            {
              source: "/work/:path*",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=86400, stale-while-revalidate=604800",
                },
              ],
            },
            {
              source: "/examples/:path*",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=86400, stale-while-revalidate=604800",
                },
              ],
            },
            {
              source: "/about/:path*",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=86400, stale-while-revalidate=604800",
                },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
