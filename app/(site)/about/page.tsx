import type { Metadata } from "next";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { TalkThrough } from "@/components/TalkThrough";

export const metadata: Metadata = {
  title: "About",
  description:
    "Andy is a web developer and teacher on the Mid North Coast. Websites and web apps for businesses and professionals.",
};

const body = "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";
const link =
  "underline decoration-black/20 underline-offset-[3px] hover:decoration-black transition-colors duration-200";

export default function AboutPage() {
  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <article className="max-w-[34rem]">
        <figure className="rise mb-8 tablet:mb-10 w-full tablet:max-w-[18rem]">
          <div className="overflow-hidden bg-black/[0.05]">
            {/* Plain img so the file loads on GitHub Pages (next/image was omitting the base path). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/about/andy.jpg")}
              alt="Andy and his daughter sharing a menu at a restaurant"
              width={1024}
              height={767}
              className="block h-auto w-full grayscale contrast-[1.25] brightness-[0.9] transition-[filter] duration-700 ease-out hover:grayscale-0 hover:contrast-100 hover:brightness-100"
            />
          </div>
        </figure>

        <div className={`${body} space-y-5`}>
          <p className="rise" style={{ animationDelay: "60ms" }}>
            I&apos;m Andy. I am a part-time high school teacher, and I have a
            young family here on the Mid North Coast. I love running and
            brewing beer. Life is good. Aside from these things, I build
            websites and web applications.
          </p>
          <p className="rise" style={{ animationDelay: "120ms" }}>
            The part I enjoy most is where good design meets good engineering:
            clean typography, simple layouts, thoughtful interfaces, and code
            that quietly does what it is supposed to do.
          </p>
          <p className="rise" style={{ animationDelay: "180ms" }}>
            I started as a data analyst at KPMG, retrained as a teacher, and
            moved up the coast when the family came along. Teaching is still
            the day job. The slower pace here means a small client list, and
            time to do the work properly.
          </p>
          <p className="rise" style={{ animationDelay: "240ms" }}>
            I back myself. I would not feel confident putting something live
            if you were not really happy with it.
          </p>
          <p className="rise" style={{ animationDelay: "300ms" }}>
            You can find more about what I do, how I work and what it costs
            under{" "}
            <Link href="/services" className={link}>
              Services
            </Link>
            .
          </p>
          <div className="rise" style={{ animationDelay: "360ms" }}>
            <TalkThrough />
          </div>
        </div>
      </article>
    </div>
  );
}
