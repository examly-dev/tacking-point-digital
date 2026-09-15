import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { examples, previewNames } from "@/lib/example-sites";
import { previewSlugs, type PreviewSlug } from "@/lib/preview";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return previewSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = previewNames[slug as PreviewSlug];
  if (!name) return { title: "Preview", robots: { index: false, follow: false } };
  return {
    title: name,
    robots: { index: false, follow: false },
  };
}

export default async function PreviewPage({ params }: Props) {
  const { slug } = await params;
  const Example = examples[slug as PreviewSlug];
  if (!Example) notFound();
  return <Example />;
}
