/** Work slugs that have a full in-page site preview. Apps stay clips-only. */
export const previewSlugs = [
  "proof-room",
  "ridgeway-physio",
  "marlow-finch",
  "harbourline",
  "ironbark",
  "ballast",
  "halfway",
  "ellery",
  "hartwell",
  "sancrox",
] as const;

export type PreviewSlug = (typeof previewSlugs)[number];

export function hasPreview(slug: string): slug is PreviewSlug {
  return (previewSlugs as readonly string[]).includes(slug);
}
