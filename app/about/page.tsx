import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { mailto, site, tel } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Andy is a web developer and teacher on the Mid North Coast. Websites and web apps for small to medium sized businesses and professionals.",
};

const body = "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";
const link =
  "underline decoration-black/20 underline-offset-[3px] hover:decoration-black transition-colors duration-200";

export default function AboutPage() {
  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <article className="max-w-[34rem]">
        <figure className="rise mb-8 tablet:mb-10 w-full tablet:max-w-[16rem]">
          <div className="relative aspect-[4/3] overflow-hidden bg-black/[0.05]">
            <Image
              src="/about/andy.jpg"
              alt="Andy and his daughter sharing a menu at a restaurant"
              fill
              priority
              sizes="(min-width: 850px) 16rem, 100vw"
              className="object-cover object-center grayscale contrast-[1.25] brightness-[0.9] transition-[filter] duration-700 ease-out hover:grayscale-0 hover:contrast-100 hover:brightness-100 active:grayscale-0 active:contrast-100 active:brightness-100"
            />
          </div>
        </figure>

        <div className={`${body} space-y-5`}>
          <p className="rise" style={{ animationDelay: "60ms" }}>
            I&apos;m Andy. I live on the Mid North Coast with my family, and
            split my time between teaching software engineering and enterprise
            computing at secondary level, and building websites and web
            applications.
          </p>
          <p className="rise" style={{ animationDelay: "120ms" }}>
            The part I enjoy most is where good design meets good engineering:
            clean typography, simple layouts, thoughtful interfaces, and code
            that quietly does what it is supposed to do.
          </p>
          <p className="rise" style={{ animationDelay: "180ms" }}>
            I started my career as a data analyst at KPMG. I enjoyed the problem
            solving and working with data, but the corporate world was never
            really for me. I eventually retrained as a teacher and moved into
            the classroom, where I&apos;ve been ever since.
          </p>
          <p className="rise" style={{ animationDelay: "240ms" }}>
            When our family came along, we left Sydney for the coast. Teaching
            is still the day job, but the slower pace up here has given me more
            room to work on the projects I care about, both my own products and
            a small number of client websites where I can give the work proper
            attention.
          </p>
          <p className="rise" style={{ animationDelay: "300ms" }}>
            Some of the analyst habits have stuck. I like information to be
            well structured, interfaces to be easy to understand, and
            technology to feel simpler after you&apos;ve used it, not more
            complicated. That&apos;s a big part of what I think makes a good
            website or web app.
          </p>
          <p className="rise" style={{ animationDelay: "360ms" }}>
            You can find more about what I do, how I work and what it costs
            under{" "}
            <Link href="/services" className={link}>
              Services
            </Link>
            . Or, if you&apos;d rather talk something through,{" "}
            <a
              href={mailto}
              className="hover:opacity-50 transition-opacity duration-200"
            >
              email me
            </a>{" "}
            or call{" "}
            <a
              href={tel}
              className="hover:opacity-50 transition-opacity duration-200"
            >
              {site.phone}
            </a>
            .
          </p>
        </div>
      </article>
    </div>
  );
}
