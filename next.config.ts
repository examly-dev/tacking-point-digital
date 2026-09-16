import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Dev server is viewed through OrbStack domains, not localhost.
  allowedDevOrigins: ["tackingpoint.local", "*.tackingpoint.orb.local", "*.orb.local"],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  ...(isGithubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath,
      }
    : {}),
};

export default nextConfig;
