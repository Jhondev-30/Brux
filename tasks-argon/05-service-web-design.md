# Task 05: Speaker Website Design Service (`/services/web-design/` — `src/pages/services/web-design.astro`)

**Target File**: `src/pages/services/web-design.astro`  
**Execution Context**: Standalone zero-context task for **Argon 4**.  
**Prerequisites**: Review `tasks-argon/00-overview.md` for design tokens, typography clamps, and Bang Motion rules.  
**Validation Command**: `pnpm run build`

---

## 1. Objective & Requirements

Transform the wireframe stub at `src/pages/services/web-design.astro` into a high-converting, authoritative service landing page.

### Mandatory Elements:
1. **Layout**: Uses `MainLayout.astro` with `title`, `description`, `canonical`.
2. **Breadcrumbs**:
   - UI: `Home / Services / Speaker Websites`
   - Schema: `BreadcrumbList` JSON-LD injected in `<Fragment slot="head">`.
3. **AEO / GEO Direct Answer Block**:
   - 40–60 word direct answer explaining Brux's speaker website design service and pricing.
4. **Deliverables & Specifications**:
   - Starting from **$1,100 one-time** base price (confirmed source of truth).
   - Single-page conversion architecture engineered for event planners.
   - Core elements: clear bio, keynote topics with audience learning outcomes, embedded video reels, stage proof, press kit PDF download, and direct calendar inquiry form.
5. **Real Evidence & Live Client Case Study**:
   - Live client site proof: Angie Pichardo's site `https://graceafterthegrave.com/` designed and built by the Brux team.
   - Angie Pichardo's quote and screenshot (`src/assets/work/grace-after-the-grave.webp`).
6. **Cross-Linking Matrix**:
   - Link to `/services/content/` ("The video reels and one-sheets that power your site").
   - Link to `/services/booking/` ("Driving event organizer traffic to your speaker site").
   - Link to `/pricing/` and `bookingUrl`.
7. **Structured Data**:
   - `Service` schema (`serviceType: "Speaker Website Design & Development"`) with `Offer` ($1,100 USD price specification).
   - `BreadcrumbList` schema.
   - `FAQPage` schema (5 Q&As).
8. **Motion Standards**:
   - Bang Motion word-masking on H1 headline with `expo.out` easing.
   - Staggered card reveals via `ScrollTrigger`.
   - Astro View Transitions cleanup on `astro:before-swap`.

---

## 2. Complete Source Code

Replace the entire content of `src/pages/services/web-design.astro` with the code below:

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
import { bookingUrl } from "../../data/site";
import Button from "../../components/ui/Button.astro";
import CtaButton from "../../components/ui/CtaButton.astro";
import MorphIcon from "morphicons/astro";
import { Image } from "astro:assets";
import graceImg from "../../assets/work/grace-after-the-grave.webp";
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Check,
  Globe,
  Sparkles,
  ShieldCheck,
  Zap,
  Layout,
  Video,
  FileDown,
  Mail,
  Mic
} from "lucide";

const siteUrl = Astro.site ? Astro.site.origin : "https://www.brux.site";

const pageMeta = {
  title: "Speaker Website Design: High-Converting Sites for Keynotes | Brux",
  description: "Custom single-page speaker websites from $1,100 one-time. Built specifically for event organizers: bio, keynote topics, demo reels, and direct booking inquiry.",
  canonical: "/services/web-design/",
};

// BreadcrumbList Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `${siteUrl}/`
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": `${siteUrl}/services/`
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Speaker Websites",
      "item": `${siteUrl}/services/web-design/`
    }
  ]
};

// Service Schema with Offer
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/services/web-design/#service`,
  "name": "Keynote Speaker Website Design & Development",
  "serviceType": "Speaker Website Design",
  "provider": {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": "Brux",
    "url": siteUrl
  },
  "url": `${siteUrl}/services/web-design/`,
  "description": "Brux designs and develops high-converting, single-page speaker websites engineered specifically to answer event organizers' questions and close keynote bookings.",
  "offers": {
    "@type": "Offer",
    "price": "1100",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": `${siteUrl}/services/web-design/`
  }
};

// FAQ Schema
const faqs = [
  {
    q: "Why do keynote speakers need a dedicated website rather than a general consulting site?",
    a: "Event organizers make quick booking decisions under tight deadlines. A corporate consulting website buries your keynote topics, demo reels, and stage requirements beneath irrelevant service pages. A dedicated speaker site answers all organizer questions in one fast, focused link."
  },
  {
    q: "What does the $1,100 base price include?",
    a: "The $1,100 one-time investment covers the complete design, copywriting refinement, responsive coding, mobile optimization, and deployment of a high-converting single-page speaker website. Custom multi-page layouts or complex integrations are quoted based on scope."
  },
  {
    q: "What platform and technologies do you use to build speaker sites?",
    a: "We build on modern, lightning-fast web technologies (Astro, Tailwind CSS, clean semantic HTML) hosted on high-performance global CDNs (Cloudflare or Vercel). This guarantees perfect mobile responsiveness and near-instant load times."
  },
  {
    q: "How long does it take from kickoff to website launch?",
    a: "Most speaker sites are completed and live within 14 business days from the moment we receive your bio, high-resolution photography, keynote topic summaries, and demo reel."
  },
  {
    q: "Can the website connect directly to my booking calendar?",
    a: "Yes. We integrate your preferred calendar application (Google Calendar, Calendly, or HubSpot) alongside a streamlined inquiry form, allowing conference directors to check your availability or schedule a discovery call immediately."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a
    }
  }))
};

const siteFeatures = [
  {
    icon: Layout,
    title: "Keynote Topics & Outcomes",
    description: "Clear presentation of your primary speeches, complete with attendee learning takeaways, target audience descriptions, and customized session formats."
  },
  {
    icon: Video,
    title: "Stage Video & Demo Reel Embed",
    description: "Seamlessly integrated video players showcasing your stage presence, vocal energy, and crowd reactions without slowing down page load speeds."
  },
  {
    icon: ShieldCheck,
    title: "Client Proof & Testimonials",
    description: "Prominently displayed conference logos, attendee quotes, and organizer recommendations that eliminate hiring risk for event committees."
  },
  {
    icon: FileDown,
    title: "Downloadable Speaker One-Sheet",
    description: "One-click access for event committee members to download your official PDF press kit and share it with their executive board."
  },
  {
    icon: Zap,
    title: "Lightning-Fast Core Web Vitals",
    description: "Engineered with modern web standards to load in under one second on any mobile device or corporate office network."
  },
  {
    icon: Mail,
    title: "Direct Booking Inquiry Form",
    description: "Frictionless contact architecture connected directly to your email or calendar booking scheduler."
  }
];

const words = (s: string) => s.split(" ");
const maskClass = "inline-block overflow-clip align-top pt-[0.06em] pb-[0.14em] px-[0.04em] -mt-[0.06em] -mb-[0.14em] -mx-[0.04em]";
const wordClass = "inline-block origin-[0%_100%] will-change-transform";
---

<MainLayout
  title={pageMeta.title}
  description={pageMeta.description}
  canonical={pageMeta.canonical}
>
  <Fragment slot="head">
    <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
    <script type="application/ld+json" set:html={JSON.stringify(serviceSchema)} />
    <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
  </Fragment>

  <div class="bg-ink text-paper" data-web-page-root>
    <!-- HERO SECTION -->
    <section class="relative pt-[max(8.5rem,calc(4.5rem+6svh))] pb-16 sm:pb-24 border-b border-paper/10" aria-labelledby="web-hero-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <!-- Breadcrumbs -->
        <nav aria-label="Breadcrumb" class="text-sm text-muted-on-ink mb-6" data-wp-crumb>
          <ol class="flex flex-wrap items-center gap-2">
            <li>
              <a href="/" class="transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stage">
                Home
              </a>
            </li>
            <li aria-hidden="true" class="text-paper/35">/</li>
            <li>
              <a href="/services/" class="transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stage">
                Services
              </a>
            </li>
            <li aria-hidden="true" class="text-paper/35">/</li>
            <li aria-current="page" class="font-semibold text-paper">Speaker Websites</li>
          </ol>
        </nav>

        <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-8">
            <h1
              id="web-hero-title"
              class="max-w-[48rem] text-[clamp(2.25rem,1.5rem+3.1vw,4.25rem)] leading-[1.03] font-extrabold tracking-[-0.025em] text-balance text-paper"
              data-wp-title
            >
              {words("One link that answers an organizer's questions and closes the stage").map((w, j, a) => (
                <>
                  <span class={maskClass}><span class={wordClass} data-wp-word>{w}</span></span>
                  {j < a.length - 1 && " "}
                </>
              ))}
            </h1>
            <p
              class="mt-6 max-w-[42rem] text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-relaxed text-pretty text-muted-on-ink"
              data-wp-lead
            >
              Engineered specifically for event planners. Your bio, keynote topics, video reel, and booking calendar in a single fast, elegant website. From $1,100 one-time.
            </p>
          </div>

          <div class="lg:col-span-4 lg:justify-self-end" data-wp-badge>
            <div class="inline-flex flex-col gap-1.5 rounded-[16px] border border-paper/12 bg-ink-raised px-6 py-5 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]">
              <div class="flex items-center gap-2 text-stage-glow">
                <Globe class="size-5 shrink-0" />
                <span class="text-xs font-bold uppercase tracking-wider">One-Time Project</span>
              </div>
              <span class="text-3xl font-extrabold leading-none tracking-[-0.03em] text-paper tabular-nums">From $1,100</span>
              <span class="text-sm leading-snug text-muted-on-ink">Complete design, copy refinement & launch</span>
            </div>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap gap-4 border-t border-paper/10 pt-8" data-wp-ctas>
          <CtaButton href={bookingUrl}>Get a website quote</CtaButton>
          <Button href="#case-study" variant="secondary">View live client site</Button>
        </div>
      </div>
    </section>

    <!-- DIRECT ANSWER / AEO BLOCK -->
    <section class="py-12 bg-ink-raised/50 border-b border-paper/10" aria-label="Direct Summary">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="rounded-[20px] border border-paper/15 bg-ink p-7 sm:p-9 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]" data-wp-answer>
          <div class="flex items-center gap-2 text-stage-glow text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles class="size-4 shrink-0" />
            <span>Direct Summary (AEO Definition)</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-paper tracking-[-0.015em] mb-4">
            What is Brux's speaker website design service?
          </h2>
          <p class="text-base sm:text-lg leading-relaxed text-paper/90 font-medium max-w-[54rem]">
            Brux designs and builds high-converting speaker websites starting from $1,100 one-time. Engineered specifically for event organizers, each site delivers speaker bios, keynote topics, video reels, client proof, and an inquiry form in a single fast, mobile-responsive page that answers booking questions and closes speaking engagements.
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-4 pt-6 border-t border-paper/10 text-sm text-muted-on-ink">
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> From $1,100 One-Time Base</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> Single-Page Conversion Flow</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> Video Reel & Press Kit Integration</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> Rapid 14-Day Delivery</span>
          </div>
        </div>
      </div>
    </section>

    <!-- LIVE CLIENT CASE STUDY / REAL EVIDENCE -->
    <section id="case-study" class="scroll-mt-24 py-20 sm:py-28 lg:py-32 border-b border-paper/10" aria-labelledby="case-study-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-5">
            <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Real Live Site</span>
            <h2 id="case-study-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
              Designed & launched for Angie Pichardo
            </h2>
            <p class="mt-4 text-base sm:text-lg text-muted-on-ink leading-relaxed">
              Angie needed a digital home that established her authority as a Christian speaker, author, and life coach. We designed and coded a focused single-page experience highlighting her keynote topics, books, and stage reels.
            </p>

            <blockquote class="mt-6 rounded-[16px] border border-paper/12 bg-ink-raised p-6 text-sm leading-relaxed text-paper/90 italic">
              “They've been amazing throughout the entire process, and really made me feel like I have a team behind me as I continue to grow as a speaker and build my brand.”
            </blockquote>

            <div class="mt-6 flex items-center gap-4">
              <a
                href="https://graceafterthegrave.com/"
                target="_blank"
                rel="noopener"
                class="group inline-flex items-center gap-2 text-base font-bold text-stage-glow hover:text-paper transition-colors"
              >
                <span>Visit graceafterthegrave.com</span>
                <MorphIcon icon={ArrowUpRight} size={16} strokeWidth={2.2} spring="snappy" reducedMotion="user" />
              </a>
            </div>
          </div>

          <div class="lg:col-span-7">
            <div class="overflow-hidden rounded-[20px] border border-paper/15 bg-ink-raised p-3 sm:p-4 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]">
              <Image
                src={graceImg}
                alt="Grace After The Grave - Angie Pichardo Speaker Website Designed by Brux"
                width={1200}
                height={750}
                class="w-full rounded-[14px] object-cover"
              />
              <div class="mt-3 flex items-center justify-between px-3 text-xs text-muted-on-ink">
                <span>Client: <strong>Angie Pichardo</strong></span>
                <span>Type: <strong>Speaker Website</strong></span>
                <span class="text-stage-glow font-semibold">Live in Production</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ARCHITECTURE & DELIVERABLES -->
    <section class="py-20 sm:py-28 lg:py-32 border-b border-paper/10" aria-labelledby="features-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="max-w-[42rem]">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Conversion Architecture</span>
          <h2 id="features-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
            What every Brux speaker website includes
          </h2>
          <p class="mt-4 text-base sm:text-lg text-muted-on-ink">
            No fluff, no bloated multi-level menus. Every section is built around an event organizer's booking checklist.
          </p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div class="rounded-[20px] border border-paper/12 bg-ink-raised p-8 flex flex-col justify-between" data-wp-card>
                <div>
                  <div class="size-12 rounded-[12px] bg-paper/5 border border-paper/10 flex items-center justify-center text-stage-glow mb-6">
                    <Icon class="size-6" />
                  </div>
                  <h3 class="text-xl font-bold text-paper">{feat.title}</h3>
                  <p class="mt-3 text-sm leading-relaxed text-muted-on-ink">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <!-- PRICING BREAKDOWN -->
    <section class="py-20 sm:py-28 border-b border-paper/10" aria-labelledby="pricing-web-title">
      <div class="mx-auto max-w-4xl px-4 sm:px-8 text-center">
        <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Transparent Investment</span>
        <h2 id="pricing-web-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
          From $1,100. One-time payment.
        </h2>
        <p class="mt-4 max-w-[34rem] mx-auto text-base text-muted-on-ink">
          The final price depends on whether you need custom animations, multi-page layouts, or integrated book order funnels. We quote it clearly on our strategy call.
        </p>

        <div class="mt-10 rounded-[20px] border border-paper/15 bg-ink-raised p-8 sm:p-10 text-left max-w-2xl mx-auto shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]">
          <div class="flex items-center justify-between border-b border-paper/10 pb-6">
            <div>
              <h3 class="text-2xl font-extrabold text-paper">Speaker Website Package</h3>
              <p class="text-sm text-muted-on-ink mt-1">Single-page keynote authority website</p>
            </div>
            <p class="text-3xl font-extrabold text-paper">$1,100+</p>
          </div>
          <ul class="mt-6 space-y-3 text-sm text-paper/85">
            <li class="flex items-center gap-2.5"><Check class="size-4 text-stage-glow shrink-0" /> Full copywriting refinement and headline formulation</li>
            <li class="flex items-center gap-2.5"><Check class="size-4 text-stage-glow shrink-0" /> Keynote topics and audience takeaway breakdown</li>
            <li class="flex items-center gap-2.5"><Check class="size-4 text-stage-glow shrink-0" /> Demo reel video player and stage clip embeds</li>
            <li class="flex items-center gap-2.5"><Check class="size-4 text-stage-glow shrink-0" /> Downloadable PDF speaker kit integration</li>
            <li class="flex items-center gap-2.5"><Check class="size-4 text-stage-glow shrink-0" /> Direct calendar inquiry form integration</li>
            <li class="flex items-center gap-2.5"><Check class="size-4 text-stage-glow shrink-0" /> 14-day turnaround with 2 rounds of design revisions</li>
          </ul>
          <div class="mt-8 pt-6 border-t border-paper/10 flex flex-wrap gap-4">
            <CtaButton href={bookingUrl}>Book a call to discuss your site</CtaButton>
          </div>
        </div>
      </div>
    </section>

    <!-- CROSS-LINKING TO SIBLING SERVICES -->
    <section class="py-20 sm:py-28 border-b border-paper/10" aria-labelledby="crosslinks-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="text-center max-w-[36rem] mx-auto">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Powering The Site</span>
          <h2 id="crosslinks-title" class="mt-2 text-2xl sm:text-3xl font-extrabold text-paper tracking-[-0.02em]">
            The content that fills your speaker website
          </h2>
          <p class="mt-3 text-sm sm:text-base text-muted-on-ink">
            A website requires high-energy media and an outbound engine to drive traffic.
          </p>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          <div class="rounded-[16px] border border-paper/12 bg-ink-raised p-7">
            <Video class="size-6 text-stage-glow mb-4" />
            <h3 class="text-lg font-bold text-paper">Speaker Demo Reels & Press Kits</h3>
            <p class="mt-2 text-sm text-muted-on-ink leading-relaxed">
              We cut your raw talk footage into a fast 2–3 minute demo reel that embeds perfectly at the top of your new website.
            </p>
            <a href="/services/content/" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-stage-glow hover:underline">
              <span>Explore Speaker Content</span> →
            </a>
          </div>

          <div class="rounded-[16px] border border-paper/12 bg-ink-raised p-7">
            <Mic class="size-6 text-stage-glow mb-4" />
            <h3 class="text-lg font-bold text-paper">Speaker Booking Outreach</h3>
            <p class="mt-2 text-sm text-muted-on-ink leading-relaxed">
              We send your new speaker website link directly to 60 to 160+ event organizers every month in our monthly representation plans.
            </p>
            <a href="/services/booking/" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-stage-glow hover:underline">
              <span>Explore Speaker Booking</span> →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section id="faq" class="scroll-mt-24 py-20 sm:py-28 border-b border-paper/10" aria-labelledby="faq-web-title">
      <div class="mx-auto max-w-4xl px-4 sm:px-8">
        <div class="text-center">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Q&A</span>
          <h2 id="faq-web-title" class="mt-2 text-2xl sm:text-3xl font-extrabold text-paper tracking-[-0.02em]">
            Frequently asked questions about speaker websites
          </h2>
        </div>

        <div class="mt-12 space-y-4">
          {faqs.map((f) => (
            <details class="group rounded-[16px] border border-paper/12 bg-ink-raised p-6 transition-colors open:bg-ink-raised/80">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-paper text-lg">
                <span>{f.q}</span>
                <span class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-paper/5 border border-paper/10 text-paper transition-transform duration-200 group-open:rotate-180">
                  <MorphIcon icon={ArrowDown} size={15} strokeWidth={2} spring="snappy" reducedMotion="user" />
                </span>
              </summary>
              <p class="mt-4 text-base leading-relaxed text-muted-on-ink border-t border-paper/10 pt-4">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <!-- FINAL CTA BANNER -->
    <section class="py-24 sm:py-32 bg-ink text-center" aria-labelledby="cta-web-title">
      <div class="mx-auto max-w-4xl px-4 sm:px-8">
        <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Launch Your Site</span>
        <h2 id="cta-web-title" class="mt-3 text-[clamp(2rem,1.6rem+2vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.025em] text-paper">
          Give event planners a link that closes the stage
        </h2>
        <p class="mt-5 max-w-[34rem] mx-auto text-base sm:text-lg text-muted-on-ink leading-relaxed">
          Book a 20-minute strategy call with our web directors. We’ll review your current materials and outline your speaker website architecture.
        </p>
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <CtaButton href={bookingUrl}>Get a website quote</CtaButton>
          <Button href="/pricing/" variant="secondary">Compare representation plans</Button>
        </div>
      </div>
    </section>
  </div>
</MainLayout>

<script>
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  let mm: gsap.MatchMedia | null = null;

  function initWebDesignPage() {
    const root = document.querySelector<HTMLElement>("[data-web-page-root]");
    if (!root) return;

    mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const crumb = root.querySelector<HTMLElement>("[data-wp-crumb]");
        const words = root.querySelectorAll<HTMLElement>("[data-wp-word]");
        const lead = root.querySelector<HTMLElement>("[data-wp-lead]");
        const badge = root.querySelector<HTMLElement>("[data-wp-badge]");
        const ctas = root.querySelector<HTMLElement>("[data-wp-ctas]");
        const answer = root.querySelector<HTMLElement>("[data-wp-answer]");
        const cards = root.querySelectorAll<HTMLElement>("[data-wp-card]");

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        if (crumb) tl.from(crumb, { y: 8, autoAlpha: 0, duration: 0.6, clearProps: "transform,opacity,visibility" }, 0);
        if (words.length) {
          tl.fromTo(
            words,
            { yPercent: 112, rotate: 5 },
            { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.045, clearProps: "transform" },
            0.05
          );
        }
        if (lead) tl.from(lead, { y: 14, autoAlpha: 0, duration: 0.75, clearProps: "transform,opacity,visibility" }, 0.25);
        if (badge) tl.from(badge, { y: 14, autoAlpha: 0, duration: 0.75, clearProps: "transform,opacity,visibility" }, 0.32);
        if (ctas) tl.from(ctas, { y: 10, autoAlpha: 0, duration: 0.6, clearProps: "transform,opacity,visibility" }, 0.4);
        if (answer) tl.from(answer, { y: 16, autoAlpha: 0, duration: 0.7, clearProps: "transform,opacity,visibility" }, 0.48);

        if (cards.length) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: cards[0],
              start: "top 85%",
              once: true,
            },
            y: 30,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "expo.out",
            clearProps: "transform,opacity,visibility",
          });
        }
      }, root);

      return () => ctx.revert();
    });
  }

  document.addEventListener("astro:page-load", initWebDesignPage);
  document.addEventListener("astro:before-swap", () => {
    mm?.revert();
    mm = null;
  });
</script>
```

---

## 3. Step-by-Step Execution for Argon 4

1. Overwrite `src/pages/services/web-design.astro` with the code above.
2. Verify image import (`../../assets/work/grace-after-the-grave.webp`) and `bookingUrl` import.
3. Run `pnpm run build` to confirm static compilation.
4. Verify `dist/services/web-design/index.html` contains the `Service` (with $1,100 offer), `BreadcrumbList`, and `FAQPage` schemas.
