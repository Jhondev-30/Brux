# Task 04: Speaker Content Service (`/services/content/` — `src/pages/services/content.astro`)

**Target File**: `src/pages/services/content.astro`  
**Execution Context**: Standalone zero-context task for **Argon 4**.  
**Prerequisites**: Review `tasks-argon/00-overview.md` for design tokens, typography clamps, and Bang Motion rules.  
**Validation Command**: `pnpm run build`

---

## 1. Objective & Requirements

Transform the wireframe stub at `src/pages/services/content.astro` into a cinematic, high-converting service landing page.

### Mandatory Elements:
1. **Layout**: Uses `MainLayout.astro` with `title`, `description`, `canonical`.
2. **Breadcrumbs**:
   - UI: `Home / Services / Speaker Content`
   - Schema: `BreadcrumbList` JSON-LD injected in `<Fragment slot="head">`.
3. **AEO / GEO Direct Answer Block**:
   - 40–60 word direct answer explaining Brux's video editing and press kit production.
4. **Deliverables Breakdown**:
   - High-energy speaker demo reel (fast-paced 3-minute edit, sound design, audience reactions).
   - Speaker Press Kit / One-Sheet (PDF and web-ready assets).
   - Vertical video clips with kinetic subtitles for LinkedIn feeds (Growth & Complete plans).
   - Media kit packaging ready for conference organizers to use in event brochures.
5. **Real Evidence & Media Proof**:
   - Interactive HTML5 video player embedding Philip Jayhawk Chan's keynote demo reel (`/videos/work/philip-chan-reel.mp4` with poster `/videos/work/philip-chan-reel-poster.webp`).
   - `VideoObject` JSON-LD schema matching the reel asset.
6. **Cross-Linking Matrix**:
   - Link to `/services/web-design/` ("Hosting your demo reel and press kit on a dedicated website").
   - Link to `/services/booking/` ("How your media assets accelerate booking pitch response rates").
   - Link to `/pricing/` and `bookingUrl`.
7. **Structured Data**:
   - `Service` schema (`serviceType: "Keynote Speaker Video Production & Media Packaging"`).
   - `VideoObject` schema (Philip Chan reel).
   - `BreadcrumbList` schema.
   - `FAQPage` schema (5 Q&As).
8. **Motion Standards**:
   - Bang Motion word-masking on H1 headline with `expo.out` easing.
   - Staggered card reveals via `ScrollTrigger`.
   - Astro View Transitions cleanup on `astro:before-swap`.

---

## 2. Complete Source Code

Replace the entire content of `src/pages/services/content.astro` with the code below:

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
import { bookingUrl } from "../../data/site";
import Button from "../../components/ui/Button.astro";
import CtaButton from "../../components/ui/CtaButton.astro";
import MorphIcon from "morphicons/astro";
import {
  ArrowRight,
  ArrowDown,
  Check,
  Video,
  FileText,
  Play,
  Sparkles,
  Film,
  Smartphone,
  Layers,
  Globe,
  Mic
} from "lucide";

const siteUrl = Astro.site ? Astro.site.origin : "https://www.brux.site";

const pageMeta = {
  title: "Speaker Content: Demo Reels, Press Kits & Keynote Clips | Brux",
  description: "High-converting speaker demo reels, press kits, and vertical keynote video clips that prove stage authority and close event committees.",
  canonical: "/services/content/",
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
      "name": "Speaker Content",
      "item": `${siteUrl}/services/content/`
    }
  ]
};

// VideoObject Schema
const videoObjectSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Philip Jayhawk Chan Keynote Speaker Demo Reel",
  "description": "High-energy keynote speaker demo reel cut by Brux showcasing stage presence, vocal authority, and audience engagement.",
  "thumbnailUrl": `${siteUrl}/videos/work/philip-chan-reel-poster.webp`,
  "uploadDate": "2026-11-15T00:00:00Z",
  "contentUrl": `${siteUrl}/videos/work/philip-chan-reel.mp4`,
  "embedUrl": `${siteUrl}/services/content/#reel`
};

// Service Schema
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/services/content/#service`,
  "name": "Keynote Speaker Content & Demo Reel Production",
  "serviceType": "Speaker Video Editing, Demo Reel Production & Media Kits",
  "provider": {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": "Brux",
    "url": siteUrl
  },
  "url": `${siteUrl}/services/content/`,
  "description": "Brux produces conversion-focused speaker demo reels, press kits, and short-form keynote video clips that prove stage presence in under three minutes."
};

// FAQ Schema
const faqs = [
  {
    q: "Why is a speaker demo reel essential for getting booked?",
    a: "Event committees review dozens of speaker candidates for each stage. They rarely have time to watch a full 60-minute talk, and they cannot take the risk of booking a speaker without seeing how they command a room. A 2 to 3-minute reel proves stage presence, audience reaction, and vocal clarity immediately."
  },
  {
    q: "What raw footage do I need to provide for a demo reel?",
    a: "Ideally, you provide raw 1080p or 4K video recordings of 1 to 3 past speaking engagements, along with clear direct-mic audio. If you have audience reactions, B-roll, or workshop clips, we incorporate those as well. If your footage has audio noise, our audio post-production cleans and balances it."
  },
  {
    q: "What is included in the Speaker Press Kit?",
    a: "Your press kit includes your official speaker bio (short and long versions), keynote topic titles and descriptions with audience learning outcomes, stage technical requirements (A/V rider), high-res approved headshots, and event organizer quotes."
  },
  {
    q: "Are vertical video clips included in all monthly plans?",
    a: "Edited vertical clips with kinetic subtitles are included in our Growth (110 pitches/mo) and Complete (160+ pitches/mo) plans. They can also be quoted as a standalone monthly video batch."
  },
  {
    q: "What is the typical turnaround time for a demo reel?",
    a: "From the moment we receive your raw footage and keynote preferences, we deliver the first draft within 10 business days. Two rounds of revisions are included to refine the pace, music, and title overlays."
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

const deliverables = [
  {
    icon: Film,
    title: "Cinematic Demo Reel",
    subtitle: "2–3 Minute Stage Reel",
    description: "Engineered specifically for event selection committees. Fast-paced hook, dynamic sound design, crowd reactions, and punchy pull-quotes.",
    badge: "Included in all plans"
  },
  {
    icon: FileText,
    title: "Speaker Press Kit / One-Sheet",
    subtitle: "PDF & Digital One-Sheet",
    description: "A beautifully formatted one-sheet containing your stage bio, core keynote topics, attendee outcomes, and direct contact details.",
    badge: "Included in all plans"
  },
  {
    icon: Smartphone,
    title: "Keynote Video Clips",
    subtitle: "Captioned Vertical Video",
    description: "We extract the most viral, impactful 30 to 60-second moments from your talks, format them with kinetic subtitles, and optimize them for LinkedIn.",
    badge: "Growth & Complete"
  },
  {
    icon: Layers,
    title: "Media Asset Packaging",
    subtitle: "Conference Kit",
    description: "Pre-packaged promotional bios, headshots, and session abstracts ready for event organizers to drop into their conference brochures and mobile apps.",
    badge: "All plans"
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
    <script type="application/ld+json" set:html={JSON.stringify(videoObjectSchema)} />
    <script type="application/ld+json" set:html={JSON.stringify(serviceSchema)} />
    <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
  </Fragment>

  <div class="bg-ink text-paper" data-content-page-root>
    <!-- HERO SECTION -->
    <section class="relative pt-[max(8.5rem,calc(4.5rem+6svh))] pb-16 sm:pb-24 border-b border-paper/10" aria-labelledby="content-hero-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <!-- Breadcrumbs -->
        <nav aria-label="Breadcrumb" class="text-sm text-muted-on-ink mb-6" data-cp-crumb>
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
            <li aria-current="page" class="font-semibold text-paper">Speaker Content</li>
          </ol>
        </nav>

        <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-8">
            <h1
              id="content-hero-title"
              class="max-w-[48rem] text-[clamp(2.25rem,1.5rem+3.1vw,4.25rem)] leading-[1.03] font-extrabold tracking-[-0.025em] text-balance text-paper"
              data-cp-title
            >
              {words("Media assets that prove stage presence in under three minutes").map((w, j, a) => (
                <>
                  <span class={maskClass}><span class={wordClass} data-cp-word>{w}</span></span>
                  {j < a.length - 1 && " "}
                </>
              ))}
            </h1>
            <p
              class="mt-6 max-w-[42rem] text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-relaxed text-pretty text-muted-on-ink"
              data-cp-lead
            >
              Event organizers need proof of your stage charisma before signing a contract. We produce cinematic demo reels, press kits, and vertical keynote clips that close event committees.
            </p>
          </div>

          <div class="lg:col-span-4 lg:justify-self-end" data-cp-badge>
            <div class="inline-flex flex-col gap-1.5 rounded-[16px] border border-paper/12 bg-ink-raised px-6 py-5 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]">
              <div class="flex items-center gap-2 text-stage-glow">
                <Video class="size-5 shrink-0" />
                <span class="text-xs font-bold uppercase tracking-wider">Proof of Stage</span>
              </div>
              <span class="text-3xl font-extrabold leading-none tracking-[-0.03em] text-paper tabular-nums">&lt; 3 Min</span>
              <span class="text-sm leading-snug text-muted-on-ink">To convince any conference selection committee</span>
            </div>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap gap-4 border-t border-paper/10 pt-8" data-cp-ctas>
          <CtaButton href={bookingUrl}>Book a strategy call</CtaButton>
          <Button href="#reel" variant="secondary">Watch Philip Chan demo reel</Button>
        </div>
      </div>
    </section>

    <!-- DIRECT ANSWER / AEO BLOCK -->
    <section class="py-12 bg-ink-raised/50 border-b border-paper/10" aria-label="Direct Summary">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="rounded-[20px] border border-paper/15 bg-ink p-7 sm:p-9 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]" data-cp-answer>
          <div class="flex items-center gap-2 text-stage-glow text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles class="size-4 shrink-0" />
            <span>Direct Summary (AEO Definition)</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-paper tracking-[-0.015em] mb-4">
            What is Brux's speaker content and video production service?
          </h2>
          <p class="text-base sm:text-lg leading-relaxed text-paper/90 font-medium max-w-[54rem]">
            Brux produces conversion-focused speaker content that proves stage presence to event organizers in under three minutes. Our service includes producing dynamic speaker demo reels, designing professional press kits, and editing long keynote recordings into captioned vertical video clips optimized for LinkedIn, social channels, and event pitch attachments.
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-4 pt-6 border-t border-paper/10 text-sm text-muted-on-ink">
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> Dynamic 2–3 Min Demo Reel</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> Professional Speaker Press Kit</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> Captioned Vertical Video Clips</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> Organizer Media Packaging</span>
          </div>
        </div>
      </div>
    </section>

    <!-- DEMO REEL SHOWCASE / REAL EVIDENCE -->
    <section id="reel" class="scroll-mt-24 py-20 sm:py-28 border-b border-paper/10" aria-labelledby="reel-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="max-w-[42rem]">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Production Standard</span>
          <h2 id="reel-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
            Watch a Brux speaker reel in action
          </h2>
          <p class="mt-4 text-base sm:text-lg text-muted-on-ink">
            Keynote demo reel cut for international speaker Philip Jayhawk Chan. Tight cuts, clear vocal dynamics, audience reactions, and zero filler.
          </p>
        </div>

        <div class="mt-12 rounded-[20px] border border-paper/15 bg-ink-raised p-4 sm:p-6 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]">
          <div class="relative aspect-video w-full overflow-hidden rounded-[14px] bg-black">
            <video
              controls
              playsinline
              preload="metadata"
              poster="/videos/work/philip-chan-reel-poster.webp"
              class="size-full object-cover"
            >
              <source src="/videos/work/philip-chan-reel.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="mt-4 flex flex-wrap items-center justify-between gap-4 px-2 pt-2 text-sm text-muted-on-ink">
            <span>Speaker: <strong>Philip Jayhawk Chan</strong></span>
            <span>Asset: <strong>Keynote Speaker Demo Reel</strong></span>
            <span class="text-stage-glow font-medium">Produced by Brux</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 4 CONTENT DELIVERABLES -->
    <section class="py-20 sm:py-28 lg:py-32 border-b border-paper/10" aria-labelledby="deliverables-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-paper/10 pb-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Core Deliverables</span>
            <h2 id="deliverables-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
              Everything required to sell your stage authority
            </h2>
          </div>
          <p class="max-w-[26rem] text-sm sm:text-base text-muted-on-ink">
            Included in our speaker representation packages or quoted as a dedicated media sprint.
          </p>
        </div>

        <div class="mt-12 grid gap-8 md:grid-cols-2">
          {deliverables.map((item) => {
            const Icon = item.icon;
            return (
              <div class="rounded-[20px] border border-paper/12 bg-ink-raised p-8 sm:p-10 flex flex-col justify-between" data-cp-card>
                <div>
                  <div class="flex items-center justify-between gap-4 mb-6">
                    <div class="size-12 rounded-[12px] bg-paper/5 border border-paper/10 flex items-center justify-center text-stage-glow">
                      <Icon class="size-6" />
                    </div>
                    <span class="rounded-full bg-paper/10 px-3 py-1 text-xs font-bold text-paper border border-paper/15">
                      {item.badge}
                    </span>
                  </div>
                  <h3 class="text-xl font-extrabold text-paper">{item.title}</h3>
                  <p class="text-sm font-semibold text-muted-on-ink mt-1">{item.subtitle}</p>
                  <p class="mt-4 text-base leading-relaxed text-muted-on-ink">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <!-- CROSS-LINKING TO SIBLING SERVICES -->
    <section class="py-20 sm:py-28 border-b border-paper/10" aria-labelledby="crosslinks-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="text-center max-w-[36rem] mx-auto">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Turn Assets Into Stages</span>
          <h2 id="crosslinks-title" class="mt-2 text-2xl sm:text-3xl font-extrabold text-paper tracking-[-0.02em]">
            Where your speaker content goes to work
          </h2>
          <p class="mt-3 text-sm sm:text-base text-muted-on-ink">
            A demo reel does nothing sitting on your hard drive. We put it in front of event organizers.
          </p>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          <div class="rounded-[16px] border border-paper/12 bg-ink-raised p-7">
            <Globe class="size-6 text-stage-glow mb-4" />
            <h3 class="text-lg font-bold text-paper">Speaker Website Design</h3>
            <p class="mt-2 text-sm text-muted-on-ink leading-relaxed">
              Embed your demo reel and press kit onto a dedicated, high-converting one-page site built for event decision-makers. From $1,100 one-time.
            </p>
            <a href="/services/web-design/" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-stage-glow hover:underline">
              <span>Explore Speaker Websites</span> →
            </a>
          </div>

          <div class="rounded-[16px] border border-paper/12 bg-ink-raised p-7">
            <Mic class="size-6 text-stage-glow mb-4" />
            <h3 class="text-lg font-bold text-paper">Speaker Booking Outreach</h3>
            <p class="mt-2 text-sm text-muted-on-ink leading-relaxed">
              We attach your demo reel and press kit to every one of the 60 to 160+ monthly pitches we send directly to conference planners.
            </p>
            <a href="/services/booking/" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-stage-glow hover:underline">
              <span>Explore Speaker Booking</span> →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section id="faq" class="scroll-mt-24 py-20 sm:py-28 border-b border-paper/10" aria-labelledby="faq-content-title">
      <div class="mx-auto max-w-4xl px-4 sm:px-8">
        <div class="text-center">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Q&A</span>
          <h2 id="faq-content-title" class="mt-2 text-2xl sm:text-3xl font-extrabold text-paper tracking-[-0.02em]">
            Frequently asked questions about speaker content
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
    <section class="py-24 sm:py-32 bg-ink text-center" aria-labelledby="cta-content-title">
      <div class="mx-auto max-w-4xl px-4 sm:px-8">
        <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Capture Your Stage</span>
        <h2 id="cta-content-title" class="mt-3 text-[clamp(2rem,1.6rem+2vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.025em] text-paper">
          Let’s produce your keynote reel and press kit
        </h2>
        <p class="mt-5 max-w-[34rem] mx-auto text-base sm:text-lg text-muted-on-ink leading-relaxed">
          Book a 20-minute strategy call with our creative team. We’ll review your existing talk recordings and show you how we’ll edit your demo reel.
        </p>
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <CtaButton href={bookingUrl}>Book a strategy call</CtaButton>
          <Button href="/pricing/" variant="secondary">View plans with content</Button>
        </div>
      </div>
    </section>
  </div>
</MainLayout>

<script>
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  let mm: gsap.MatchMedia | null = null;

  function initContentPage() {
    const root = document.querySelector<HTMLElement>("[data-content-page-root]");
    if (!root) return;

    mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const crumb = root.querySelector<HTMLElement>("[data-cp-crumb]");
        const words = root.querySelectorAll<HTMLElement>("[data-cp-word]");
        const lead = root.querySelector<HTMLElement>("[data-cp-lead]");
        const badge = root.querySelector<HTMLElement>("[data-cp-badge]");
        const ctas = root.querySelector<HTMLElement>("[data-cp-ctas]");
        const answer = root.querySelector<HTMLElement>("[data-cp-answer]");
        const cards = root.querySelectorAll<HTMLElement>("[data-cp-card]");

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

  document.addEventListener("astro:page-load", initContentPage);
  document.addEventListener("astro:before-swap", () => {
    mm?.revert();
    mm = null;
  });
</script>
```

---

## 3. Step-by-Step Execution for Argon 4

1. Overwrite `src/pages/services/content.astro` with the code above.
2. Verify imports match existing project files.
3. Run `pnpm run build` to confirm static compilation.
4. Verify `dist/services/content/index.html` contains the `Service`, `VideoObject`, `BreadcrumbList`, and `FAQPage` schemas.
