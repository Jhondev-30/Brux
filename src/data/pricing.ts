/**
 * Fuente de verdad tipada para /pricing y los schemas JSON-LD de precios.
 * Datos vigentes: PDF de planes del 1 de noviembre de 2026 y servicios/web-design.astro.
 */

export interface PricingTier {
  id: "founder" | "growth" | "complete";
  name: string;
  badge: string;
  price: number | null;
  priceLabel: string;
  priceSubLabel?: string;
  savingsTag?: string;
  ctaLabel?: string;
  footerNote?: string;
  pitches: string;
  posts: string;
  commitment: string;
  summary: string;
  adds: string;
  highlightsHeading: string;
  highlights: { label: string; featured?: boolean }[];
  featured?: boolean;
}

export type MatrixCell = boolean | string;

export interface ComparisonRow {
  label: string;
  note?: string;
  values: {
    founder: MatrixCell;
    growth: MatrixCell;
    complete: MatrixCell;
  };
}

export interface ComparisonCategory {
  id: string;
  title: string;
  rows: ComparisonRow[];
}

export interface DeliverableExplainer {
  id: string;
  title: string;
  availability: string;
  availabilityTone: "all" | "growth" | "complete";
  description: string;
  details: string[];
  linkHref?: string;
  linkLabel?: string;
  visual?: "pitch" | "presskit" | "report";
}

export interface PricingFaq {
  q: string;
  a: string;
}

export const pricingMeta = {
  title: "Speaker Booking & LinkedIn Plans & Pricing | Brux",
  description:
    "Compare Brux's three speaker booking and LinkedIn plans: Founder ($500/mo, moving to Foundation at $1,200/mo after your first paid stage), Growth (110 pitches/mo), and Complete (160+ pitches/mo). 0% commission on your speaking fees.",
  canonical: "/pricing",
};

export const everyPlanIncludes = [
  "0% commission on your speaking fees",
  "Targeted niche events only (no generic listings)",
  "Speaker press kit and demo reel",
  "Full CRM access, ongoing event follow up, and monthly report",
  "LinkedIn profile optimization and active network growth",
];

export const pricingTiers: PricingTier[] = [
  {
    id: "founder",
    name: "Founder",
    badge: "Founder rate",
    price: 500,
    priceLabel: "$500",
    priceSubLabel: "/mo",
    savingsTag: "Save $700/mo until your 1st paid stage",
    ctaLabel: "Claim Founder rate",
    footerNote: "3-month minimum · 0% commission",
    pitches: "60",
    posts: "2",
    commitment: "3-month minimum",
    summary: "Your Founder rate stays at $500/month until we book your first paid speaking event.",
    adds: "Founder pricing until your first paid speaking event is booked",
    highlightsHeading: "Included in Founder",
    highlights: [
      { label: "Press kit & speaker demo reel" },
      { label: "LinkedIn positioning & profile optimization" },
      { label: "Active organizer network expansion" },
      { label: "Live CRM access, event follow up & calendar" },
      { label: "Monthly performance report · 0% commission" },
    ],
    featured: true,
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Recommended",
    price: null,
    priceLabel: "Custom price",
    ctaLabel: "Book a call for pricing",
    footerNote: "No minimum commitment · 0% commission",
    pitches: "110",
    posts: "4",
    commitment: "No minimum commitment",
    summary: "More pitches, plus content and edited clips that keep your name visible.",
    adds: "Video editing of your talks included",
    highlightsHeading: "Everything in Founder, plus",
    highlights: [
      { label: "Video editing of your talks (vertical clips)", featured: true },
      { label: "Press kit & speaker demo reel" },
      { label: "LinkedIn positioning & profile optimization" },
      { label: "Active organizer network expansion" },
      { label: "Live CRM access, follow up & monthly report" },
    ],
  },
  {
    id: "complete",
    name: "Complete",
    badge: "LinkedIn + Booking",
    price: null,
    priceLabel: "Custom price",
    ctaLabel: "Book a call for pricing",
    footerNote: "No minimum commitment · 0% commission",
    pitches: "160+",
    posts: "8",
    commitment: "No minimum commitment",
    summary: "Full outreach in your name and the most stages we can go after.",
    adds: "Outreach & strategic comments in your name",
    highlightsHeading: "Everything in Growth, plus",
    highlights: [
      { label: "Direct outreach to organizers in your name", featured: true },
      { label: "Strategic comments on relevant industry posts", featured: true },
      { label: "Video editing of your talks (vertical clips)" },
      { label: "Press kit, demo reel & LinkedIn optimization" },
      { label: "Live CRM access, follow up & monthly report" },
    ],
  },
];

export const comparisonCategories: ComparisonCategory[] = [
  {
    id: "booking-outreach",
    title: "Booking & Outreach",
    rows: [
      {
        label: "Pitches to event organizers / month",
        values: { founder: "60", growth: "110", complete: "160+" },
      },
      {
        label: "Targeted niche events",
        note: "No generic speaker directories or mass lists",
        values: { founder: true, growth: true, complete: true },
      },
      {
        label: "Speaker press kit",
        values: { founder: true, growth: true, complete: true },
      },
      {
        label: "Speaker demo reel",
        values: { founder: true, growth: true, complete: true },
      },
      {
        label: "CRM access (every organizer contacted)",
        values: { founder: true, growth: true, complete: true },
      },
      {
        label: "Event follow up & calendar management",
        values: { founder: true, growth: true, complete: true },
      },
    ],
  },
  {
    id: "linkedin-content",
    title: "LinkedIn & Content",
    rows: [
      {
        label: "Positioning & profile optimization",
        values: { founder: true, growth: true, complete: true },
      },
      {
        label: "LinkedIn posts / month",
        values: { founder: "2", growth: "4", complete: "8" },
      },
      {
        label: "Active network expansion (organizers in niche)",
        values: { founder: true, growth: true, complete: true },
      },
      {
        label: "Video editing of your talks",
        values: { founder: false, growth: true, complete: true },
      },
      {
        label: "Comments on relevant posts & accounts",
        values: { founder: false, growth: false, complete: true },
      },
      {
        label: "Direct outreach to organizers in your name",
        values: { founder: false, growth: false, complete: true },
      },
    ],
  },
  {
    id: "reporting-terms",
    title: "Reporting & Terms",
    rows: [
      {
        label: "Monthly performance report",
        values: { founder: true, growth: true, complete: true },
      },
      {
        label: "Commission on your speaking fees",
        values: { founder: "0%", growth: "0%", complete: "0%" },
      },
      {
        label: "Minimum commitment",
        note: "Founder moves to Foundation ($1,200/mo) after your 1st paid stage",
        values: {
          founder: "3 months",
          growth: "None",
          complete: "None",
        },
      },
    ],
  },
];

export const deliverableExplainers: DeliverableExplainer[] = [
  {
    id: "direct-pitching",
    title: "Direct Organizer Pitching",
    availability: "All plans (60 to 160+/mo)",
    availabilityTone: "all",
    description:
      "Every month our team manually researches conferences, corporate summits, and associations in your niche, then sends tailored pitches straight to the organizers who decide the lineup, never to generic open call directories or mass lists.",
    details: [
      "60 pitches/mo on Founder (Foundation), 110 on Growth, and 160+ on Complete",
      "You approve the target event categories and topics before outreach begins",
    ],
    linkHref: "/services/booking",
    linkLabel: "Explore speaker booking",
    visual: "pitch",
  },
  {
    id: "press-kit-reel",
    title: "Press Kit & Demo Reel",
    availability: "All plans",
    availabilityTone: "all",
    description:
      "Organizers check how you sound on stage before replying. We package your biography, talk topics, past stages, and best speaking moments into a sharp press kit and demo reel attached to every pitch we send.",
    details: [
      "Built to answer organizer questions in under three minutes",
      "Includes highlight cuts from your keynotes, panels, or interviews",
    ],
    linkHref: "/#work",
    linkLabel: "See Philip Chan's reel",
    visual: "presskit",
  },
  {
    id: "linkedin-growth",
    title: "LinkedIn Positioning & Network Growth",
    availability: "All plans",
    availabilityTone: "all",
    description:
      "Before event organizers book you, they look up your LinkedIn. We rewrite your positioning and profile, publish 2 to 8 posts a month in your voice, and expand your network weekly with decision makers in your industry.",
    details: [
      "Profile headline, about section, and featured proof aligned with your topics",
      "Consistent weekly connection requests to event organizers in your niche",
    ],
    linkHref: "/services/linkedin",
    linkLabel: "Explore LinkedIn management",
  },
  {
    id: "crm-report",
    title: "Transparent CRM & Monthly Report",
    availability: "All plans",
    availabilityTone: "all",
    description:
      "You never have to guess who we contacted. Every plan gives you live CRM visibility of each organizer pitched, replies, calendar holds, event follow ups, and a monthly performance report tracking bookings and LinkedIn growth.",
    details: [
      "Live tracker of every organizer, event date, and outreach status",
      "Follow up after every stage so one keynote turns into repeat bookings and referrals",
    ],
    visual: "report",
  },
  {
    id: "video-editing",
    title: "Talk Video Editing",
    availability: "Growth & Complete",
    availabilityTone: "growth",
    description:
      "We turn long recordings of your keynotes, workshops, and podcast interviews into tight, captioned vertical video clips built for LinkedIn, giving organizers immediate proof of your stage presence as they browse your feed.",
    details: [
      "Subtitled, paced for silent autoplay feeds, and formatted to match your brand",
      "Paired with your 4 or 8 monthly LinkedIn posts",
    ],
    linkHref: "/services/content",
    linkLabel: "Explore speaker content",
  },
  {
    id: "outreach-in-name",
    title: "Outreach & Engagement in Your Name",
    availability: "Complete only",
    availabilityTone: "complete",
    description:
      "Designed for speakers going after flagship stages. Alongside 160+ pitches and 8 posts a month, our team leaves thoughtful comments on relevant industry accounts and sends direct organizer outreach in your name to maximize reply rates.",
    details: [
      "Strategic comments on posts from conference chairs and industry leaders",
      "Personal direct outreach sent under your own identity",
    ],
  },
];

export const websiteAddon = {
  title: "Don't have a speaker website yet?",
  name: "Speaker Website Design",
  price: "From $1,100",
  billing: "Single payment · quoted after a short call",
  description:
    "When an organizer considers booking you, they want one clear link that answers their questions fast. We design and build speaker websites made to convert so you can drop your link into every pitch, LinkedIn profile, and email signature.",
  includes: [
    "Your bio and speaking topics, clearly structured",
    "Your best stage clips and embedded demo reel",
    "Past events, podcasts, and social proof",
    "A downloadable speaker one sheet or press kit",
    "Direct booking inquiry form for organizers",
  ],
};

export const pricingFaqs: PricingFaq[] = [
  {
    q: "Do you take any commission on the paid stages you book?",
    a: "No. We take 0% commission on your speaking fees. You pay your flat monthly plan and keep 100% of every keynote fee, workshop honorarium, or travel stipend you negotiate.",
  },
  {
    q: "How does the $500/mo Founder plan transition to Foundation?",
    a: "Founder includes everything in Foundation for $500/mo on a monthly contract with a 3 month minimum. You keep the $500/mo rate until we book your first paid stage; once your first paid event is booked, your plan moves to Foundation at $1,200/mo.",
  },
  {
    q: "Can I upgrade or switch plans month to month?",
    a: "Yes. Once you move to Foundation ($1,200/mo), or if you are on Growth or Complete, there is no minimum commitment, so you can adjust your pitch volume or pause at the end of any billing cycle. If you are on Founder, you can also upgrade to Growth or Complete anytime after a quick strategy call.",
  },
  {
    q: "What happens if I already have a speaker website vs if I need one?",
    a: "If you already have a website, we link straight to it across your pitches, press kit, and LinkedIn profile. If you don't have one yet, or yours doesn't show your demo reel and topics clearly, we offer Speaker Website Design starting from $1,100 as a single payment.",
  },
  {
    q: "How fast do we start after booking a strategy call?",
    a: "Onboarding kicks off within 72 hours of getting started. We align on your niche, topics, and ideal stages, optimize your LinkedIn profile, prepare your press kit and demo reel, and begin pitching organizers.",
  },
  {
    q: "Which plan fits me if I'm just starting vs already speaking regularly?",
    a: "Founder ($500/mo, transitioning to Foundation at $1,200/mo once we book your first paid stage) fits speakers building steady monthly momentum with 60 targeted pitches and 2 LinkedIn posts. Growth is best if you already have talk footage and want 110 pitches, 4 posts, and edited talk clips. Complete fits established speakers who want maximum pitch volume (160+/mo), 8 posts, and direct outreach in their name. Both Growth and Complete have custom pricing scoped on a strategy call.",
  },
];
