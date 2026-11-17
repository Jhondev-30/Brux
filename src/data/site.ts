/**
 * Datos compartidos por el nav, el footer y la portada.
 * Precios y cifras: PDF de planes del 1 de noviembre de 2026.
 */

/** Agenda de Google para la llamada de estrategia. Todos los botones «Book a call» llevan aquí. */
export const bookingUrl = "https://calendar.app.google/HDfbcei5XRa84yeh7";

export const services = [
  {
    href: "/services/booking",
    name: "Speaker booking",
    text: "We pitch you every month to the organizers of events in your niche.",
  },
  {
    href: "/services/linkedin",
    name: "LinkedIn management",
    text: "Positioning, an optimized profile and a network of the people who book speakers.",
  },
  {
    href: "/services/content",
    name: "Speaker content",
    text: "Demo reel, press kit, LinkedIn posts and edited clips from your talks.",
  },
  {
    href: "/services/web-design",
    name: "Speaker websites",
    text: "One link that answers an organizer's questions. From $1,100 flat fee.",
  },
];

export const plans = [
  { name: "Founder", price: "$500", pitches: "60" },
  { name: "Foundation", price: "$1,200", pitches: "60" },
  { name: "Growth", price: "$1,800", pitches: "110" },
  { name: "Complete", price: "$2,500", pitches: "160+" },
];

export const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];
