import Link from "next/link";
import { TackingPoint } from "@/components/TackingPoint";
import { clientPreviews } from "@/lib/clients";
import { site } from "@/lib/site";

export function ClientCatalog() {
  return (
    <div className="mx-auto w-full max-w-[28rem] px-5 py-16">
      <p className="tacking-point-logo flex items-center gap-2 text-[14px] desktop:text-[16px]">
        <TackingPoint />
        {site.name}
      </p>
      <h1 className="mt-8 text-[22px] leading-[1.3]">Latest work</h1>
      <p className="mt-3 text-[15px] leading-[1.6] text-black/55">Private. For clients.</p>
      <ul className="mt-10 space-y-6">
        {clientPreviews.map((item) => (
          <li key={item.slug}>
            <p className="text-[16px]">{item.name}</p>
            <p className="mt-1 text-[14px] text-black/55">{item.summary}</p>
            <Link
              href={item.href}
              className="mt-2 inline-block text-[14px] text-black hover:opacity-50 transition-opacity duration-200"
            >
              Open preview
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
