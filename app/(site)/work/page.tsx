import type { Metadata } from "next";
import { WorkGrid } from "@/components/WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected websites, web apps, and samples from Tacking Point Digital.",
};

export default function WorkIndexPage() {
  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <h1 className="sr-only">Work</h1>
      <WorkGrid />
    </div>
  );
}
