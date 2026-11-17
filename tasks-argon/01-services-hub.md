# Task 01: Services Hub (`/services/` — `src/pages/services/index.astro`)

**Target File**: `src/pages/services/index.astro`  
**Execution Context**: Standalone zero-context task for **Argon 4**.  
**Prerequisites**: Review `tasks-argon/00-overview.md` for tokens, clamps, and motion rules.  
**Validation Command**: `pnpm run build`

---

## 1. Objective & Requirements

Transform the wireframe stub at `src/pages/services/index.astro` into a production-grade, SEO-optimized Services Hub.

### Mandatory Elements:
1. **Layout**: Uses `MainLayout.astro` with `title`, `description`, `canonical`.
2. **Breadcrumbs**:
   - Visible breadcrumbs: `Home / Services`
   - Schema: `BreadcrumbList` JSON-LD injected into `<Fragment slot="head">`.
3. **AEO / GEO Direct Answer Block**:
   - 40–60 word direct factual answer explaining Brux's speaker representation model.
4. **4 Service Pillars**:
   - Speaker Booking (`/services/booking/`)
   - LinkedIn Management (`/services/linkedin/`)
   - Speaker Content (`/services/content/`)
   - Speaker Websites (`/services/web-design/`)
   - Each pillar includes an icon, deliverable metrics, problem solved, and a deep-link CTA.
5. **Client Proof Section**:
   - Evidence from Dr. Phillip Meade (former NASA engineer), Angie Pichardo (author & life coach), and Philip Jayhawk Chan (speaker reel).
6. **Pricing Teaser**:
   - Summary of tiers ($500, $1,200, $1,800, $2,500/mo) and direct link to `/pricing/`.
7. **Structured Data**:
   - `Service` schema (with `hasOfferCatalog`)
   - `BreadcrumbList` schema
   - `FAQPage` schema (5 Q&As)
8. **Motion Standards**:
   - Kinetic word-masking on H1 headline with `expo.out` easing.
   - Staggered card reveals via `ScrollTrigger`.
   - Astro View Transitions cleanup on `astro:before-swap`.

---

## 2. Complete Source Code

Replace the entire content of `src/pages/services/index.astro` with the code below:

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
  Mic,
  Users,
  Video,
  Globe,
  ShieldCheck,
  Sparkles,
  HelpCircle
} from "lucide";

const siteUrl = Astro.site ? Astro.site.origin : "https://www.brux.site";

const pageMeta = {
  title: "Services for Keynote & Professional Speakers | Brux",
  description: "Full-service keynote speaker representation: direct organizer booking, LinkedIn personal branding, demo reels, and speaker websites. Flat monthly fee, 0% commission.",
  canonical: "/services/",
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
    }
  ]
};

// Service Schema with Catalog
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/services/#service`,
  "name": "Keynote Speaker Representation and Agency Services",
  "serviceType": "Keynote Speaker Booking, LinkedIn Management & Media Production",
  "provider": {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": "Brux",
    "url": siteUrl
  },
  "url": `${siteUrl}/services/`,
  "description": "Brux provides full-service representation for keynote speakers: monthly pitching to event organizers, LinkedIn management, demo reels, and speaker web design with 0% commission on speaking fees.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Speaker Agency Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Speaker Booking",
          "url": `${siteUrl}/services/booking/`,
          "description": "Direct outreach to conference organizers and corporate event planners in your verified niche."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "LinkedIn Management",
          "url": `${siteUrl}/services/linkedin/`,
          "description": "Profile positioning, thought-leadership ghostwriting, and organizer network growth."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Speaker Content",
          "url": `${siteUrl}/services/content/`,
          "description": "Speaker demo reels, keynote video clips, and high-converting press kits."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Speaker Website Design",
          "url": `${siteUrl}/services/web-design/`,
          "price": "1100",
          "priceCurrency": "USD",
          "description": "Dedicated single-page speaker website built to close event organizers."
        }
      }
    ]
  }
};

// FAQ Schema
const faqs = [
  {
    q: "Why does Brux combine speaker booking and LinkedIn management in every plan?",
    a: "When an event organizer receives an outreach pitch for a keynote speaker, the first action they take is reviewing the speaker's LinkedIn profile. If the profile is inactive, outdated, or lacks stage authority, the pitch bounces. Combining proactive outreach with an authoritative profile ensures organizers see proof of expertise immediately."
  },
  {
    q: "Do you take any commission on speaking fees?",
    a: "No. Brux operates exclusively on flat monthly retainers starting at $500/month. We take 0% commission on your speaking contracts. If you book a $10,000 keynote, you keep all $10,000."
  },
  {
    q: "How many pitches do you send to event organizers each month?",
    a: "Outreach volume depends on your plan: Founder and Foundation plans include 60 pitches/month, Growth includes 110 pitches/month, and the Complete plan includes 160+ targeted pitches/month. Every contact is tracked in your shared CRM portal."
  },
  {
    q: "Can I order speaker website design or demo reel production without a monthly retainer?",
    a: "Speaker website design is available as a one-time project starting from $1,100. Speaker demo reel production and press kits are included with all monthly speaker plans or quoted standalone based on your existing footage assets."
  },
  {
    q: "How long does it take to see results from outreach?",
    a: "Most corporate conferences and associations book keynote speakers 3 to 9 months in advance. While organizer replies and discovery calls typically begin within the first 30 to 60 days, confirmed speaking contracts follow the standard event planning cycle."
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

const pillars = [
  {
    id: "booking",
    title: "Speaker Booking",
    subtitle: "Targeted Outreach to Event Organizers",
    icon: Mic,
    href: "/services/booking/",
    metrics: "60 to 160+ pitches / month",
    description: "We manually research corporate event planners, conference committees, and association leaders in your exact niche. No generic call-for-speakers forms; every pitch is sent directly to the decision-maker holding the budget.",
    deliverables: [
      "Custom outreach pitches tailored to event themes",
      "Speaker press kit and demo reel attached to every pitch",
      "Full CRM visibility with contact details and status notes",
      "Calendar coordination and contract hold follow-ups",
      "0% commission on all booked speaking fees"
    ]
  },
  {
    id: "linkedin",
    title: "LinkedIn Management",
    subtitle: "Authority Positioning & Network Growth",
    icon: Users,
    href: "/services/linkedin/",
    metrics: "2 to 8 posts / month + network expansion",
    description: "Turn your LinkedIn into a conversion engine. We overhaul your headline and featured media into a speaker one-sheet, ghostwrite thought-leadership content, and expand your network with verified event organizers.",
    deliverables: [
      "Complete profile makeover engineered for conference organizers",
      "Executive ghostwriting focused on speaking themes",
      "Targeted weekly connection requests to event planners",
      "Organizer engagement and comment outreach (Complete plan)",
      "Monthly performance report on reach, impressions, and leads"
    ]
  },
  {
    id: "content",
    title: "Speaker Content",
    subtitle: "Demo Reels, Press Kits & Talk Clips",
    icon: Video,
    href: "/services/content/",
    metrics: "High-energy reels & vertical clips",
    description: "Event committees won't risk booking an unverified speaker. We cut your long recordings into dynamic demo reels and captioned vertical video clips that prove stage presence in under 30 seconds.",
    deliverables: [
      "Cinematic speaker demo reel with sound design and grading",
      "Professional speaker one-sheet / press kit PDF",
      "Short-form keynote clips edited for LinkedIn and reels",
      "Media assets ready for event promotional programs",
      "Included with all core speaker management packages"
    ]
  },
  {
    id: "web-design",
    title: "Speaker Websites",
    subtitle: "Dedicated High-Converting Speaker Sites",
    icon: Globe,
    href: "/services/web-design/",
    metrics: "From $1,100 one-time",
    description: "One lightning-fast link that answers an organizer's questions instantly: stage bio, keynote topics, video reels, client proof, and a direct inquiry form that eliminates email friction.",
    deliverables: [
      "Clean, modern responsive layout built for decision-makers",
      "Interactive video reel and stage proof integration",
      "Downloadable speaker one-sheet integration",
      "Direct availability inquiry form connected to your calendar",
      "Lightning-fast Core Web Vitals performance"
    ]
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

  <div class="bg-ink text-paper" data-services-hub-root>
    <!-- HERO SECTION -->
    <section class="relative pt-[max(8.5rem,calc(4.5rem+6svh))] pb-16 sm:pb-24 border-b border-paper/10" aria-labelledby="services-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <!-- Breadcrumbs -->
        <nav aria-label="Breadcrumb" class="text-sm text-muted-on-ink mb-6" data-hub-crumb>
          <ol class="flex flex-wrap items-center gap-2">
            <li>
              <a href="/" class="transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stage">
                Home
              </a>
            </li>
            <li aria-hidden="true" class="text-paper/35">/</li>
            <li aria-current="page" class="font-semibold text-paper">Services</li>
          </ol>
        </nav>

        <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-8">
            <h1
              id="services-title"
              class="max-w-[48rem] text-[clamp(2.25rem,1.5rem+3.1vw,4.25rem)] leading-[1.03] font-extrabold tracking-[-0.025em] text-balance text-paper"
              data-hub-title
            >
              {words("Services built to put keynote speakers on paid stages").map((w, j, a) => (
                <>
                  <span class={maskClass}><span class={wordClass} data-hub-word>{w}</span></span>
                  {j < a.length - 1 && " "}
                </>
              ))}
            </h1>
            <p
              class="mt-6 max-w-[42rem] text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-relaxed text-pretty text-muted-on-ink"
              data-hub-lead
            >
              We combine manual, high-volume outreach to verified event organizers with the executive LinkedIn positioning, demo reels, and speaker websites required to convert invitations into paid keynote contracts.
            </p>
          </div>

          <div class="lg:col-span-4 lg:justify-self-end" data-hub-badge>
            <div class="inline-flex flex-col gap-1.5 rounded-[16px] border border-paper/12 bg-ink-raised px-6 py-5 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]">
              <div class="flex items-center gap-2 text-stage-glow">
                <ShieldCheck class="size-5 shrink-0" />
                <span class="text-xs font-bold uppercase tracking-wider">Zero Commission</span>
              </div>
              <span class="text-3xl font-extrabold leading-none tracking-[-0.03em] text-paper tabular-nums">0%</span>
              <span class="text-sm leading-snug text-muted-on-ink">You keep 100% of your speaking fee on every event</span>
            </div>
          </div>
        </div>

        <!-- Section Navigation Pills -->
        <nav
          aria-label="Service Quick Jump"
          class="mt-10 flex flex-wrap gap-2.5 border-t border-paper/10 pt-8"
          data-hub-pills
        >
          <a href="#booking" class="group/pill inline-flex min-h-10 items-center gap-2 rounded-full border border-paper/15 bg-ink-raised px-4 py-2 text-sm font-semibold text-paper/90 transition-colors hover:border-paper/35 hover:bg-paper/10 hover:text-paper">
            <span>Speaker Booking</span>
            <MorphIcon icon={ArrowDown} size={14} strokeWidth={2.2} spring="snappy" reducedMotion="user" />
          </a>
          <a href="#linkedin" class="group/pill inline-flex min-h-10 items-center gap-2 rounded-full border border-paper/15 bg-ink-raised px-4 py-2 text-sm font-semibold text-paper/90 transition-colors hover:border-paper/35 hover:bg-paper/10 hover:text-paper">
            <span>LinkedIn Management</span>
            <MorphIcon icon={ArrowDown} size={14} strokeWidth={2.2} spring="snappy" reducedMotion="user" />
          </a>
          <a href="#content" class="group/pill inline-flex min-h-10 items-center gap-2 rounded-full border border-paper/15 bg-ink-raised px-4 py-2 text-sm font-semibold text-paper/90 transition-colors hover:border-paper/35 hover:bg-paper/10 hover:text-paper">
            <span>Speaker Content</span>
            <MorphIcon icon={ArrowDown} size={14} strokeWidth={2.2} spring="snappy" reducedMotion="user" />
          </a>
          <a href="#web-design" class="group/pill inline-flex min-h-10 items-center gap-2 rounded-full border border-paper/15 bg-ink-raised px-4 py-2 text-sm font-semibold text-paper/90 transition-colors hover:border-paper/35 hover:bg-paper/10 hover:text-paper">
            <span>Speaker Websites</span>
            <MorphIcon icon={ArrowDown} size={14} strokeWidth={2.2} spring="snappy" reducedMotion="user" />
          </a>
          <a href="#proof" class="group/pill inline-flex min-h-10 items-center gap-2 rounded-full border border-paper/15 bg-ink-raised px-4 py-2 text-sm font-semibold text-paper/90 transition-colors hover:border-paper/35 hover:bg-paper/10 hover:text-paper">
            <span>Client Proof</span>
            <MorphIcon icon={ArrowDown} size={14} strokeWidth={2.2} spring="snappy" reducedMotion="user" />
          </a>
          <a href="#faq" class="group/pill inline-flex min-h-10 items-center gap-2 rounded-full border border-paper/15 bg-ink-raised px-4 py-2 text-sm font-semibold text-paper/90 transition-colors hover:border-paper/35 hover:bg-paper/10 hover:text-paper">
            <span>FAQ</span>
            <MorphIcon icon={ArrowDown} size={14} strokeWidth={2.2} spring="snappy" reducedMotion="user" />
          </a>
        </nav>
      </div>
    </section>

    <!-- DIRECT ANSWER / AEO BLOCK -->
    <section class="py-12 bg-ink-raised/50 border-b border-paper/10" aria-label="Quick Answer Summary">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="rounded-[20px] border border-paper/15 bg-ink p-7 sm:p-9 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]" data-hub-answer>
          <div class="flex items-center gap-2 text-stage-glow text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles class="size-4 shrink-0" />
            <span>Direct Overview (AEO Summary)</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-paper tracking-[-0.015em] mb-4">
            What representation does Brux provide for keynote speakers?
          </h2>
          <p class="text-base sm:text-lg leading-relaxed text-paper/90 font-medium max-w-[54rem]">
            Brux provides full-service representation for keynote and professional speakers, combining direct monthly pitching to event organizers with executive LinkedIn management, high-converting demo reels, and dedicated speaker websites. Operating on flat monthly retainers from $500 with zero percent commission on speaking fees, Brux secures paid stages while ensuring speaker authority backs every pitch.
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-4 pt-6 border-t border-paper/10 text-sm text-muted-on-ink">
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> 60–160+ Pitches/Month</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> 0% Commission Retainer</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> Real-Time CRM Tracking</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> Full Media & Web Assets</span>
          </div>
        </div>
      </div>
    </section>

    <!-- THE FLYWHEEL / INTEGRATED MODEL SECTION -->
    <section class="py-20 sm:py-28 lg:py-32 border-b border-paper/10" aria-labelledby="flywheel-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="max-w-[42rem]">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">The Two-Sided Flywheel</span>
          <h2 id="flywheel-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-balance text-paper">
            Why booking and LinkedIn must operate as one system
          </h2>
          <p class="mt-4 text-base sm:text-lg leading-relaxed text-muted-on-ink">
            Most speakers fail because their outreach and positioning are disconnected. Pitching without authority gets ignored; authority without proactive pitching stays invisible.
          </p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <div class="rounded-[20px] border border-paper/12 bg-ink-raised p-8">
            <div class="size-12 rounded-[12px] bg-paper/5 border border-paper/10 flex items-center justify-center text-paper font-bold text-lg mb-6">01</div>
            <h3 class="text-xl font-extrabold text-paper">Outbound Pitching Without LinkedIn Fails</h3>
            <p class="mt-3 text-base leading-relaxed text-muted-on-ink">
              When an organizer receives a cold proposal, their immediate reflex is opening the speaker's LinkedIn profile. If the feed has been dead for four months or looks like a corporate employee profile, the pitch is discarded.
            </p>
          </div>
          <div class="rounded-[20px] border border-paper/12 bg-ink-raised p-8">
            <div class="size-12 rounded-[12px] bg-stage/15 border border-stage/20 flex items-center justify-center text-stage-glow font-bold text-lg mb-6">02</div>
            <h3 class="text-xl font-extrabold text-paper">The Brux Outbound + Inbound Synthesis</h3>
            <p class="mt-3 text-base leading-relaxed text-muted-on-ink">
              While we pitch 60 to 160+ niche organizers on your behalf, we flood your LinkedIn with high-authority posts, stage clips, and comments. When planners look you up, they find undeniable social proof and an active following.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4 SERVICE PILLARS SECTION -->
    <section class="py-20 sm:py-28 lg:py-32" aria-labelledby="pillars-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-paper/10 pb-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Our Core Services</span>
            <h2 id="pillars-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
              The four pillars of your speaking business
            </h2>
          </div>
          <p class="max-w-[26rem] text-sm sm:text-base text-muted-on-ink">
            Every service is engineered to eliminate friction in the event organizer's buying decision.
          </p>
        </div>

        <div class="mt-12 grid gap-8 lg:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                id={pillar.id}
                class="scroll-mt-24 flex flex-col justify-between rounded-[20px] border border-paper/12 bg-ink-raised p-8 sm:p-10 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]"
                data-pillar-card
              >
                <div>
                  <div class="flex items-center justify-between gap-4">
                    <div class="flex size-14 items-center justify-center rounded-[14px] bg-paper/5 border border-paper/10 text-stage-glow">
                      <Icon class="size-7" />
                    </div>
                    <span class="rounded-full bg-paper/10 px-3 py-1 text-xs font-bold text-paper border border-paper/15">
                      {pillar.metrics}
                    </span>
                  </div>

                  <h3 class="mt-6 text-2xl font-extrabold text-paper tracking-[-0.015em]">
                    <a href={pillar.href} class="hover:text-stage-glow transition-colors focus-visible:outline-2 focus-visible:outline-stage">
                      {pillar.title}
                    </a>
                  </h3>
                  <p class="text-sm font-semibold text-muted-on-ink mt-1">{pillar.subtitle}</p>

                  <p class="mt-4 text-base leading-relaxed text-muted-on-ink">
                    {pillar.description}
                  </p>

                  <div class="mt-6 border-t border-paper/10 pt-6">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-paper/70 mb-3">Key Deliverables:</h4>
                    <ul class="space-y-2.5">
                      {pillar.deliverables.map((item) => (
                        <li class="flex items-start gap-2.5 text-sm text-paper/85">
                          <Check class="size-4 shrink-0 text-stage-glow mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div class="mt-8 pt-6 border-t border-paper/10">
                  <a
                    href={pillar.href}
                    class="group inline-flex items-center gap-2 text-base font-semibold text-paper hover:text-stage-glow transition-colors focus-visible:outline-2 focus-visible:outline-stage"
                  >
                    <span>Explore {pillar.title} in detail</span>
                    <span class="inline-flex transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">
                      <MorphIcon icon={ArrowRight} size={16} strokeWidth={2.2} spring="snappy" reducedMotion="user" />
                    </span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <!-- CLIENT PROOF SECTION -->
    <section id="proof" class="scroll-mt-24 py-20 sm:py-28 bg-ink-raised/40 border-t border-b border-paper/10" aria-labelledby="proof-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Real Track Record</span>
            <h2 id="proof-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
              Speakers booked and positioned by Brux
            </h2>
          </div>
          <a href="/pricing/#proof" class="inline-flex items-center gap-1.5 text-sm font-semibold text-stage-glow hover:text-paper transition-colors">
            <span>Read full client case studies</span>
            <MorphIcon icon={ArrowRight} size={15} strokeWidth={2} spring="snappy" reducedMotion="user" />
          </a>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <!-- Dr. Phillip Meade -->
          <div class="flex flex-col justify-between rounded-[20px] border border-paper/12 bg-ink p-7 sm:p-8">
            <div>
              <span class="rounded-full bg-stage/15 px-3 py-1 text-xs font-semibold text-stage-glow">Speaker Booking & LinkedIn</span>
              <blockquote class="mt-4 text-base leading-relaxed text-paper/90 italic">
                “Over the course of our engagement, they've been instrumental in growing my LinkedIn presence and getting me booked for podcasts and speaking engagements I wouldn't have had access to on my own.”
              </blockquote>
            </div>
            <div class="mt-6 border-t border-paper/10 pt-4 flex items-center justify-between">
              <div>
                <p class="font-bold text-paper">Dr. Phillip Meade</p>
                <p class="text-xs text-muted-on-ink">Former NASA Engineer & Keynote Speaker</p>
              </div>
              <a href="https://www.linkedin.com/in/philliptmeade/" target="_blank" rel="noopener" class="text-xs font-semibold text-stage-glow hover:underline">
                Profile →
              </a>
            </div>
          </div>

          <!-- Angie Pichardo -->
          <div class="flex flex-col justify-between rounded-[20px] border border-paper/12 bg-ink p-7 sm:p-8">
            <div>
              <span class="rounded-full bg-stage/15 px-3 py-1 text-xs font-semibold text-stage-glow">Speaker Website & Content</span>
              <blockquote class="mt-4 text-base leading-relaxed text-paper/90 italic">
                “They've been amazing throughout the entire process, and really made me feel like I have a team behind me as I continue to grow as a speaker and build my brand.”
              </blockquote>
            </div>
            <div class="mt-6 border-t border-paper/10 pt-4 flex items-center justify-between">
              <div>
                <p class="font-bold text-paper">Angie Pichardo</p>
                <p class="text-xs text-muted-on-ink">Author, Speaker & Life Coach</p>
              </div>
              <a href="https://graceafterthegrave.com/" target="_blank" rel="noopener" class="text-xs font-semibold text-stage-glow hover:underline">
                Live Site →
              </a>
            </div>
          </div>

          <!-- Philip Jayhawk Chan Reel -->
          <div class="flex flex-col justify-between rounded-[20px] border border-paper/12 bg-ink p-7 sm:p-8">
            <div>
              <span class="rounded-full bg-stage/15 px-3 py-1 text-xs font-semibold text-stage-glow">Speaker Demo Reel</span>
              <p class="mt-4 text-base leading-relaxed text-paper/90">
                A high-energy speaker demo reel engineered for international keynote speaker Philip Jayhawk Chan, cut from raw stage recordings into a fast, persuasive 3-minute booking reel.
              </p>
            </div>
            <div class="mt-6 border-t border-paper/10 pt-4 flex items-center justify-between">
              <div>
                <p class="font-bold text-paper">Philip Jayhawk Chan</p>
                <p class="text-xs text-muted-on-ink">International Keynote Speaker</p>
              </div>
              <a href="/services/content/#reel" class="text-xs font-semibold text-stage-glow hover:underline">
                Watch Reel →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING TEASER SECTION -->
    <section class="py-20 sm:py-28 border-b border-paper/10" aria-labelledby="pricing-teaser-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 text-center">
        <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Predictable Investment</span>
        <h2 id="pricing-teaser-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
          Flat monthly retainers. 0% commission on speaking fees.
        </h2>
        <p class="mt-4 max-w-[38rem] mx-auto text-base sm:text-lg text-muted-on-ink">
          Choose the volume of organizer outreach and LinkedIn ghostwriting that fits your speaking goals. Every plan includes CRM visibility and personal representation.
        </p>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
          <div class="rounded-[16px] border border-paper/12 bg-ink-raised p-6">
            <h3 class="text-lg font-bold text-paper">Founder</h3>
            <p class="mt-1 text-2xl font-extrabold text-paper">$500 <span class="text-xs font-normal text-muted-on-ink">/mo</span></p>
            <p class="mt-3 text-sm text-muted-on-ink">60 pitches/mo, 2 LinkedIn posts, press kit & CRM access.</p>
          </div>
          <div class="rounded-[16px] border border-paper/12 bg-ink-raised p-6">
            <h3 class="text-lg font-bold text-paper">Foundation</h3>
            <p class="mt-1 text-2xl font-extrabold text-paper">$1,200 <span class="text-xs font-normal text-muted-on-ink">/mo</span></p>
            <p class="mt-3 text-sm text-muted-on-ink">60 pitches/mo, 2 posts, weekly pipeline review & outreach.</p>
          </div>
          <div class="rounded-[16px] border border-stage/40 bg-ink-raised p-6 relative">
            <span class="absolute -top-3 right-4 rounded-full bg-stage px-2.5 py-0.5 text-[10px] font-bold text-paper uppercase">Most Popular</span>
            <h3 class="text-lg font-bold text-paper">Growth</h3>
            <p class="mt-1 text-2xl font-extrabold text-paper">$1,800 <span class="text-xs font-normal text-muted-on-ink">/mo</span></p>
            <p class="mt-3 text-sm text-muted-on-ink">110 pitches/mo, 4 posts, vertical video editing & outreach.</p>
          </div>
          <div class="rounded-[16px] border border-paper/12 bg-ink-raised p-6">
            <h3 class="text-lg font-bold text-paper">Complete</h3>
            <p class="mt-1 text-2xl font-extrabold text-paper">$2,500 <span class="text-xs font-normal text-muted-on-ink">/mo</span></p>
            <p class="mt-3 text-sm text-muted-on-ink">160+ pitches/mo, 8 posts, full executive comment outreach.</p>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/pricing/" variant="primary" arrow>
            Compare detailed plan features
          </Button>
          <Button href={bookingUrl} variant="secondary">
            Book a 20-min strategy call
          </Button>
        </div>
      </div>
    </section>

    <!-- FAQ ACCORDION SECTION -->
    <section id="faq" class="scroll-mt-24 py-20 sm:py-28 border-b border-paper/10" aria-labelledby="faq-title">
      <div class="mx-auto max-w-5xl px-4 sm:px-8 lg:px-12">
        <div class="text-center">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Frequently Asked Questions</span>
          <h2 id="faq-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
            Everything you need to know about our services
          </h2>
        </div>

        <div class="mt-12 space-y-4">
          {faqs.map((f, i) => (
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
    <section class="py-24 sm:py-32 bg-ink text-center" aria-labelledby="cta-title">
      <div class="mx-auto max-w-4xl px-4 sm:px-8">
        <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Ready For More Stages?</span>
        <h2 id="cta-title" class="mt-3 text-[clamp(2rem,1.6rem+2vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.025em] text-balance text-paper">
          Let’s build your speaker pipeline together
        </h2>
        <p class="mt-5 max-w-[34rem] mx-auto text-base sm:text-lg text-muted-on-ink leading-relaxed">
          Book a 20-minute strategy call with our founders. We’ll review your niche, evaluate your existing assets, and show you exactly who we’d pitch.
        </p>
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <CtaButton href={bookingUrl}>Book a strategy call</CtaButton>
          <Button href="/pricing/" variant="secondary">View pricing</Button>
        </div>
      </div>
    </section>
  </div>
</MainLayout>

<script>
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  let mm: gsap.MatchMedia | null = null;

  function initServicesHub() {
    const root = document.querySelector<HTMLElement>("[data-services-hub-root]");
    if (!root) return;

    mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const crumb = root.querySelector<HTMLElement>("[data-hub-crumb]");
        const words = root.querySelectorAll<HTMLElement>("[data-hub-word]");
        const lead = root.querySelector<HTMLElement>("[data-hub-lead]");
        const badge = root.querySelector<HTMLElement>("[data-hub-badge]");
        const pills = root.querySelector<HTMLElement>("[data-hub-pills]");
        const answer = root.querySelector<HTMLElement>("[data-hub-answer]");
        const cards = root.querySelectorAll<HTMLElement>("[data-pillar-card]");

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
        if (pills) tl.from(pills, { y: 10, autoAlpha: 0, duration: 0.55, clearProps: "transform,opacity,visibility" }, 0.42);
        if (answer) tl.from(answer, { y: 16, autoAlpha: 0, duration: 0.7, clearProps: "transform,opacity,visibility" }, 0.5);

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

  document.addEventListener("astro:page-load", initServicesHub);
  document.addEventListener("astro:before-swap", () => {
    mm?.revert();
    mm = null;
  });
</script>
```

---

## 3. Step-by-Step Execution for Argon 4

1. Overwrite `src/pages/services/index.astro` with the code above.
2. Verify imports match existing project files (`MainLayout.astro`, `site.ts`, `Button.astro`, `CtaButton.astro`).
3. Run `pnpm run build` to confirm static generation passes.
4. Verify `dist/services/index.html` contains the JSON-LD schemas (`BreadcrumbList`, `Service`, `FAQPage`) and valid meta tags.
