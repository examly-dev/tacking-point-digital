export const site = {
  name: "Tacking Point Digital",
  email: "andy@tackingpointdigital.com.au",
  phone: "0473 950 514",
  location: "Port Macquarie, NSW",
  url: "https://tackingpointdigital.com.au",
  tagline:
    "Websites and web apps for businesses and professionals on the Mid North Coast and further afield.",
} as const;

/** Sidebar introduction; also shown above recent work on the home page. */
export const intro = [
  `${site.name} is me, Andy, a web developer in ${site.location}.`,
  "I build websites and web apps for businesses and professionals, on the Mid North Coast and further afield.",
  "Have a look at some recent work and samples, or get in touch. I'm always happy to chat.",
] as const;

export const description =
  "Websites and web apps for businesses and professionals. Andy, web developer, Port Macquarie.";

export const mailto = `mailto:${site.email}`;
export const tel = `tel:+61${site.phone.replace(/\s/g, "").slice(1)}`;

/** Locked client portal on Cloudflare Pages (not GitHub Pages). */
export const clientsUrl = "https://clients.tackingpointdigital.com.au";
export const clientsLabel = "Client portal";
