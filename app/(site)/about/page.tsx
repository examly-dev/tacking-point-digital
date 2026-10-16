import type { Metadata } from "next";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { TalkThrough } from "@/components/TalkThrough";

export const metadata: Metadata = {
  title: "About",
  description:
    "Andy is a web developer and teacher on the Mid North Coast. Websites and web apps for businesses and professionals.",
};

const body =
  "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.45] tracking-[-0.01em]";

const link =
  "underline decoration-rule underline-offset-[3px] hover:decoration-ink motion-safe:transition-colors motion-safe:duration-200";

export default function AboutPage() {
  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <article className="max-w-[34rem]">
        <figure className="mb-8 w-full min-w-0 max-w-full overflow-hidden tablet:mb-10 tablet:max-w-[18rem]">
          <div className="overflow-hidden bg-green">
            {/* Plain img so the file loads on GitHub Pages (next/image was omitting the base path). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/about/andy.jpg")}
              alt="Andy and his daughter sharing a menu at a restaurant"
              width={1024}
              height={767}
              className="block h-auto w-full max-w-full grayscale contrast-[1.25] brightness-[0.9] transition-[filter] duration-700 ease-out hover:grayscale-0 hover:contrast-100 hover:brightness-100"
            />
          </div>
        </figure>

        <h1 className="mb-6 text-[32px] font-bold leading-[1.05] tracking-[-0.04em] tablet:text-[40px]">
          About
        </h1>

        <div className={`${body} space-y-5`}>
          <p>
            I&apos;m Andy. I am a part-time high school teacher, and I have a
            young family here on the Mid North Coast. I love running and
            brewing beer. Life is good. Aside from these things, I build
            websites and web applications.
          </p>
          <p>
            The part I enjoy most is where good design meets good engineering:
            clean typography, simple layouts, thoughtful interfaces, and code
            that quietly does what it is supposed to do.
          </p>
          <p>
            I started as a data analyst at KPMG, retrained as a teacher, and
            moved up the coast when the family came along. Teaching is still
            the day job. The slower pace here means a small client list, and
            time to do the work properly.
          </p>
          <p>
            I back myself. I would not feel confident putting something live
            if you were not really happy with it.
          </p>
          <p>
            You can find more about{" "}
            <Link href="/services" className={link}>
              what I do, how I work and what it costs under Services
            </Link>
            .
          </p>
          <TalkThrough />
        </div>
      </article>
    </div>
  );
}
