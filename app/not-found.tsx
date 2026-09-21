import type { Metadata } from "next";
import { SiteChrome } from "@/components/SiteChrome";
import { NotFoundCopy } from "@/components/NotFoundCopy";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page is not here. Have a look at the work, or get in touch.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SiteChrome>
      <NotFoundCopy />
    </SiteChrome>
  );
}
