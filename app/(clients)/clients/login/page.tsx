import { ClientLoginForm } from "@/components/clients/ClientLoginForm";
import { clientAccessMode } from "@/lib/clients/auth";

export default async function ClientLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const mode = clientAccessMode();
  const nextPath =
    next && (next.startsWith("/clients") || next.startsWith("/leap-type")) ? next : "/clients";
  return <ClientLoginForm nextPath={nextPath} locked={mode.type === "closed"} />;
}
