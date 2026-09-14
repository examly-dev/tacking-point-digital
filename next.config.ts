import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (isGithubPages && repoName ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  // Dev server is viewed through OrbStack domains, not localhost.
  allowedDevOrigins: ["tackingpoint.local", "*.tackingpoint.orb.local", "*.orb.local"],
  ...(isGithubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
