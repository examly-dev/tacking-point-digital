import { MobileFooter } from "@/components/MobileFooter";
import { MobileHeader } from "@/components/MobileHeader";
import { Sidebar } from "@/components/Sidebar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-white text-black font-sans font-medium">
      <MobileHeader />
      <main className="flex min-h-screen flex-col overflow-x-hidden bg-white tablet:flex-row">
        <Sidebar />
        <div className="flex w-full min-w-0 flex-1 flex-col tablet:ml-[340px] desktop:ml-[400px]">
          <div className="flex-1">{children}</div>
          <MobileFooter />
        </div>
      </main>
    </div>
  );
}
