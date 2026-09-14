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
    kind: "Web app · 2026",
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
    kind: "Web app · 2026",
    summary:
      "Mock exam software for schools. Teachers write and run exams, and students sit them in a locked-down browser that mimics the real exam.",
    cover: {
      type: "video",
      src: "/work/examly-preview.mp4",
      poster: "/work/examly-preview.png",
      alt: "A Python question as the student sees it: the exam window, the code editor, and the program output",
    },
    gallery: [
      {
        type: "video",
        src: "/work/examly-create.mp4",
        poster: "/work/examly-create.png",
        alt: "Signing in, creating a Python question, and previewing it as a student",
      },
      {
        type: "video",
        src: "/work/examly-host.mp4",
        poster: "/work/examly-host.png",
        alt: "Hosting a session: students join with a code and the teacher watches progress live",
      },
    ],
    overview: [
      "Teachers write exams in the browser: multiple choice, extended response, and code questions with a built-in Python editor. Every question can be previewed exactly as a student will see it.",
      "On the day, students join a session with a code. The exam runs in a locked-down window that looks and behaves like the HSC online exam, and the teacher watches progress from their own screen.",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
  },
  {
    slug: "proof-room",
    name: "Proof Room",
    kind: "Website · example",
    summary:
      "A sourdough bakery in a shed. Paper, ink, one photograph at a time, and a wordmark the width of the screen.",
    cover: {
      type: "video",
      src: "/work/proof-room.mp4",
      hd: "/work/proof-room-2x.mp4",
      poster: "/work/proof-room.jpg",
      alt: "Proof Room home page, scrolling from the wordmark through the bread index to the bake schedule",
    },
    mobile: {
      type: "video",
      src: "/work/proof-room-mobile.mp4",
      hd: "/work/proof-room-mobile-2x.mp4",
      poster: "/work/proof-room-mobile.jpg",
      alt: "Proof Room on a phone: the wordmark, the statement and the bread index",
    },
    overview: [
      "Most bakery websites go warm and rustic. This one is set like a broadsheet: a wide grotesk at 21vw, a serif italic for the asides, monospaced labels, and hairline rules doing the work borders and boxes usually do. Photography is greyscale and captioned like figures.",
      "The content is the design. Six loaves in an indexed table with flour and hydration, a bake schedule in oversized tabular numerals, and one photograph. There is no header bar at all: a monogram sits top-left, the clock top-right, and the navigation is a black pill floating at the foot of the screen that tracks where you are. A studio example for a food business that wants to look like it knows what it is doing.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "ridgeway-physio",
    name: "Ridgeway Physiotherapy",
    kind: "Website · example",
    summary:
      "An allied health site that puts fees, hours and the next available appointment on the front page, with HotDoc booking built in.",
    cover: {
      type: "video",
      src: "/work/ridgeway-physio.mp4",
      hd: "/work/ridgeway-physio-2x.mp4",
      poster: "/work/ridgeway-physio.jpg",
      alt: "Ridgeway Physiotherapy home page, scrolling from the headline and next-available slots through the HotDoc booking panel, fees and the team",
    },
    mobile: {
      type: "video",
      src: "/work/ridgeway-physio-mobile.mp4",
      hd: "/work/ridgeway-physio-mobile-2x.mp4",
      poster: "/work/ridgeway-physio-mobile.jpg",
      alt: "Ridgeway Physiotherapy on a phone: headline, next appointments and fees",
    },
    overview: [
      "Most clinic websites make you ring to find out what it costs. This one puts the next three appointments, the fee for each, and what happens in the first forty-five minutes on the page before you have booked anything. The header is a small blue mark, the name set in Geist, underline tabs that follow you down the page, and one filled blue button.",
      "Booking runs through HotDoc, the system most Australian GPs and allied health clinics already use, embedded on the page rather than hidden behind a 'book now' link: pick the appointment type, the practitioner and a time, then finish on HotDoc with reminders and online cancellation handled for you. Bone white, black type, and a single electric blue used for exactly one thing at a time. No stock smiles: greyscale portraits, prices set as the biggest type on the screen, and a footer that is one large link. A studio example for physios, chiros, podiatrists and anyone else whose diary is the business.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "HotDoc"],
  },
  {
    slug: "marlow-finch",
    name: "Marlow & Finch",
    kind: "Website · example",
    summary:
      "A fixed-fee accountancy that publishes its prices and writes like a person.",
    cover: {
      type: "video",
      src: "/work/marlow-finch.mp4",
      hd: "/work/marlow-finch-2x.mp4",
      poster: "/work/marlow-finch.jpg",
      alt: "Marlow & Finch home page, scrolling from the serif headline through services, published fees and the team",
    },
    mobile: {
      type: "video",
      src: "/work/marlow-finch-mobile.mp4",
      hd: "/work/marlow-finch-mobile-2x.mp4",
      poster: "/work/marlow-finch-mobile.jpg",
      alt: "Marlow & Finch on a phone: headline, who we work with and services",
    },
    overview: [
      "Accounting firms default to stock handshakes and the word 'solutions'. This one leads with a large serif, navy ink on white, tan hairlines, and copy that says exactly who it works with and what it costs a month. The header is just the serif wordmark, four links and a navy button; nothing competes with the headline.",
      "The fees are laid out like a statement of account: dotted leaders, numbered lines, tabular figures. Six numbered services, a native-HTML FAQ, and four greyscale portraits. A studio example for accountants, lawyers, brokers and other practices that sell trust.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "harbourline",
    name: "Harbourline Environmental",
    kind: "Website · example",
    summary:
      "A regional waste consultancy site built to be read by councillors and regulators, not just marketers.",
    cover: {
      type: "video",
      src: "/work/harbourline.mp4",
      hd: "/work/harbourline-2x.mp4",
      poster: "/work/harbourline.jpg",
      alt: "Harbourline Environmental home page, scrolling from the headline and current project through capabilities and the project register",
    },
    mobile: {
      type: "video",
      src: "/work/harbourline-mobile.mp4",
      hd: "/work/harbourline-mobile-2x.mp4",
      poster: "/work/harbourline-mobile.jpg",
      alt: "Harbourline on a phone: headline, current project and capabilities",
    },
    overview: [
      "Swiss grid, condensed capitals, monospaced data. The hero shows the column grid it is built on, and the current project sits in a forest-green block with a stage indicator. The header is a single quiet row: name and discipline, what the firm does, three links. Photography is duotoned to the brand colour.",
      "Below that, a project register set like a table in a tender response: year, client, project, service, status. The copy is plain and factual, written the way a council report reads rather than a brochure. A studio example for engineering and environmental consultancies.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "ironbark",
    name: "Ironbark",
    kind: "Website · example",
    summary:
      "A direct-booking page for an off-grid tiny house in the bush: a full-bleed monochrome hero, the price, a live calendar run by Little Hotelier, and the reviews, all on hairline rules.",
    cover: {
      type: "video",
      src: "/work/ironbark.mp4",
      hd: "/work/ironbark-2x.mp4",
      poster: "/work/ironbark.jpg",
      alt: "Ironbark listing page, scrolling from the full-bleed monochrome hero past the hairline photo grid, the sticky booking card, the Little Hotelier availability calendar and reviews",
    },
    mobile: {
      type: "video",
      src: "/work/ironbark-mobile.mp4",
      hd: "/work/ironbark-mobile-2x.mp4",
      poster: "/work/ironbark-mobile.jpg",
      alt: "Ironbark on a phone: the monochrome hero with the title over it, the photo grid, highlights and calendar, with the price and Reserve pinned to the bottom",
    },
    overview: [
      "A getaway site built so the owner can take bookings directly and keep the fees, set closer to a high-end cabin brand than to a booking platform. One flat system: paper, ink and a single ember orange, no drop shadows, no rounded corners, hairline rules everywhere. Bricolage Grotesque set large and tight for the title and headings, DM Sans for the text, DM Mono for the numbered section labels, dates and prices. Every photo is monochrome and colours up on hover, so the orange is the only colour on the page. The header is the name, five anchor links and one Book button.",
      "A full-bleed hero photo with the title set over it, then seven numbered sections: a strict four-photo grid with captions, the host and four highlights in a hairline grid, the amenities as a numbered list, an availability calendar with the booked nights struck through and the stay in orange, review scores by category beside four quotes, an approximate location marked with a square instead of a pin, and the house rules at the end. A booking card stays put on the right with the nightly rate, the dates, the price breakdown and the total. Bookings and payments run through Little Hotelier, the SiteMinder booking engine and channel manager most small Australian stays already use: the calendar on the page is the same one Airbnb and Booking.com draw from, so a night booked anywhere is blocked everywhere, guests pay half up front by card or Apple Pay, and the owner keeps the platform fee. On a phone the price and Reserve sit in a bar pinned to the bottom of the screen. A studio example for cabins, farm stays and short-stay rentals.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Little Hotelier"],
  },
  {
    slug: "ballast",
    name: "Ballast Strength Club",
    kind: "Website · example",
    summary:
      "A coached strength and conditioning gym: the timetable, sauna and recovery bookings, the weekly price and the coaches, all on one dark page.",
    cover: {
      type: "video",
      src: "/work/ballast.mp4",
      hd: "/work/ballast-2x.mp4",
      poster: "/work/ballast.jpg",
      alt: "Ballast home page, scrolling from the full-width wordmark through the programmes, the timetable, recovery bookings and membership",
    },
    mobile: {
      type: "video",
      src: "/work/ballast-mobile.mp4",
      hd: "/work/ballast-mobile-2x.mp4",
      poster: "/work/ballast-mobile.jpg",
      alt: "Ballast on a phone: the intro, the wordmark and the programmes",
    },
    overview: [
      "Gym websites are usually neon, shouting and vague about price. This one is black and bone with a single signal orange, and it answers the three questions people actually have: when are the classes, what does it cost a week, and who is coaching. Big Shoulders for the display type, set as a wordmark that stretches to the full width of the screen.",
      "A real six-day timetable as a table, three programmes with greyscale photography, and a recovery booking system for the sauna, ice bath and massage room: pick the day, see how many spots are left in each slot, and book it at the member rate in the same app as your classes. Memberships are billed weekly by direct debit with no lock-in, and three coaches are listed with their qualifications. The first session is free. A studio example for gyms, studios and clubs.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "halfway",
    name: "Halfway",
    kind: "Website · example",
    summary:
      "A neighbourhood coffee shop that opens at six: the menu with prices, this month's beans, and a Shopify store for brewing gear.",
    cover: {
      type: "video",
      src: "/work/halfway.mp4",
      hd: "/work/halfway-2x.mp4",
      poster: "/work/halfway.jpg",
      alt: "Halfway home page, scrolling from the headline and the coffee through the menu, the beans, the shop and the room",
    },
    mobile: {
      type: "video",
      src: "/work/halfway-mobile.mp4",
      hd: "/work/halfway-mobile-2x.mp4",
      poster: "/work/halfway-mobile.jpg",
      alt: "Halfway on a phone: headline, the menu and this month's beans",
    },
    overview: [
      "Espresso brown, oat cream, olive and one blush accent, with Syne set wide and heavy for the wordmark and the headings. The hero is half type, half a single photograph of a coffee in morning light, with a live clock and today's hours in the corner.",
      "Then the things a café site is actually for: a full menu with prices in three columns, the three coffees on the grinders this month with tasting notes, a photo grid of the room, and the hours and phone number in a large brown footer. The shop is a Shopify storefront dressed in the same clothes: Hario V60 and filters, AeroPress, Chemex, Kalita Wave filters, a Fellow Stagg kettle and a Timemore grinder alongside 250g and 1kg bags of the beans, with a cart in the header and Shop Pay at checkout. A studio example for cafés, roasters and small hospitality that sells online too.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Shopify"],
  },
  {
    slug: "hartwell",
    name: "Hartwell Constructions",
    kind: "Website · Webflow example",
    summary:
      "A residential builder's site in the Webflow idiom: full-bleed photography, a floating pill nav, and project cards the client can add to themselves.",
    cover: {
      type: "video",
      src: "/work/hartwell.mp4",
      hd: "/work/hartwell-2x.mp4",
      poster: "/work/hartwell.jpg",
      alt: "Hartwell Constructions home page, scrolling from the dusk photograph and headline through the about panel, services, process and project cards",
    },
    mobile: {
      type: "video",
      src: "/work/hartwell-mobile.mp4",
      hd: "/work/hartwell-mobile-2x.mp4",
      poster: "/work/hartwell-mobile.jpg",
      alt: "Hartwell on a phone: headline over the photograph, the about panel and the services",
    },
    overview: [
      "Some clients want to add a finished job themselves, so this one is built the way I build in Webflow: a fixed-price builder with the projects, services and process steps all as CMS collections, and a layout in the current Webflow template idiom. A dark pill nav floats over a full-bleed photograph, the headline is set light and very large, and each project is an image with a white detail panel sitting inside it.",
      "The rest is the information a builder's site is actually for: what they build, how a job runs in four steps (site visit, approvals, an HIA fixed-price contract, handover), three recent projects with size and duration, one quote, and a short form to book a site visit. Licence number and HBCF insurance are in the footer where a careful client looks for them. A studio example for builders, trades and anyone who wants a site they can update without calling me.",
    ],
    stack: ["Webflow", "Webflow CMS", "Finsweet Attributes"],
  },
];

export function getWork(slug: string): WorkItem | undefined {
  return work.find((item) => item.slug === slug);
}
