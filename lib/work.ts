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
      "A platform for publishers, agents and authors to manage digital rights and royalties, and to facilitate bidding.",
    cover: {
      type: "video",
      src: "/work/accordion-landing.mp4",
      poster: "/work/accordion-landing.png",
      alt: "Accordion home page",
    },
    mobile: {
      type: "image",
      src: "/work/accordion-mobile.jpg",
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
      "Accordion is for publishers, literary agents and authors: managing digital rights and royalties, and running bids, in one private place rather than across inboxes and spreadsheets.",
      "Each side sees the same deal from their own seat. An agent puts a title up and watches offers come in. A publisher requests access, follows submissions, and bids. Authors can see what is happening with their work. Conversations stay attached to the title they are about.",
      "It is in private use with early partners, so that is about as much as I can say. The clips use demonstration data.",
    ],
    stills: stills("accordion", ["Live auctions", "The Granby Triangle"]),
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
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
      src: "/work/examly-preview-mobile.jpg",
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
      "In 2025 the NSW HSC changed in a real way: some Year 12 exams are now sat online. Examly is the software I am building so teachers can create, host, mark and analyse mock versions of those exams, in a window that behaves like the real thing.",
      "It is a SaaS product, launching late 2026, and will include marking and analysis. The clips show the marketing site, putting an exam together, then marking a class.",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
  },
  {
    slug: "proof-room",
    name: "Bakehouse",
    kind: "Website · example",
    summary: "A bakery site that lets the bread do the talking.",
    cover: {
      type: "video",
      src: "/work/proof-room.mp4",
      hd: "/work/proof-room-2x.mp4",
      poster: "/work/proof-room.jpg",
      alt: "Bakehouse home page, scrolling from the wordmark through the menu and weekly loaf",
    },
    mobile: {
      type: "image",
      src: "/work/proof-room-mobile.jpg",
      alt: "Bakehouse, mobile",
    },
    mobileClip: phoneClip("proof-room", "Bakehouse, mobile"),
    stills: stills("proof-room", ["The wordmark", "What’s on"]),
    overview: [
      "A bakery site with a hard wordmark, a longer counter list, and a weekly loaf you can pick up or have dropped. The sort of thing that looks like it belongs on the street, not in a template gallery.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "halfway",
    name: "Halfway House",
    kind: "Website · example",
    summary:
      "A café and roastery: table booking, Shopify for bags and gear, Square gift cards.",
    cover: {
      type: "video",
      src: "/work/halfway.mp4",
      hd: "/work/halfway-2x.mp4",
      poster: "/work/halfway.jpg",
      alt: "Halfway House home page, scrolling through booking, the shop and gift cards",
    },
    mobile: {
      type: "image",
      src: "/work/halfway-mobile.jpg",
      alt: "Halfway House, mobile",
    },
    mobileClip: phoneClip("halfway", "Halfway House, mobile"),
    stills: stills("halfway", ["Holding a table", "Square gift cards"]),
    overview: [
      "Halfway House is a café and roastery. The site holds a table (date, party, window or footpath), sells bags and brew gear through Shopify, and sells Square gift cards — e-gift or pickup — without sending anyone to a different looking checkout.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Shopify", "Square"],
  },
  {
    slug: "ellery",
    name: "Ellery Lawyers",
    kind: "Website · example",
    summary:
      "A small commercial, disputes and family practice: named partners, a calm one-pager, no theatre.",
    cover: {
      type: "video",
      src: "/work/ellery.mp4",
      hd: "/work/ellery-2x.mp4",
      poster: "/work/ellery.jpg",
      alt: "Ellery Lawyers home page, scrolling from the headline through practice areas and the people",
    },
    mobile: {
      type: "image",
      src: "/work/ellery-mobile.jpg",
      alt: "Ellery Lawyers, mobile",
    },
    mobileClip: phoneClip("ellery", "Ellery Lawyers, mobile"),
    stills: stills("ellery", ["Practice areas", "The people"]),
    overview: [
      "A small firm site that keeps the useful bits on one page: what they do, who you will speak to, and how to write. The partner who takes the call keeps the file.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "ridgeway-physio",
    name: "Ridgeway Physiotherapy",
    kind: "Website · example",
    summary:
      "A one-page physio site with fees, hours and HotDoc booking on the front.",
    cover: {
      type: "video",
      src: "/work/ridgeway-physio.mp4",
      hd: "/work/ridgeway-physio-2x.mp4",
      poster: "/work/ridgeway-physio.jpg",
      alt: "Ridgeway Physiotherapy home page, scrolling through booking, fees and the team",
    },
    mobile: {
      type: "image",
      src: "/work/ridgeway-physio-mobile.jpg",
      alt: "Ridgeway Physiotherapy, mobile",
    },
    mobileClip: phoneClip("ridgeway-physio", "Ridgeway Physiotherapy, mobile"),
    stills: stills("ridgeway-physio", ["HotDoc booking", "Who you will see"]),
    overview: [
      "Bespoke one-pagers like this come together quickly, especially if you already have staff photos and a few shots of the rooms.",
      "Most clinics now expect an integrated booking system. HotDoc is the usual one around here. Wiring it in is not a big extra job, and you keep managing the diary yourself.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "HotDoc"],
  },
  {
    slug: "marlow-finch",
    name: "Rowe Accounting",
    kind: "Website · example",
    summary:
      "A clean one-pager for an accountancy, with the fees on the page.",
    cover: {
      type: "video",
      src: "/work/marlow-finch.mp4",
      hd: "/work/marlow-finch-2x.mp4",
      poster: "/work/marlow-finch.jpg",
      alt: "Rowe Accounting home page, scrolling through services, fees and the team",
    },
    mobile: {
      type: "image",
      src: "/work/marlow-finch-mobile.jpg",
      alt: "Rowe Accounting, mobile",
    },
    mobileClip: phoneClip("marlow-finch", "Rowe Accounting, mobile"),
    stills: stills("marlow-finch", ["Who we work with", "Fees on the page"]),
    overview: [
      "Another example of a slick one-pager that puts the useful information down cleanly. I spent years in professional services, so I tend to ask the same questions your clients would — that is how the site ends up sounding like your practice, not a generic firm.",
      "Bespoke sites can include a simple CMS so you can change text and photos yourself. If you would rather I did the tweaks, that is a reasonable hourly rate.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "harbourline",
    name: "Harbourline Environmental",
    kind: "Website · example",
    summary:
      "A coastal and civil engineering practice: harbours, foreshore and stormwater.",
    cover: {
      type: "video",
      src: "/work/harbourline.mp4",
      hd: "/work/harbourline-2x.mp4",
      poster: "/work/harbourline.jpg",
      alt: "Harbourline home page, scrolling from the work into recent projects",
    },
    mobile: {
      type: "image",
      src: "/work/harbourline-mobile.jpg",
      alt: "Harbourline, mobile",
    },
    mobileClip: phoneClip("harbourline", "Harbourline, mobile"),
    stills: stills("harbourline", ["From survey to issued drawings", "Recent work"]),
    overview: [
      "A coastal and civil practice: harbours, foreshore, stormwater and the reports that get harbour jobs built. Forest green, Outfit, a split hero — kept as it was, without dressing it up as a plant brochure.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "ironbark",
    name: "Ironbark",
    kind: "Website · example",
    summary:
      "A booking page for a small stay, wired up to Little Hotelier.",
    cover: {
      type: "video",
      src: "/work/ironbark.mp4",
      hd: "/work/ironbark-2x.mp4",
      poster: "/work/ironbark.jpg",
      alt: "Ironbark listing page, scrolling through photos, the booking card and the calendar",
    },
    mobile: {
      type: "image",
      src: "/work/ironbark-mobile.jpg",
      alt: "Ironbark, mobile",
    },
    mobileClip: phoneClip("ironbark", "Ironbark, mobile"),
    stills: stills("ironbark", ["The hut", "Availability and booking"]),
    overview: [
      "I am comfortable building bespoke booking pages and showcases for properties, including tying them into systems such as Little Hotelier. In 2026 that does not have to be an expensive piece of work.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Little Hotelier"],
  },
  {
    slug: "ballast",
    name: "Parkside Gym",
    kind: "Website · example",
    summary:
      "A coached gym site: timetable, recovery bookings, weekly price and the coaches.",
    cover: {
      type: "video",
      src: "/work/ballast.mp4",
      hd: "/work/ballast-2x.mp4",
      poster: "/work/ballast.jpg",
      alt: "Parkside Gym home page, scrolling through programmes, timetable and membership",
    },
    mobile: {
      type: "image",
      src: "/work/ballast-mobile.jpg",
      alt: "Parkside Gym, mobile",
    },
    mobileClip: phoneClip("ballast", "Parkside Gym, mobile"),
    stills: stills("ballast", ["The weekly timetable", "Membership"]),
    overview: [
      "When the classes are, what it costs a week, and who is coaching. The rest of the page supports those three things.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "hartwell",
    name: "Hartwell Constructions",
    kind: "Website · example",
    summary:
      "A builder's site on a CMS the client can edit themselves.",
    cover: {
      type: "video",
      src: "/work/hartwell.mp4",
      hd: "/work/hartwell-2x.mp4",
      poster: "/work/hartwell.jpg",
      alt: "Hartwell Constructions home page, scrolling through about, services and projects",
    },
    mobile: {
      type: "image",
      src: "/work/hartwell-mobile.jpg",
      alt: "Hartwell, mobile",
    },
    mobileClip: phoneClip("hartwell", "Hartwell, mobile"),
    stills: stills("hartwell", ["Three things, done properly", "Three from the last year"]),
    overview: [
      "I am more than comfortable developing in CMSs such as WordPress and Webflow. If you already use those tools and would rather stay there, I will work that way. I can also write custom plugins and adjustments for a site you already have.",
    ],
    stack: ["Webflow", "Webflow CMS", "Finsweet Attributes"],
  },
  {
    slug: "sancrox",
    name: "Sancrox Civil",
    kind: "Website · example",
    summary:
      "A Mid North Coast civil practice: roads, drainage, subdivisions and structures, from Port Macquarie.",
    cover: {
      type: "video",
      src: "/work/sancrox.mp4",
      hd: "/work/sancrox-2x.mp4",
      poster: "/work/sancrox.jpg",
      alt: "Sancrox Civil home page, scrolling from the Pacific Highway tunnel into services and recent jobs",
    },
    mobile: {
      type: "image",
      src: "/work/sancrox-mobile.jpg",
      alt: "Sancrox Civil, mobile",
    },
    mobileClip: phoneClip("sancrox", "Sancrox Civil, mobile"),
    stills: stills("sancrox", ["What we do", "Recent jobs"]),
    overview: [
      "A Port Macquarie civil practice: roads, stormwater, subdivisions and culverts, with construction-phase support. Conventional infrastructure, not a marina brochure.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];

export function getWork(slug: string): WorkItem | undefined {
  return work.find((item) => item.slug === slug);
}
