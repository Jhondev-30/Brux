# Task 02: Speaker Booking Service (`/services/booking/` — `src/pages/services/booking.astro`)

**Target File**: `src/pages/services/booking.astro`  
**Execution Context**: Standalone zero-context task for **Argon 4**.  
**Prerequisites**: Review `tasks-argon/00-overview.md` for design tokens, typography clamps, and Bang Motion rules.  
**Validation Command**: `pnpm run build`

---

## 1. Objective & Requirements

Transform the wireframe stub at `src/pages/services/booking.astro` into a comprehensive, high-converting service landing page.

### Mandatory Elements:
1. **Layout**: Uses `MainLayout.astro` with `title`, `description`, `canonical`.
2. **Breadcrumbs**:
   - UI: `Home / Services / Speaker Booking`
   - Schema: `BreadcrumbList` JSON-LD injected in `<Fragment slot="head">`.
3. **AEO / GEO Direct Answer Block**:
   - 40–60 word direct answer explaining how Brux's speaker outreach operates.
4. **Problem & Deliverables Breakdown**:
   - The breakdown of monthly pitch quotas: 60 (Founder & Foundation), 110 (Growth), 160+ (Complete).
   - Real-time CRM tracking, organizer research, customized pitch angles, post-event rebooking.
   - Strict 0% commission guarantee.
5. **Real Evidence & Client Proof**:
   - Dr. Phillip Meade (Former NASA Engineer & Keynote Speaker) quote and credential highlight.
6. **Cross-Linking Matrix**:
   - Link to `/services/linkedin/` ("Why organizers inspect your LinkedIn profile before booking").
   - Link to `/services/content/` ("How your demo reel and press kit travel with every pitch").
   - Link to `/pricing/` and `bookingUrl`.
7. **Structured Data**:
   - `Service` schema (`serviceType: "Keynote Speaker Booking & Event Outreach"`).
   - `BreadcrumbList` schema.
   - `FAQPage` schema (5 Q&As).
8. **Motion Standards**:
   - Bang Motion word-masking on H1 headline with `expo.out` easing.
   - Staggered card reveals via `ScrollTrigger`.
   - Astro View Transitions cleanup on `astro:before-swap`.

---

## 2. Complete Source Code

Replace the entire content of `src/pages/services/booking.astro` with the code below:

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
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  Calendar,
  Database,
  Mail,
  FileCheck
} from "lucide";

const siteUrl = Astro.site ? Astro.site.origin : "https://www.brux.site";

const pageMeta = {
  title: "Speaker Booking Agency: Direct Pitches to Event Organizers | Brux",
  description: "Targeted keynote speaker outreach pitching you directly to 60 to 160+ event planners monthly. Full CRM visibility, custom pitch angles, and 0% commission.",
  canonical: "/services/booking/",
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
      "name": "Speaker Booking",
      "item": `${siteUrl}/services/booking/`
    }
  ]
};

// Service Schema
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/services/booking/#service`,
  "name": "Keynote Speaker Booking & Event Outreach",
  "serviceType": "Keynote Speaker Booking Agency",
  "provider": {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": "Brux",
    "url": siteUrl
  },
  "url": `${siteUrl}/services/booking/`,
  "description": "Brux manually researches and pitches keynote speakers directly to event organizers and corporate conference committees. Delivering 60 to 160+ pitches monthly with 0% commission on speaking fees.",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "500",
    "highPrice": "2500",
    "priceCurrency": "USD",
    "offerCount": "4"
  }
};

// FAQs and Schema
const faqs = [
  {
    q: "How do you select which events and conferences to pitch?",
    a: "We research events specifically mapped to your industry expertise, past speaking topics, and ideal audience. We target industry associations, enterprise user conferences, leadership summits, and corporate offsites that have verified budgets for external keynote speakers."
  },
  {
    q: "Do you take a percentage or commission on the speaking fee?",
    a: "No. Traditional speaker bureaus take 20% to 30% of your gross speaking fee on every contract. Brux operates on a transparent, flat monthly retainer starting at $500/month. You keep 100% of every dollar negotiated."
  },
  {
    q: "How do I track which organizers have been contacted?",
    a: "Every client receives dedicated access to our live CRM portal. You can view the exact company, event name, organizer's name and title, pitch date, follow-up status, and incoming responses in real time."
  },
  {
    q: "Who handles the contract negotiations and event logistics?",
    a: "We initiate the outreach, deliver your demo reel and press kit, follow up persistently, and generate the organizer's interest. Once an organizer requests a discovery call or availability, we coordinate the introduction directly to your calendar so you or your business manager can finalize terms."
  },
  {
    q: "What outreach volume is included in each plan?",
    a: "Founder plan includes 60 pitches/month; Foundation includes 60 pitches/month with weekly pipeline strategy reviews; Growth includes 110 pitches/month; and Complete includes 160+ targeted pitches/month."
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

const pitchTiers = [
  { plan: "Founder", pitches: "60", cadence: "Pitches / month", desc: "Targeted outbound outreach for emerging speakers building their first corporate stage track record." },
  { plan: "Foundation", pitches: "60", cadence: "Pitches / month", desc: "Consistent niche targeting paired with weekly organizer pipeline reviews and calendar coordination." },
  { plan: "Growth", pitches: "110", cadence: "Pitches / month", desc: "Aggressive multi-track pitching across regional conferences, national summits, and executive retreats." },
  { plan: "Complete", pitches: "160+", cadence: "Pitches / month", desc: "Maximum outbound volume covering global conferences, corporate associations, and executive roundtables." },
];

const workflowSteps = [
  {
    step: "01",
    title: "Niche & Decision-Maker Intelligence",
    description: "We don't scrape generic spam lists. We identify the specific Conference Chair, VP of Events, or Association Director who holds the speaker budget for your topic."
  },
  {
    step: "02",
    title: "Bespoke Pitch Angle Formulation",
    description: "Every pitch is customized to the conference's annual theme. We highlight your unique perspective, key audience takeaways, and attach your demo reel and press kit."
  },
  {
    step: "03",
    title: "Multi-Touch Cadence & CRM Logging",
    description: "Organizers receive professional, timed follow-ups. Every touchpoint, open, and response is recorded live in your shared CRM dashboard."
  },
  {
    step: "04",
    title: "Discovery Call Hand-off & Hold Management",
    description: "When an organizer expresses interest, we coordinate the introduction directly to your calendar for contracting. We keep 0% commission on the booking."
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

  <div class="bg-ink text-paper" data-booking-page-root>
    <!-- HERO SECTION -->
    <section class="relative pt-[max(8.5rem,calc(4.5rem+6svh))] pb-16 sm:pb-24 border-b border-paper/10" aria-labelledby="booking-hero-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <!-- Breadcrumbs -->
        <nav aria-label="Breadcrumb" class="text-sm text-muted-on-ink mb-6" data-bp-crumb>
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
            <li aria-current="page" class="font-semibold text-paper">Speaker Booking</li>
          </ol>
        </nav>

        <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-8">
            <h1
              id="booking-hero-title"
              class="max-w-[48rem] text-[clamp(2.25rem,1.5rem+3.1vw,4.25rem)] leading-[1.03] font-extrabold tracking-[-0.025em] text-balance text-paper"
              data-bp-title
            >
              {words("Targeted outreach that puts keynote speakers on paid stages").map((w, j, a) => (
                <>
                  <span class={maskClass}><span class={wordClass} data-bp-word>{w}</span></span>
                  {j < a.length - 1 && " "}
                </>
              ))}
            </h1>
            <p
              class="mt-6 max-w-[42rem] text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-relaxed text-pretty text-muted-on-ink"
              data-bp-lead
            >
              We pitch you directly to the conference directors, corporate planners, and association leaders who hold paid speaker budgets. 60 to 160+ monthly pitches, zero commission.
            </p>
          </div>

          <div class="lg:col-span-4 lg:justify-self-end" data-bp-badge>
            <div class="inline-flex flex-col gap-1.5 rounded-[16px] border border-paper/12 bg-ink-raised px-6 py-5 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]">
              <div class="flex items-center gap-2 text-stage-glow">
                <ShieldCheck class="size-5 shrink-0" />
                <span class="text-xs font-bold uppercase tracking-wider">No Bureau Fee</span>
              </div>
              <span class="text-3xl font-extrabold leading-none tracking-[-0.03em] text-paper tabular-nums">0%</span>
              <span class="text-sm leading-snug text-muted-on-ink">You keep 100% of every speaking contract</span>
            </div>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap gap-4 border-t border-paper/10 pt-8" data-bp-ctas>
          <CtaButton href={bookingUrl}>Book a strategy call</CtaButton>
          <Button href="/pricing/" variant="secondary">Compare outreach plans</Button>
        </div>
      </div>
    </section>

    <!-- DIRECT ANSWER / AEO BLOCK -->
    <section class="py-12 bg-ink-raised/50 border-b border-paper/10" aria-label="Direct Answer Summary">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="rounded-[20px] border border-paper/15 bg-ink p-7 sm:p-9 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]" data-bp-answer>
          <div class="flex items-center gap-2 text-stage-glow text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles class="size-4 shrink-0" />
            <span>Direct Summary (AEO Definition)</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-paper tracking-[-0.015em] mb-4">
            What is Brux's speaker booking service?
          </h2>
          <p class="text-base sm:text-lg leading-relaxed text-paper/90 font-medium max-w-[54rem]">
            Brux's speaker booking service manually researches and pitches keynote speakers directly to conference organizers, corporate event planners, and association directors in their specific niche. Delivering 60 to 160+ targeted monthly pitches with transparent CRM tracking, Brux charges a flat monthly fee and takes zero commission on any speaking fees earned.
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-4 pt-6 border-t border-paper/10 text-sm text-muted-on-ink">
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> 60 to 160+ Monthly Pitches</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> Niche-Verified Event Committees</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> Full CRM Portal Access</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> 0% Commission on Speaking Contracts</span>
          </div>
        </div>
      </div>
    </section>

    <!-- PROBLEM VS BRUX OUTBOUND -->
    <section class="py-20 sm:py-28 lg:py-32 border-b border-paper/10" aria-labelledby="problem-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="max-w-[42rem]">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">The Broken Paradigm</span>
          <h2 id="problem-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
            Why speaker bureaus and speaker directories fail modern keynotes
          </h2>
          <p class="mt-4 text-base sm:text-lg text-muted-on-ink leading-relaxed">
            Speakers waste years submitting to "Call for Speakers" forms that offer no honorarium, or sit passively on speaker bureau rosters waiting for an agent to call.
          </p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <div class="rounded-[20px] border border-paper/12 bg-ink-raised p-8">
            <div class="size-10 rounded-[10px] bg-paper/5 border border-paper/10 flex items-center justify-center text-paper font-bold mb-5">✕</div>
            <h3 class="text-xl font-bold text-paper">Directory Black Holes</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted-on-ink">
              Generic speaker directories receive thousands of applicants. Most don't pay speaking fees, and your profile is buried beneath celebrity names.
            </p>
          </div>
          <div class="rounded-[20px] border border-paper/12 bg-ink-raised p-8">
            <div class="size-10 rounded-[10px] bg-paper/5 border border-paper/10 flex items-center justify-center text-paper font-bold mb-5">✕</div>
            <h3 class="text-xl font-bold text-paper">The 30% Bureau Tax</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted-on-ink">
              Traditional bureaus only proactively pitch their top 5% celebrity talent, while taking a massive 20% to 30% commission if an inbound inquiry lands.
            </p>
          </div>
          <div class="rounded-[20px] border border-stage/30 bg-ink-raised p-8 relative">
            <div class="size-10 rounded-[10px] bg-stage/15 border border-stage/20 flex items-center justify-center text-stage-glow font-bold mb-5">✓</div>
            <h3 class="text-xl font-bold text-paper">The Brux Outbound Model</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted-on-ink">
              We proactively pitch 60 to 160+ targeted organizers every month in your niche. You pay one flat retainer and retain 100% of your earnings.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- MONTHLY OUTREACH QUOTAS -->
    <section class="py-20 sm:py-28 border-b border-paper/10" aria-labelledby="quotas-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-paper/10 pb-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Outreach Volume</span>
            <h2 id="quotas-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
              Monthly pitch quotas across our plans
            </h2>
          </div>
          <a href="/pricing/" class="inline-flex items-center gap-1.5 text-sm font-semibold text-stage-glow hover:text-paper transition-colors">
            <span>View full plan pricing</span>
            <MorphIcon icon={ArrowRight} size={15} strokeWidth={2} spring="snappy" reducedMotion="user" />
          </a>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pitchTiers.map((tier) => (
            <div class="rounded-[20px] border border-paper/12 bg-ink-raised p-8 flex flex-col justify-between" data-bp-tier>
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-paper/70">{tier.plan}</span>
                <p class="mt-2 text-4xl font-extrabold text-paper tabular-nums">{tier.pitches}</p>
                <p class="text-xs font-semibold text-stage-glow uppercase tracking-wider mt-1">{tier.cadence}</p>
                <p class="mt-4 text-sm leading-relaxed text-muted-on-ink border-t border-paper/10 pt-4">
                  {tier.desc}
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-paper/10">
                <span class="inline-flex items-center gap-1.5 text-xs text-paper/80 font-medium">
                  <Check class="size-3.5 text-stage-glow" /> CRM Logged
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <!-- WORKFLOW PIPELINE -->
    <section class="py-20 sm:py-28 lg:py-32 border-b border-paper/10" aria-labelledby="workflow-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="max-w-[40rem]">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Our Outreach Engine</span>
          <h2 id="workflow-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
            How we pitch you to event committees
          </h2>
          <p class="mt-4 text-base sm:text-lg text-muted-on-ink">
            A battle-tested four-step system that treats keynote speaker representation with executive rigor.
          </p>
        </div>

        <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map((s) => (
            <div class="rounded-[20px] border border-paper/12 bg-ink-raised p-8 flex flex-col justify-between">
              <div>
                <span class="text-2xl font-black text-stage-glow font-mono">{s.step}</span>
                <h3 class="mt-4 text-lg font-bold text-paper">{s.title}</h3>
                <p class="mt-3 text-sm leading-relaxed text-muted-on-ink">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <!-- REAL EVIDENCE & CLIENT PROOF -->
    <section class="py-20 sm:py-28 bg-ink-raised/40 border-b border-paper/10" aria-labelledby="proof-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="max-w-[44rem] mx-auto text-center">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Proven Results</span>
          <h2 id="proof-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
            Trusted by keynote speakers who demand real stages
          </h2>
        </div>

        <div class="mt-12 max-w-3xl mx-auto rounded-[20px] border border-paper/15 bg-ink p-8 sm:p-12 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]">
          <blockquote class="text-lg sm:text-xl leading-relaxed text-paper/95 italic">
            “Working with Everth … has been a true partnership. Over the course of our engagement, they've been instrumental in growing my LinkedIn presence and getting me booked for podcasts and speaking engagements I wouldn't have had access to on my own. … Questions get answered quickly, deadlines are hit, and they genuinely care about the outcomes, not just the deliverables.”
          </blockquote>
          <div class="mt-8 pt-6 border-t border-paper/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p class="text-lg font-bold text-paper">Dr. Phillip Meade</p>
              <p class="text-sm text-muted-on-ink">Former NASA Engineer & Keynote Speaker</p>
            </div>
            <a href="https://www.linkedin.com/in/philliptmeade/" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-sm font-semibold text-stage-glow hover:underline">
              <span>View LinkedIn</span>
              <MorphIcon icon={ArrowRight} size={15} strokeWidth={2} spring="snappy" reducedMotion="user" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CROSS-LINKING TO SIBLING SERVICES -->
    <section class="py-20 sm:py-28 border-b border-paper/10" aria-labelledby="crosslinks-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="text-center max-w-[36rem] mx-auto">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">The Total Ecosystem</span>
          <h2 id="crosslinks-title" class="mt-2 text-2xl sm:text-3xl font-extrabold text-paper tracking-[-0.02em]">
            Outreach is only half the formula
          </h2>
          <p class="mt-3 text-sm sm:text-base text-muted-on-ink">
            A pitch generates attention; your assets and personal brand close the contract.
          </p>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          <div class="rounded-[16px] border border-paper/12 bg-ink-raised p-7">
            <Users class="size-6 text-stage-glow mb-4" />
            <h3 class="text-lg font-bold text-paper">LinkedIn Management</h3>
            <p class="mt-2 text-sm text-muted-on-ink leading-relaxed">
              When planners receive your pitch, they check your LinkedIn. Ensure what they find proves your authority with 2–8 ghostwritten posts and network growth.
            </p>
            <a href="/services/linkedin/" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-stage-glow hover:underline">
              <span>Explore LinkedIn Service</span> →
            </a>
          </div>

          <div class="rounded-[16px] border border-paper/12 bg-ink-raised p-7">
            <Video class="size-6 text-stage-glow mb-4" />
            <h3 class="text-lg font-bold text-paper">Speaker Demo Reels & Content</h3>
            <p class="mt-2 text-sm text-muted-on-ink leading-relaxed">
              Every pitch we send attaches your high-energy speaker demo reel and press kit, proving your stage charisma in under 60 seconds.
            </p>
            <a href="/services/content/" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-stage-glow hover:underline">
              <span>Explore Speaker Content</span> →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section id="faq" class="scroll-mt-24 py-20 sm:py-28 border-b border-paper/10" aria-labelledby="faq-booking-title">
      <div class="mx-auto max-w-4xl px-4 sm:px-8">
        <div class="text-center">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Answers</span>
          <h2 id="faq-booking-title" class="mt-2 text-2xl sm:text-3xl font-extrabold text-paper tracking-[-0.02em]">
            Frequently asked questions about speaker booking
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
    <section class="py-24 sm:py-32 bg-ink text-center" aria-labelledby="cta-booking-title">
      <div class="mx-auto max-w-4xl px-4 sm:px-8">
        <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Take The Stage</span>
        <h2 id="cta-booking-title" class="mt-3 text-[clamp(2rem,1.6rem+2vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.025em] text-paper">
          Ready to put your keynote on the event radar?
        </h2>
        <p class="mt-5 max-w-[34rem] mx-auto text-base sm:text-lg text-muted-on-ink leading-relaxed">
          Book a 20-minute strategy call with our outreach directors. We'll audit your speaker positioning and evaluate conference opportunities in your niche.
        </p>
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <CtaButton href={bookingUrl}>Book a strategy call</CtaButton>
          <Button href="/pricing/" variant="secondary">View outreach plans</Button>
        </div>
      </div>
    </section>
  </div>
</MainLayout>

<script>
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  let mm: gsap.MatchMedia | null = null;

  function initBookingPage() {
    const root = document.querySelector<HTMLElement>("[data-booking-page-root]");
    if (!root) return;

    mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const crumb = root.querySelector<HTMLElement>("[data-bp-crumb]");
        const words = root.querySelectorAll<HTMLElement>("[data-bp-word]");
        const lead = root.querySelector<HTMLElement>("[data-bp-lead]");
        const badge = root.querySelector<HTMLElement>("[data-bp-badge]");
        const ctas = root.querySelector<HTMLElement>("[data-bp-ctas]");
        const answer = root.querySelector<HTMLElement>("[data-bp-answer]");
        const tiers = root.querySelectorAll<HTMLElement>("[data-bp-tier]");

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

        if (tiers.length) {
          gsap.from(tiers, {
            scrollTrigger: {
              trigger: tiers[0],
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

  document.addEventListener("astro:page-load", initBookingPage);
  document.addEventListener("astro:before-swap", () => {
    mm?.revert();
    mm = null;
  });
</script>
```

---

## 3. Step-by-Step Execution for Argon 4

1. Overwrite `src/pages/services/booking.astro` with the code above.
2. Verify imports match existing project files.
3. Run `pnpm run build` to confirm static compilation.
4. Verify `dist/services/booking/index.html` contains the `Service`, `BreadcrumbList`, and `FAQPage` schemas.
