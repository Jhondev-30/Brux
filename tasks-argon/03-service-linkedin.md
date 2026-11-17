# Task 03: LinkedIn Management Service (`/services/linkedin/` — `src/pages/services/linkedin.astro`)

**Target File**: `src/pages/services/linkedin.astro`  
**Execution Context**: Standalone zero-context task for **Argon 4**.  
**Prerequisites**: Review `tasks-argon/00-overview.md` for design tokens, typography clamps, and Bang Motion rules.  
**Validation Command**: `pnpm run build`

---

## 1. Objective & Requirements

Transform the wireframe stub at `src/pages/services/linkedin.astro` into a comprehensive, high-converting service landing page.

### Mandatory Elements:
1. **Layout**: Uses `MainLayout.astro` with `title`, `description`, `canonical`.
2. **Breadcrumbs**:
   - UI: `Home / Services / LinkedIn Management`
   - Schema: `BreadcrumbList` JSON-LD injected in `<Fragment slot="head">`.
3. **AEO / GEO Direct Answer Block**:
   - 40–60 word direct answer explaining how Brux manages and scales a speaker's LinkedIn authority.
4. **Problem & Deliverables Breakdown**:
   - Profile transformation: headline, about section, featured speaker reel, banner.
   - Post cadence: 2 posts/mo (Founder/Foundation), 4 posts/mo (Growth), 8 posts/mo (Complete).
   - Network expansion: connecting directly with verified event organizers and meeting planners.
   - Executive commenting and engagement (Complete plan).
   - Monthly performance report tracking views, impressions, and organizer inquiries.
5. **Real Evidence & Client Proof**:
   - Dr. Phillip Meade quote ("instrumental in growing my LinkedIn presence") and Angie Pichardo personal brand reference.
6. **Cross-Linking Matrix**:
   - Link to `/services/booking/` ("Turning LinkedIn authority into confirmed keynote stages").
   - Link to `/services/content/` ("Repurposing your keynote clips into viral LinkedIn video").
   - Link to `/pricing/` and `bookingUrl`.
7. **Structured Data**:
   - `Service` schema (`serviceType: "Keynote Speaker LinkedIn Management & Authority Positioning"`).
   - `BreadcrumbList` schema.
   - `FAQPage` schema (5 Q&As).
8. **Motion Standards**:
   - Bang Motion word-masking on H1 headline with `expo.out` easing.
   - Staggered card reveals via `ScrollTrigger`.
   - Astro View Transitions cleanup on `astro:before-swap`.

---

## 2. Complete Source Code

Replace the entire content of `src/pages/services/linkedin.astro` with the code below:

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
  Users,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  FileText,
  UserCheck,
  Mic,
  Video
} from "lucide";

const siteUrl = Astro.site ? Astro.site.origin : "https://www.brux.site";

const pageMeta = {
  title: "LinkedIn Management for Keynote Speakers | Brux",
  description: "Executive LinkedIn management for speakers: positioning, profile optimization, 2 to 8 ghostwritten posts monthly, and targeted network expansion with event planners.",
  canonical: "/services/linkedin/",
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
      "name": "LinkedIn Management",
      "item": `${siteUrl}/services/linkedin/`
    }
  ]
};

// Service Schema
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/services/linkedin/#service`,
  "name": "Keynote Speaker LinkedIn Management & Personal Branding",
  "serviceType": "Executive LinkedIn Ghostwriting and Network Expansion",
  "provider": {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": "Brux",
    "url": siteUrl
  },
  "url": `${siteUrl}/services/linkedin/`,
  "description": "Brux optimizes keynote speakers' LinkedIn profiles, ghostwrites thought-leadership content, expands their network with event organizers, and tracks performance monthly.",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "500",
    "highPrice": "2500",
    "priceCurrency": "USD",
    "offerCount": "4"
  }
};

// FAQ Schema
const faqs = [
  {
    q: "How does LinkedIn help a keynote speaker get booked for events?",
    a: "Before signing a speaking agreement, event organizers search for the speaker on LinkedIn to evaluate real audience engagement, thought leadership, and peer credibility. An authoritative profile and consistent posting prove you are actively recognized in your domain."
  },
  {
    q: "How does the ghostwriting process capture my authentic voice?",
    a: "We conduct an onboarding interview to extract your core stories, industry frameworks, and vocal cadences. We never use generic AI-generated platitudes. Every post is submitted for your approval before publication."
  },
  {
    q: "How do you grow my network with event decision-makers?",
    a: "We identify corporate meeting planners, VP of Events, and association directors in your niche, then send personalized, non-spam connection requests weekly, organically expanding your direct pipeline."
  },
  {
    q: "How many posts are included each month?",
    a: "Founder and Foundation plans include 2 long-form posts/month; Growth includes 4 posts/month; and the Complete plan includes 8 posts/month along with active engagement and strategic commenting."
  },
  {
    q: "Do I have to give you full login access to my personal LinkedIn account?",
    a: "We can operate either via secure credential management or by providing formatted copy, media assets, and scheduling guidelines for your internal team to publish directly."
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

const postTiers = [
  { plan: "Founder", posts: "2", cadence: "Posts / month", desc: "Foundational thought leadership establishing key talking points and primary stage topics." },
  { plan: "Foundation", posts: "2", cadence: "Posts / month", desc: "Profile overhaul and 2 monthly authority pieces paired with weekly pipeline reviews." },
  { plan: "Growth", posts: "4", cadence: "Posts / month", desc: "Weekly post cadence paired with edited vertical video clips from your keynote talks." },
  { plan: "Complete", posts: "8", cadence: "Posts / month", desc: "Twice-weekly posts, deep comment engagement on organizer feeds, and active outreach." },
];

const transformationSteps = [
  {
    icon: UserCheck,
    title: "High-Converting Profile Architecture",
    description: "We rewrite your headline from a bland job title into an event-focused positioning statement, build a custom banner, and transform your Featured section into a speaker one-sheet."
  },
  {
    icon: FileText,
    title: "Executive Thought-Leadership Ghostwriting",
    description: "Capturing your unique voice through concise interviews, we draft original insights, keynote lessons, and counter-intuitive viewpoints that resonate with corporate leaders."
  },
  {
    icon: Users,
    title: "Targeted Decision-Maker Expansion",
    description: "We don't inflate vanity metrics. We actively grow your network with the specific VP of Events, Meeting Planners, and Association Executives who hold stage budgets."
  },
  {
    icon: TrendingUp,
    title: "Monthly Performance & Pipeline Analytics",
    description: "Track exactly which companies, event organizers, and industry leaders are viewing your profile and engaging with your posts each month."
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

  <div class="bg-ink text-paper" data-linkedin-page-root>
    <!-- HERO SECTION -->
    <section class="relative pt-[max(8.5rem,calc(4.5rem+6svh))] pb-16 sm:pb-24 border-b border-paper/10" aria-labelledby="linkedin-hero-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <!-- Breadcrumbs -->
        <nav aria-label="Breadcrumb" class="text-sm text-muted-on-ink mb-6" data-lp-crumb>
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
            <li aria-current="page" class="font-semibold text-paper">LinkedIn Management</li>
          </ol>
        </nav>

        <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-8">
            <h1
              id="linkedin-hero-title"
              class="max-w-[48rem] text-[clamp(2.25rem,1.5rem+3.1vw,4.25rem)] leading-[1.03] font-extrabold tracking-[-0.025em] text-balance text-paper"
              data-lp-title
            >
              {words("Turn your LinkedIn into a stage that event organizers notice").map((w, j, a) => (
                <>
                  <span class={maskClass}><span class={wordClass} data-lp-word>{w}</span></span>
                  {j < a.length - 1 && " "}
                </>
              ))}
            </h1>
            <p
              class="mt-6 max-w-[42rem] text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-relaxed text-pretty text-muted-on-ink"
              data-lp-lead
            >
              Before an organizer confirms your keynote, they inspect your LinkedIn. We engineer your profile to close decision-makers, ghostwrite thought-leadership content, and grow your network with event planners.
            </p>
          </div>

          <div class="lg:col-span-4 lg:justify-self-end" data-lp-badge>
            <div class="inline-flex flex-col gap-1.5 rounded-[16px] border border-paper/12 bg-ink-raised px-6 py-5 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]">
              <div class="flex items-center gap-2 text-stage-glow">
                <Users class="size-5 shrink-0" />
                <span class="text-xs font-bold uppercase tracking-wider">Authority Engine</span>
              </div>
              <span class="text-3xl font-extrabold leading-none tracking-[-0.03em] text-paper tabular-nums">2–8</span>
              <span class="text-sm leading-snug text-muted-on-ink">Ghostwritten authority posts every month</span>
            </div>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap gap-4 border-t border-paper/10 pt-8" data-lp-ctas>
          <CtaButton href={bookingUrl}>Book a strategy call</CtaButton>
          <Button href="/pricing/" variant="secondary">Compare LinkedIn plans</Button>
        </div>
      </div>
    </section>

    <!-- DIRECT ANSWER / AEO BLOCK -->
    <section class="py-12 bg-ink-raised/50 border-b border-paper/10" aria-label="Direct Summary">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="rounded-[20px] border border-paper/15 bg-ink p-7 sm:p-9 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]" data-lp-answer>
          <div class="flex items-center gap-2 text-stage-glow text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles class="size-4 shrink-0" />
            <span>Direct Summary (AEO Definition)</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-paper tracking-[-0.015em] mb-4">
            What is Brux's LinkedIn management service for speakers?
          </h2>
          <p class="text-base sm:text-lg leading-relaxed text-paper/90 font-medium max-w-[54rem]">
            Brux's LinkedIn management service positions professional speakers as definitive authorities in their industry. We optimize speaker profiles to convert event organizers, ghostwrite 2 to 8 thought-leadership posts monthly, actively expand networks with event decision-makers, and engage industry accounts, ensuring every pitch is backed by social proof and inbound interest.
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-4 pt-6 border-t border-paper/10 text-sm text-muted-on-ink">
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> Speaker Profile Architecture</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> 2 to 8 Ghostwritten Posts/Mo</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> Event Planner Network Growth</span>
            <span class="inline-flex items-center gap-1.5"><Check class="size-4 text-stage-glow" /> Monthly Analytics & Inbound Reporting</span>
          </div>
        </div>
      </div>
    </section>

    <!-- THE PROBLEM FOR SPEAKERS -->
    <section class="py-20 sm:py-28 lg:py-32 border-b border-paper/10" aria-labelledby="problem-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="max-w-[42rem]">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">The Credibility Gap</span>
          <h2 id="problem-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
            Why brilliant keynote speakers get overlooked on LinkedIn
          </h2>
          <p class="mt-4 text-base sm:text-lg text-muted-on-ink leading-relaxed">
            Most speakers treat LinkedIn like an online résumé. When event committees evaluate their profile, they see a corporate employee rather than a marquee keynote speaker.
          </p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <div class="rounded-[20px] border border-paper/12 bg-ink-raised p-8">
            <div class="size-10 rounded-[10px] bg-paper/5 border border-paper/10 flex items-center justify-center text-paper font-bold mb-5">✕</div>
            <h3 class="text-xl font-bold text-paper">The Consultant Profile</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted-on-ink">
              Headlines buried under certifications and corporate buzzwords. Organizers cannot tell within 5 seconds what keynote topics you master.
            </p>
          </div>
          <div class="rounded-[20px] border border-paper/12 bg-ink-raised p-8">
            <div class="size-10 rounded-[10px] bg-paper/5 border border-paper/10 flex items-center justify-center text-paper font-bold mb-5">✕</div>
            <h3 class="text-xl font-bold text-paper">The Inactive Feed</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted-on-ink">
              Infrequent posting or reposting company press releases signals that you are not actively shaping discourse in your industry.
            </p>
          </div>
          <div class="rounded-[20px] border border-stage/30 bg-ink-raised p-8 relative">
            <div class="size-10 rounded-[10px] bg-stage/15 border border-stage/20 flex items-center justify-center text-stage-glow font-bold mb-5">✓</div>
            <h3 class="text-xl font-bold text-paper">The Stage Authority</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted-on-ink">
              A profile engineered as a speaker one-sheet, populated with sharp stage insights, video reels, and connected directly to event planners.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4-PART TRANSFORMATION SYSTEM -->
    <section class="py-20 sm:py-28 lg:py-32 border-b border-paper/10" aria-labelledby="system-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="max-w-[40rem]">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Our Methodology</span>
          <h2 id="system-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
            The 4 pillars of speaker LinkedIn authority
          </h2>
          <p class="mt-4 text-base sm:text-lg text-muted-on-ink">
            A comprehensive positioning program that turns cold viewers into warm booking inquiries.
          </p>
        </div>

        <div class="mt-12 grid gap-8 md:grid-cols-2">
          {transformationSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div class="rounded-[20px] border border-paper/12 bg-ink-raised p-8 sm:p-10 flex flex-col justify-between" data-lp-feature>
                <div>
                  <div class="size-12 rounded-[12px] bg-paper/5 border border-paper/10 flex items-center justify-center text-stage-glow mb-6">
                    <Icon class="size-6" />
                  </div>
                  <h3 class="text-xl font-extrabold text-paper">{step.title}</h3>
                  <p class="mt-3 text-base leading-relaxed text-muted-on-ink">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <!-- POST CADENCE TIERS -->
    <section class="py-20 sm:py-28 border-b border-paper/10" aria-labelledby="cadence-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-paper/10 pb-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Consistent Visibility</span>
            <h2 id="cadence-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
              Ghostwritten post volume across our plans
            </h2>
          </div>
          <a href="/pricing/" class="inline-flex items-center gap-1.5 text-sm font-semibold text-stage-glow hover:text-paper transition-colors">
            <span>View plan comparisons</span>
            <MorphIcon icon={ArrowRight} size={15} strokeWidth={2} spring="snappy" reducedMotion="user" />
          </a>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {postTiers.map((tier) => (
            <div class="rounded-[20px] border border-paper/12 bg-ink-raised p-8 flex flex-col justify-between" data-lp-tier>
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-paper/70">{tier.plan}</span>
                <p class="mt-2 text-4xl font-extrabold text-paper tabular-nums">{tier.posts}</p>
                <p class="text-xs font-semibold text-stage-glow uppercase tracking-wider mt-1">{tier.cadence}</p>
                <p class="mt-4 text-sm leading-relaxed text-muted-on-ink border-t border-paper/10 pt-4">
                  {tier.desc}
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-paper/10">
                <span class="inline-flex items-center gap-1.5 text-xs text-paper/80 font-medium">
                  <Check class="size-3.5 text-stage-glow" /> 100% Pre-Approved
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <!-- REAL EVIDENCE & TESTIMONIAL -->
    <section class="py-20 sm:py-28 bg-ink-raised/40 border-b border-paper/10" aria-labelledby="proof-title">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div class="max-w-[44rem] mx-auto text-center">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Speaker Testimonial</span>
          <h2 id="proof-title" class="mt-2 text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-paper">
            Real growth in authority and stage invitations
          </h2>
        </div>

        <div class="mt-12 max-w-3xl mx-auto rounded-[20px] border border-paper/15 bg-ink p-8 sm:p-12 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]">
          <blockquote class="text-lg sm:text-xl leading-relaxed text-paper/95 italic">
            “Working with Everth … has been instrumental in growing my LinkedIn presence and getting me booked for podcasts and speaking engagements I wouldn't have had access to on my own. … Questions get answered quickly, deadlines are hit, and they genuinely care about the outcomes, not just the deliverables.”
          </blockquote>
          <div class="mt-8 pt-6 border-t border-paper/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p class="text-lg font-bold text-paper">Dr. Phillip Meade</p>
              <p class="text-sm text-muted-on-ink">Former NASA Engineer & Keynote Speaker</p>
            </div>
            <a href="https://www.linkedin.com/in/philliptmeade/" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-sm font-semibold text-stage-glow hover:underline">
              <span>View Profile</span>
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
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Integrated Services</span>
          <h2 id="crosslinks-title" class="mt-2 text-2xl sm:text-3xl font-extrabold text-paper tracking-[-0.02em]">
            Connect your LinkedIn to direct outbound pitching
          </h2>
          <p class="mt-3 text-sm sm:text-base text-muted-on-ink">
            A strong personal brand accelerates response rates across all outbound booking channels.
          </p>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          <div class="rounded-[16px] border border-paper/12 bg-ink-raised p-7">
            <Mic class="size-6 text-stage-glow mb-4" />
            <h3 class="text-lg font-bold text-paper">Speaker Booking Outbound</h3>
            <p class="mt-2 text-sm text-muted-on-ink leading-relaxed">
              We proactively pitch your profile to 60 to 160+ verified event organizers every month, linking directly to your LinkedIn authority.
            </p>
            <a href="/services/booking/" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-stage-glow hover:underline">
              <span>Explore Speaker Booking</span> →
            </a>
          </div>

          <div class="rounded-[16px] border border-paper/12 bg-ink-raised p-7">
            <Video class="size-6 text-stage-glow mb-4" />
            <h3 class="text-lg font-bold text-paper">Speaker Video Content & Clips</h3>
            <p class="mt-2 text-sm text-muted-on-ink leading-relaxed">
              We cut your 60-minute conference recordings into captioned vertical video clips that drive massive organic reach on LinkedIn.
            </p>
            <a href="/services/content/" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-stage-glow hover:underline">
              <span>Explore Speaker Content</span> →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section id="faq" class="scroll-mt-24 py-20 sm:py-28 border-b border-paper/10" aria-labelledby="faq-li-title">
      <div class="mx-auto max-w-4xl px-4 sm:px-8">
        <div class="text-center">
          <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Q&A</span>
          <h2 id="faq-li-title" class="mt-2 text-2xl sm:text-3xl font-extrabold text-paper tracking-[-0.02em]">
            Frequently asked questions about LinkedIn management
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
    <section class="py-24 sm:py-32 bg-ink text-center" aria-labelledby="cta-li-title">
      <div class="mx-auto max-w-4xl px-4 sm:px-8">
        <span class="text-xs font-bold uppercase tracking-wider text-stage-glow">Start Your Positioning</span>
        <h2 id="cta-li-title" class="mt-3 text-[clamp(2rem,1.6rem+2vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.025em] text-paper">
          Make your profile impossible for event planners to ignore
        </h2>
        <p class="mt-5 max-w-[34rem] mx-auto text-base sm:text-lg text-muted-on-ink leading-relaxed">
          Book a 20-minute strategy call with our ghostwriting directors. We'll audit your profile and show you how to turn your feed into an inbound engine.
        </p>
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <CtaButton href={bookingUrl}>Book a strategy call</CtaButton>
          <Button href="/pricing/" variant="secondary">View LinkedIn plans</Button>
        </div>
      </div>
    </section>
  </div>
</MainLayout>

<script>
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  let mm: gsap.MatchMedia | null = null;

  function initLinkedInPage() {
    const root = document.querySelector<HTMLElement>("[data-linkedin-page-root]");
    if (!root) return;

    mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const crumb = root.querySelector<HTMLElement>("[data-lp-crumb]");
        const words = root.querySelectorAll<HTMLElement>("[data-lp-word]");
        const lead = root.querySelector<HTMLElement>("[data-lp-lead]");
        const badge = root.querySelector<HTMLElement>("[data-lp-badge]");
        const ctas = root.querySelector<HTMLElement>("[data-lp-ctas]");
        const answer = root.querySelector<HTMLElement>("[data-lp-answer]");
        const features = root.querySelectorAll<HTMLElement>("[data-lp-feature]");
        const tiers = root.querySelectorAll<HTMLElement>("[data-lp-tier]");

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

        if (features.length) {
          gsap.from(features, {
            scrollTrigger: {
              trigger: features[0],
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

  document.addEventListener("astro:page-load", initLinkedInPage);
  document.addEventListener("astro:before-swap", () => {
    mm?.revert();
    mm = null;
  });
</script>
```

---

## 3. Step-by-Step Execution for Argon 4

1. Overwrite `src/pages/services/linkedin.astro` with the code above.
2. Verify imports match existing project files.
3. Run `pnpm run build` to confirm static compilation.
4. Verify `dist/services/linkedin/index.html` contains the `Service`, `BreadcrumbList`, and `FAQPage` schemas.
