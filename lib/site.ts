export const site = {
  name: "Tacking Point Digital",
  email: "andy@tackingpointdigital.com.au",
  phone: "0473 950 514",
  location: "Port Macquarie, NSW",
  url: "https://tackingpointdigital.com.au",
} as const;

/** Lead offer on the home/services path — not only in Pricing, not only for people who already have a quote. */
export const fixedPriceOffer =
  "You tell me what you need and I give you a fixed price for the build.";

/** Sidebar introduction; also shown in the mobile menu and above the work grid on phones. */
export const intro = [
  `${site.name} is me, Andy, a web developer in ${site.location}.`,
  `I build websites and web apps for businesses and professionals, on the Mid North Coast and further afield. ${fixedPriceOffer}`,
  "Have a look at some recent work and samples, or get in touch. I'm always happy to chat.",
] as const;

export const mailto = `mailto:${site.email}`;
export const tel = `tel:+61${site.phone.replace(/\s/g, "").slice(1)}`;

/** Locked client portal on Cloudflare Pages (not GitHub Pages). */
export const clientsUrl = "https://clients.tackingpointdigital.com.au";
export const clientsLabel = "Client portal";
