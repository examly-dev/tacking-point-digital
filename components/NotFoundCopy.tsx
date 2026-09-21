import Link from "next/link";

const body = "text-[15px] tablet:text-[14px] desktop:text-[16px] leading-[1.6] desktop:leading-[1.4]";
const link =
  "underline decoration-black/20 underline-offset-[3px] hover:decoration-black transition-colors duration-200";

export function NotFoundCopy() {
  return (
    <div className="p-5 tablet:p-8 desktop:p-10">
      <article className={`max-w-[34rem] ${body} space-y-5`}>
        <h1 className="text-[22px] tablet:text-[16px] font-medium tracking-[-0.02em]">
          That page is not here
        </h1>
        <p>
          It may have moved, or the address might be off. The{" "}
          <Link href="/" className={link}>
            work
          </Link>{" "}
          is on the home page, or{" "}
          <Link href="/contact" className={link}>
            get in touch
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
