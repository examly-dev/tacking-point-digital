export type WorkMedia =
  | {
      type: "image";
      /** Path under `public/`, e.g. `/work/studio.png`. */
      src: string;
      alt: string;
    }
  | {
      type: "video";
      /** Short, silent clip under `public/` (H.264 MP4), sized for inline playback. */
      src: string;
      /** Optional 2× version of the same clip, used only by the full-size viewer. */
      hd?: string;
      /** Still frame shown before the clip loads. */
      poster: string;
      alt: string;
    };

export type WorkItem = {
  /** URL segment: /work/[slug] */
  slug: string;
  name: string;
  /** Short grey label under the name, e.g. "Web app · 2026". */
  kind: string;
  /** One-line summary shown at the top of the project page. */
  summary: string;
  /** Live site. Omit if there is no public URL yet. */
  url?: string;
  /** Card thumbnail and project hero. Omit for an empty grey frame. */
  cover?: WorkMedia;
  /**
   * Portrait poster still. Dead Simple Sites inner frame is 180×236
   * (`aspect-[180/236]`), shot at that ratio so the card fills edge-to-edge.
   */
  mobile?: WorkMedia;
  /**
   * Scrolling phone clip for the work-page CoverSwitch (390×844).
   * Kept separate from the index-card still so the grid stays DSS-ratio posters.
   */
  mobileClip?: WorkMedia;
  /** Extra clips and screenshots shown below the write-up. */
  gallery?: WorkMedia[];
  /** Small high-res stills after the hero clip. Quiet, not a grid of thumbs. */
  stills?: WorkMedia[];
  /** A short paragraph or two. Let the media do the talking. */
  overview: string[];
  /** Optional design notes. */
  design?: string[];
  /** Tools used, shown as a single line. */
  stack?: string[];
};

function stills(slug: string, captions: string[]): WorkMedia[] {
  return captions.map((alt, i) => ({
    type: "image" as const,
    src: `/work/${slug}-still-${i + 1}.jpg`,
    alt,
  }));
}

function phoneClip(
  slug: string,
  alt: string,
  extra?: { src?: string; poster?: string; hd?: string | null },
): Extract<WorkMedia, { type: "video" }> {
  const hd = extra?.hd === null ? undefined : (extra?.hd ?? `/work/${slug}-mobile-2x.mp4`);
  return {
    type: "video",
    src: extra?.src ?? `/work/${slug}-mobile.mp4`,
    ...(hd ? { hd } : {}),
    poster: extra?.poster ?? `/work/${slug}-mobile.jpg`,
    alt,
  };
}

export const work: WorkItem[] = [
  {
    slug: "accordion",
    name: "Accordion",
    kind: "Web application · 2026 · ongoing",
    summary:
      "A platform for publishers, agents and authors to manage digital rights and royalties, and to run auctions of rights.",
    cover: {
      type: "video",
      src: "/work/accordion-landing.mp4",
      poster: "/work/accordion-landing.png",
      alt: "Accordion home page",
    },
    mobile: {
      type: "image",
      src: "/work/accordion-mobile.webp",
      alt: "Accordion home page",
    },
    gallery: [
      {
        type: "video",
        src: "/work/accordion-agent.mp4",
        poster: "/work/accordion-agent.png",
        alt: "An agent signs in, checks today's activity, and opens a live auction to see where each publisher stands",
      },
      {
        type: "video",
        src: "/work/accordion-titles.mp4",
        poster: "/work/accordion-titles.png",
        alt: "The agent's list of titles, one title's record, and a reply to a publisher in Messages",
      },
      {
        type: "video",
        src: "/work/accordion-publisher.mp4",
        poster: "/work/accordion-publisher.png",
        alt: "The publisher's side: discovering new titles and keeping track of every submission in one list",
      },
    ],
    overview: [
      "Accordion is a data-driven application for publishers, literary agents and authors: rights and royalty records, and auctions in conventional and custom formats, held in one system rather than across inboxes and spreadsheets.",
      "Bidding and messaging are private to the parties on a title. Deals are made from that record. Web push covers bids, messages and status changes.",
      "The platform is in active development. The clips use demonstration data.",
    ],
    stills: stills("accordion", ["Live auctions", "The Granby Triangle"]),
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Web Push"],
  },
  {
    slug: "examly",
    name: "Examly",
    kind: "Web application · 2026 · ongoing",
    summary:
      "SaaS for teachers to create, host, mark and analyse mock HSC exams that students sit online.",
    cover: {
      type: "video",
      src: "/work/examly-preview.mp4",
      poster: "/work/examly-preview.jpg",
      alt: "Examly marketing site, switching through Create, Assign, Assess, Mark and Analyse",
    },
    mobile: {
      type: "image",
      src: "/work/examly-preview-mobile.webp",
      alt: "Examly, mobile",
    },
    mobileClip: phoneClip("examly", "Examly, mobile", {
      src: "/work/examly-preview-mobile.mp4",
      poster: "/work/examly-preview-mobile.jpg",
      hd: null,
    }),
    gallery: [
      {
        type: "video",
        src: "/work/examly-create.mp4",
        poster: "/work/examly-create.png",
        alt: "Creating an exam: a FizzBuzz coding question and a drag-and-drop on agile development",
      },
      {
        type: "video",
        src: "/work/examly-assess.mp4",
        poster: "/work/examly-assess.png",
        alt: "Marking a 12SEN trial paper, moving between students",
      },
    ],
    stills: stills("examly", [
      "Create: a coding question in the exam builder",
      "Mark: working through a student’s paper",
    ]),
    overview: [
      "Examly is SaaS for teachers to create, host, mark and analyse mock HSC exams that their students sit online, in a window that behaves like the real paper.",
      "It is in active development, with a launch aimed at late 2026. The clips show the marketing site, the exam builder, then marking a class.",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
  },
  {
    slug: "proof-room",
    name: "Bakehouse",
    kind: "Website · example",
    summary: "An indicative bespoke site for a small bakery, with a weekly loaf subscription.",
    cover: {
      type: "video",
      src: "/work/proof-room.mp4",
      hd: "/work/proof-room-2x.mp4",
      poster: "/work/proof-room.jpg",
      alt: "Bakehouse home page, scrolling from the wordmark through the menu and weekly loaf",
    },
    mobile: {
      type: "image",
      src: "/work/proof-room-mobile.webp",
      alt: "Bakehouse, mobile",
    },
    mobileClip: phoneClip("proof-room", "Bakehouse, mobile"),
    stills: stills("proof-room", ["The wordmark", "What’s on"]),
    overview: [
      "An indicative bespoke site for a small bakery: hours, what’s on, and how to visit. Quite simple, but the useful information is all there. Photography does most of the work so the product can sit in the layout rather than behind stock copy.",
      "The weekly loaf is a Stripe Billing subscription — card, Apple Pay, and PayTo / BECS Direct Debit — so a custom site can take recurring payments without a separate shop. Pickup or a neighbourhood drop.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe Billing"],
  },
  {
    slug: "halfway",
    name: "Halfway House",
    kind: "Website · example",
    summary:
      "A café and roastery: Now Book It for tables, Shopify for bags and gear, Square gift cards.",
    cover: {
      type: "video",
      src: "/work/halfway.mp4",
      hd: "/work/halfway-2x.mp4",
      poster: "/work/halfway.jpg",
      alt: "Halfway House home page, scrolling through booking, the shop and gift cards",
    },
    mobile: {
      type: "image",
      src: "/work/halfway-mobile.webp",
      alt: "Halfway House, mobile",
    },
    mobileClip: phoneClip("halfway", "Halfway House, mobile"),
    stills: stills("halfway", ["Holding a table", "Square gift cards"]),
    overview: [
      "An indicative café and roastery site. Table bookings run in-page through Now Book It (date, party size, window or footpath). Retail is a Shopify storefront for beans and brew gear, with Shop Pay, Apple Pay and Afterpay. Gift cards go through Square — the same cards as the till — e-gift or pickup, without a different-looking checkout.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Now Book It", "Shopify", "Square"],
  },
  {
    slug: "ellery",
    name: "Ellery Lawyers",
    kind: "Website · example",
    summary: "An indicative one-page site for a small law firm.",
    cover: {
      type: "video",
      src: "/work/ellery.mp4",
      hd: "/work/ellery-2x.mp4",
      poster: "/work/ellery.jpg",
      alt: "Ellery Lawyers home page, scrolling from the headline through practice areas and the people",
    },
    mobile: {
      type: "image",
      src: "/work/ellery-mobile.webp",
      alt: "Ellery Lawyers, mobile",
    },
    mobileClip: phoneClip("ellery", "Ellery Lawyers, mobile"),
    stills: stills("ellery", ["Practice areas", "The people"]),
    overview: [
      "An indicative website for a small law firm: a modern one-pager that should read as a reliable, professional practice — practice areas, the people, and how to write in.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "ridgeway-physio",
    name: "Ridgeway Physiotherapy",
    kind: "Website · example",
    summary:
      "A physio practice site with a page per service and HotDoc booking.",
    cover: {
      type: "video",
      src: "/work/ridgeway-physio.mp4",
      hd: "/work/ridgeway-physio-2x.mp4",
      poster: "/work/ridgeway-physio.jpg",
      alt: "Ridgeway Physiotherapy home page, scrolling through booking, fees and the team",
    },
    mobile: {
      type: "image",
      src: "/work/ridgeway-physio-mobile.webp",
      alt: "Ridgeway Physiotherapy, mobile",
    },
    mobileClip: phoneClip("ridgeway-physio", "Ridgeway Physiotherapy, mobile"),
    stills: stills("ridgeway-physio", ["HotDoc booking", "Who you will see"]),
    overview: [
      "An indicative site for a physiotherapy clinic. Home covers hours, fees and the team. Each service has its own page — what it is, who you would see, what it costs — with a booking path into HotDoc.",
      "Most clinics around here already run HotDoc. Wiring it into a bespoke site is a small extra job; they keep managing the diary themselves.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "HotDoc"],
  },
  {
    slug: "marlow-finch",
    name: "Rowe Accounting",
    kind: "Website · example",
    summary: "An indicative one-pager for a small accountancy, with fees on the page.",
    cover: {
      type: "video",
      src: "/work/marlow-finch.mp4",
      hd: "/work/marlow-finch-2x.mp4",
      poster: "/work/marlow-finch.jpg",
      alt: "Rowe Accounting home page, scrolling through services, fees and the team",
    },
    mobile: {
      type: "image",
      src: "/work/marlow-finch-mobile.webp",
      alt: "Rowe Accounting, mobile",
    },
    mobileClip: phoneClip("marlow-finch", "Rowe Accounting, mobile"),
    stills: stills("marlow-finch", ["Who we work with", "Fees on the page"]),
    overview: [
      "An indicative website for a small accountancy: services, published fees, and who you will deal with, on one page.",
      "Bespoke sites can include a small CMS if the firm wants to change text and photos themselves. Otherwise changes are an hourly rate.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "harbourline",
    name: "Harbourline Environmental",
    kind: "Website · example",
    summary: "An indicative site for a coastal and civil engineering practice.",
    cover: {
      type: "video",
      src: "/work/harbourline.mp4",
      hd: "/work/harbourline-2x.mp4",
      poster: "/work/harbourline.jpg",
      alt: "Harbourline home page, scrolling from the work into recent projects",
    },
    mobile: {
      type: "image",
      src: "/work/harbourline-mobile.webp",
      alt: "Harbourline, mobile",
    },
    mobileClip: phoneClip("harbourline", "Harbourline, mobile"),
    stills: stills("harbourline", ["From survey to issued drawings", "Recent work"]),
    overview: [
      "An indicative website for a coastal and civil practice: harbours, foreshore, stormwater, and the reports that get those jobs built. Recent work sits on the same page as how to instruct.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "ironbark",
    name: "Ironbark",
    kind: "Website · example",
    summary: "An indicative booking page for a small stay, wired to Little Hotelier.",
    cover: {
      type: "video",
      src: "/work/ironbark.mp4",
      hd: "/work/ironbark-2x.mp4",
      poster: "/work/ironbark.jpg",
      alt: "Ironbark listing page, scrolling through photos, the booking card and the calendar",
    },
    mobile: {
      type: "image",
      src: "/work/ironbark-mobile.webp",
      alt: "Ironbark, mobile",
    },
    mobileClip: phoneClip("ironbark", "Ironbark, mobile"),
    stills: stills("ironbark", ["The hut", "Availability and booking"]),
    overview: [
      "An indicative listing and booking page for a small stay. Availability and reservations go through Little Hotelier, so the diary stays in the property manager’s existing tool rather than a second calendar.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Little Hotelier"],
  },
  {
    slug: "ballast",
    name: "Parkside Gym",
    kind: "Website · example",
    summary: "An indicative gym site: timetable, membership, and the coaches.",
    cover: {
      type: "video",
      src: "/work/ballast.mp4",
      hd: "/work/ballast-2x.mp4",
      poster: "/work/ballast.jpg",
      alt: "Parkside Gym home page, scrolling through programmes, timetable and membership",
    },
    mobile: {
      type: "image",
      src: "/work/ballast-mobile.webp",
      alt: "Parkside Gym, mobile",
    },
    mobileClip: phoneClip("ballast", "Parkside Gym, mobile"),
    stills: stills("ballast", ["The weekly timetable", "Membership"]),
    overview: [
      "An indicative site for a coached gym. The weekly timetable, what it costs, and who is coaching are on the page. Membership is weekly direct debit, with a pause rule.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "hartwell",
    name: "Hartwell Constructions",
    kind: "Website · example",
    summary: "An indicative builder’s site on a CMS the client can edit.",
    cover: {
      type: "video",
      src: "/work/hartwell.mp4",
      hd: "/work/hartwell-2x.mp4",
      poster: "/work/hartwell.jpg",
      alt: "Hartwell Constructions home page, scrolling through about, services and projects",
    },
    mobile: {
      type: "image",
      src: "/work/hartwell-mobile.webp",
      alt: "Hartwell, mobile",
    },
    mobileClip: phoneClip("hartwell", "Hartwell, mobile"),
    stills: stills("hartwell", ["Three things, done properly", "Three from the last year"]),
    overview: [
      "An indicative builder’s website on Webflow CMS, so they can add finished jobs themselves. I also work in WordPress, and can write custom plugins or adjustments for a site you already have.",
    ],
    stack: ["Webflow", "Webflow CMS", "Finsweet Attributes"],
  },
  {
    slug: "sancrox",
    name: "Pell Civil",
    kind: "Website · example",
    summary: "An indicative site for a regional civil practice: roads, drainage, subdivisions.",
    cover: {
      type: "video",
      src: "/work/sancrox.mp4",
      hd: "/work/sancrox-2x.mp4",
      poster: "/work/sancrox.jpg",
      alt: "Pell Civil home page, scrolling from the Pacific Highway tunnel into services and recent jobs",
    },
    mobile: {
      type: "image",
      src: "/work/sancrox-mobile.webp",
      alt: "Pell Civil, mobile",
    },
    mobileClip: phoneClip("sancrox", "Pell Civil, mobile"),
    stills: stills("sancrox", ["Clients we issue drawings for", "Recent jobs"]),
    overview: [
      "An indicative website for a Port Macquarie civil practice: roads, stormwater, subdivisions and culverts, with construction-phase support. Services, recent jobs, and who issues the drawings.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];

export function getWork(slug: string): WorkItem | undefined {
  return work.find((item) => item.slug === slug);
}
