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
  /** Phone-sized clip or still (390×844 or 2× that), shown in a phone frame under the hero. */
  mobile?: WorkMedia;
  /** Extra clips and screenshots shown below the write-up. */
  gallery?: WorkMedia[];
  /** A short paragraph or two. Let the media do the talking. */
  overview: string[];
  /** Optional design notes. */
  design?: string[];
  /** Tools used, shown as a single line. */
  stack?: string[];
};

export const work: WorkItem[] = [
  {
    slug: "accordion",
    name: "Accordion",
    kind: "Web application · 2026 · ongoing",
    summary:
      "A private platform helping publishers and literary agents manage digital rights securely, on an international scale.",
    cover: {
      type: "video",
      src: "/work/accordion-landing.mp4",
      poster: "/work/accordion-landing.png",
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
      "Publishing runs on relationships and paperwork spread across countries and time zones. Accordion brings that into one controlled, private space: who can see a manuscript, who has made an offer, and which rights have gone where.",
      "Agents and publishers each get their own view of the same deal. An agent runs the auction and watches offers arrive; a publisher discovers titles, requests access, and follows their submissions through to a signed deal. Conversations stay attached to the title they are about.",
      "It is in private use with early partners, so that is about as much as I can say for now. The clips use demonstration data.",
    ],
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
      alt: "Examly marketing site, scrolling from the homepage",
    },
    mobile: {
      type: "video",
      src: "/work/examly-preview-mobile.mp4",
      poster: "/work/examly-preview-mobile.jpg",
      alt: "Examly marketing site on a phone",
    },
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
        alt: "Assessing a sitting of the exam",
      },
    ],
    overview: [
      "In 2025 the NSW HSC changed in a real way: some Year 12 exams are now sat online. Examly is the software I am building so teachers can create, host, mark and analyse mock versions of those exams, in a window that behaves like the real thing.",
      "It is a SaaS product, launching late 2026, and will include marking and analysis. The clips show the marketing site, putting an exam together, then the assess view.",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
  },
  {
    slug: "proof-room",
    name: "The Bakehouse",
    kind: "Website · example",
    summary:
      "A small bakery site that lets the bread do the talking.",
    cover: {
      type: "video",
      src: "/work/proof-room.mp4",
      hd: "/work/proof-room-2x.mp4",
      poster: "/work/proof-room.jpg",
      alt: "The Bakehouse home page, scrolling from the wordmark through the bread list",
    },
    mobile: {
      type: "video",
      src: "/work/proof-room-mobile.mp4",
      hd: "/work/proof-room-mobile-2x.mp4",
      poster: "/work/proof-room-mobile.jpg",
      alt: "The Bakehouse on a phone",
    },
    overview: [
      "This is typical of what I build for a small business that wants the produce to do the talking: clear, modern type, a bit of movement, and it holds up on a phone.",
      "It uses the bespoke approach on the Services page — designed and coded for this business, not adapted from a template.",
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
      type: "video",
      src: "/work/ridgeway-physio-mobile.mp4",
      hd: "/work/ridgeway-physio-mobile-2x.mp4",
      poster: "/work/ridgeway-physio-mobile.jpg",
      alt: "Ridgeway Physiotherapy on a phone",
    },
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
      type: "video",
      src: "/work/marlow-finch-mobile.mp4",
      hd: "/work/marlow-finch-mobile-2x.mp4",
      poster: "/work/marlow-finch-mobile.jpg",
      alt: "Rowe Accounting on a phone",
    },
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
      "An environmental consultancy site that starts with a conversation, not a slogan.",
    cover: {
      type: "video",
      src: "/work/harbourline.mp4",
      hd: "/work/harbourline-2x.mp4",
      poster: "/work/harbourline.jpg",
      alt: "Harbourline Environmental home page, scrolling from the opening conversation through the work",
    },
    mobile: {
      type: "video",
      src: "/work/harbourline-mobile.mp4",
      hd: "/work/harbourline-mobile-2x.mp4",
      poster: "/work/harbourline-mobile.jpg",
      alt: "Harbourline on a phone",
    },
    overview: [
      "A regional environmental engineering firm. The page opens the way the work does: with a conversation. Colours from the job — moss, leaf, paper — and a menu you can actually use on a phone.",
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
      type: "video",
      src: "/work/ironbark-mobile.mp4",
      hd: "/work/ironbark-mobile-2x.mp4",
      poster: "/work/ironbark-mobile.jpg",
      alt: "Ironbark on a phone",
    },
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
      type: "video",
      src: "/work/ballast-mobile.mp4",
      hd: "/work/ballast-mobile-2x.mp4",
      poster: "/work/ballast-mobile.jpg",
      alt: "Parkside Gym on a phone",
    },
    overview: [
      "When the classes are, what it costs a week, and who is coaching. The rest of the page supports those three things.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "halfway",
    name: "Halfway House",
    kind: "Website · example",
    summary:
      "A café and roastery with Shopify for orders and coffee subscriptions.",
    cover: {
      type: "video",
      src: "/work/halfway.mp4",
      hd: "/work/halfway-2x.mp4",
      poster: "/work/halfway.jpg",
      alt: "Halfway House home page, scrolling through the menu, beans and shop",
    },
    mobile: {
      type: "video",
      src: "/work/halfway-mobile.mp4",
      hd: "/work/halfway-mobile-2x.mp4",
      poster: "/work/halfway-mobile.jpg",
      alt: "Halfway House on a phone",
    },
    overview: [
      "Halfway House is a café and roastery. They needed Shopify in the site for orders, and for people who subscribe to their coffee. The shop is built in; adding products or changing prices is ordinary Shopify work.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Shopify"],
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
      type: "video",
      src: "/work/hartwell-mobile.mp4",
      hd: "/work/hartwell-mobile-2x.mp4",
      poster: "/work/hartwell-mobile.jpg",
      alt: "Hartwell on a phone",
    },
    overview: [
      "I am more than comfortable developing in CMSs such as WordPress and Webflow. If you already use those tools and would rather stay there, I will work that way. I can also write custom plugins and adjustments for a site you already have.",
    ],
    stack: ["Webflow", "Webflow CMS", "Finsweet Attributes"],
  },
  {
    slug: "walsh",
    name: "Walsh Mathematics",
    kind: "Website · example",
    summary:
      "A minimalist tutoring site with a simple booking form and enquiry.",
    cover: {
      type: "video",
      src: "/work/walsh.mp4",
      hd: "/work/walsh-2x.mp4",
      poster: "/work/walsh.jpg",
      alt: "Walsh Mathematics home page, scrolling from the headline through the lessons and the booking form",
    },
    mobile: {
      type: "video",
      src: "/work/walsh-mobile.mp4",
      hd: "/work/walsh-mobile-2x.mp4",
      poster: "/work/walsh-mobile.jpg",
      alt: "Walsh Mathematics on a phone",
    },
    overview: [
      "A maths teacher’s site, kept deliberately quiet: what is taught, when, and a form to book a first lesson. No extra pages, no extra noise.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];

export function getWork(slug: string): WorkItem | undefined {
  return work.find((item) => item.slug === slug);
}
