import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhysioServicePage } from "@/examples/physio/ServicePage";
import { getService, services } from "@/examples/physio/data";

type Props = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ service: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Ridgeway Physiotherapy", robots: { index: false, follow: false } };
  return {
    title: `${service.h} — Ridgeway Physiotherapy`,
    description: service.p,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: Props) {
  const { service } = await params;
  if (!getService(service)) notFound();
  return <PhysioServicePage slug={service} />;
}
