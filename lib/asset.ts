/**
 * Prefix a public path with the GitHub Pages base path when one is set.
 * `next/link` and `next/image` already honour `basePath`; raw `<video>`,
 * `<img>` and file hrefs do not.
 */
export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${base}${path}`;
}
