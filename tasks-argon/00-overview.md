# Argon 4 Task Suite: Brux Website Architecture & Design System Overview

**Suite Purpose**: Standalone instructions for external terminal agents using model **Argon 4** with **ZERO prior context** to generate production-ready Astro pages in `src/pages/services/`.

---

## 1. System Architecture & Tech Stack

The Brux website is built with:
- **Framework**: Astro 5 (Static Site Generation mode)
- **CSS Framework**: Tailwind CSS v4 (`@tailwindcss/vite` integration)
- **Animation Engine**: GSAP 3.15.1 with ScrollTrigger and SplitText
- **Icons**: Lucide Icons (`lucide`) and animated Morphicons (`morphicons/astro`)
- **Type Safety**: TypeScript in Astro components
- **Navigation Lifecycle**: Astro ClientRouter (`astro:transitions`)

### Project Root Directory
All commands and paths are relative to the project root:
```
Brux-website/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.astro       # Reusable button with MorphIcon arrow & hover states
│   │   │   └── CtaButton.astro    # 56px prominent primary CTA button
│   │   ├── MainHead.astro         # Injected by MainLayout; contains SEO meta & ClientRouter
│   │   ├── Nav.astro              # Global navigation bar
│   │   └── MainFooter.astro       # Global footer
│   ├── layouts/
│   │   └── MainLayout.astro       # Master layout wrapper (embeds Nav, MainHead, MainFooter)
│   ├── data/
│   │   ├── site.ts                # Site URLs, bookingUrl, services list, nav links
│   │   └── pricing.ts             # Pricing tiers ($500, $1200, $1800, $2500) and schemas
│   ├── styles/
│   │   └── global.css             # Tailwind v4 theme definitions and font setups
│   └── pages/
│       ├── index.astro            # Homepage
│       ├── pricing.astro          # Pricing page (PROTECTED: DO NOT MODIFY)
│       └── services/              # Services hub and subpages
│           ├── index.astro        # Services hub
│           ├── booking.astro      # Speaker Booking service
│           ├── linkedin.astro     # LinkedIn Management service
│           ├── content.astro      # Speaker Content service
│           └── web-design.astro   # Speaker Website Design service
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   ├── robots.txt
│   └── videos/work/               # Demo reels (philip-chan-reel.mp4, angie-pichardo.mp4)
└── tasks-argon/                   # Zero-context execution task prompts for Argon 4
```

---

## 2. Layout & Page Assembly Convention

Every page in `src/pages/services/` MUST wrap its output in `src/layouts/MainLayout.astro`:

```astro
---
import MainLayout from "../../layouts/MainLayout.astro";
import { bookingUrl } from "../../data/site";
import Button from "../../components/ui/Button.astro";
import CtaButton from "../../components/ui/CtaButton.astro";

const pageMeta = {
  title: "Page Title | Brux",
  description: "Exact 150-160 character description summarizing the service.",
  canonical: "/services/subpage/",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.brux.site/services/subpage/#service",
  "name": "Service Name",
  "serviceType": "Keynote Speaker...",
  "provider": {
    "@type": "Organization",
    "name": "Brux",
    "url": "https://www.brux.site"
  },
  "url": "https://www.brux.site/services/subpage/"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.brux.site/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.brux.site/services/" },
    { "@type": "ListItem", "position": 3, "name": "Subpage Name", "item": "https://www.brux.site/services/subpage/" }
  ]
};
---

<MainLayout
  title={pageMeta.title}
  description={pageMeta.description}
  canonical={pageMeta.canonical}
>
  <Fragment slot="head">
    <script type="application/ld+json" set:html={JSON.stringify(serviceSchema)} />
    <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
  </Fragment>

  <!-- Page Content Sections Go Here -->
</MainLayout>
```

> **IMPORTANT**:
> - `<Nav />` and `<MainFooter />` are already rendered inside `MainLayout.astro`. Do NOT duplicate them.
> - Structured data schemas and page-specific `<link>` tags must be placed inside `<Fragment slot="head">`.
> - Do not write raw HTML wrappers like `<html>` or `<body>`; `MainLayout` provides them.

---

## 3. Tailwind CSS v4 Brand Design Tokens

All styles must use the project's semantic theme tokens defined in `src/styles/global.css`:

| Token | Hex / Value | Semantic Usage |
|-------|-------------|----------------|
| `--color-ink` | `#0A0A0A` | Primary dark surface, page background. Use `bg-ink`. |
| `--color-ink-raised` | `#161616` | Elevated cards, feature rows, containers on dark. Use `bg-ink-raised`. |
| `--color-paper` | `#FFFFFF` | Primary headlines and high-contrast text on dark backgrounds. Use `text-paper`. |
| `--color-mist` | `#F2F2F2` | Secondary light surface for alternating contrast sections. Use `bg-mist`. |
| `--color-stage` | `#E50C13` | Brand accent red. Used for primary CTA buttons, curtain, and active indicators. |
| `--color-stage-glow`| `#FF4D47` | High-contrast red accent for text, icons, and badges ON DARK surfaces (`text-stage-glow`). |
| `--color-stage-text`| `#C20A18` | High-contrast darker red for text ON LIGHT surfaces (WCAG AA 5.97+). |
| `--color-muted` | `#5C5C5C` | Secondary text on light backgrounds. |
| `--color-muted-on-ink` | `#A8A8A8` | Secondary body text, captions, and metadata on dark backgrounds (`text-muted-on-ink`). |
| `--font-sans` | `var(--font-brux)` | Archivo local variable font applied globally. |

### Color Rules
- **NEVER** use `--color-stage` (`#E50C13`) as a massive fullscreen background except in high-impact final CTA banners.
- On dark cards (`bg-ink-raised`), borders must use `border border-paper/12` or `border-paper/10`.
- Secondary text on dark surfaces must use `text-muted-on-ink`.

---

## 4. Typography & Spacing Standard

Use the fluid clamp formulas established in the design system:

```astro
<!-- Hero H1 Headline -->
<h1 class="text-[clamp(2.25rem,1.5rem+3.1vw,4.25rem)] leading-[1.03] font-extrabold tracking-[-0.025em] text-balance text-paper">

<!-- Section H2 Headline -->
<h2 class="text-[clamp(1.875rem,1.45rem+1.8vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-balance text-paper">

<!-- Subsection / Card H3 Headline -->
<h3 class="text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] leading-tight font-extrabold tracking-[-0.02em] text-paper">

<!-- Lead / Introductory Paragraph -->
<p class="text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-relaxed text-pretty text-muted-on-ink">

<!-- Standard Body Text -->
<p class="text-base leading-relaxed text-muted-on-ink">
```

### Container & Section Spacing
- Max Container: `mx-auto max-w-7xl px-4 sm:px-8 lg:px-12`
- Hero Section: `pt-[max(8.5rem,calc(4.5rem+6svh))] pb-16 sm:pb-24`
- Standard Content Section: `py-20 sm:py-28 lg:py-32`
- Standard Card: `rounded-[20px] border border-paper/12 bg-ink-raised p-7 sm:p-9 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]`

---

## 5. Lucide Icons & Morphicons Standard

Icons must be imported from `lucide` and `morphicons/astro`:
```astro
---
import { ArrowRight, ArrowUpRight, Check, Sparkles, Mic, Users, Video, Globe } from "lucide";
import MorphIcon from "morphicons/astro";
---

<!-- Static MorphIcon with Snappy Physics -->
<MorphIcon
  icon={ArrowRight}
  size={16}
  strokeWidth={2}
  spring="snappy"
  reducedMotion="user"
/>
```

When building call-to-action buttons, prefer using the existing UI components:
```astro
import Button from "../../components/ui/Button.astro";
import CtaButton from "../../components/ui/CtaButton.astro";

<!-- Primary Action -->
<Button href={bookingUrl} variant="primary" arrow>Book a strategy call</Button>

<!-- Secondary Outlined Action -->
<Button href="/pricing/" variant="secondary">View plans & pricing</Button>

<!-- High-Prominence 56px Hero CTA -->
<CtaButton href={bookingUrl}>Book a strategy call</CtaButton>
```

---

## 6. Bang Motion GSAP Standards (`brux-motion`)

All interactive motion follows the Bang Motion design principles:

### 1. No PowerPoint Slide Transitions
Never fade entire sections in sequentially with simple opacity. Elements must feel physically grounded, with tight kinetic reveals.

### 2. Kinetic Word-Masking Formula
For primary headlines, wrap each word in an overflow clip:
```astro
---
const words = (s: string) => s.split(" ");
const maskClass = "inline-block overflow-clip align-top pt-[0.06em] pb-[0.14em] px-[0.04em] -mt-[0.06em] -mb-[0.14em] -mx-[0.04em]";
const wordClass = "inline-block origin-[0%_100%] will-change-transform";
---

<h1 data-page-title>
  {words("Scale your keynote speaking career").map((w, j, a) => (
    <>
      <span class={maskClass}><span class={wordClass} data-title-word>{w}</span></span>
      {j < a.length - 1 && " "}
    </>
  ))}
</h1>
```

### 3. Easing & Timing Curves
- **Headline Word Reveals**: Duration `0.95s`, ease `"expo.out"`, stagger `0.045s`, `fromTo({ yPercent: 112, rotate: 5 }, { yPercent: 0, rotate: 0 })`.
- **Card & UI Reveal Entrances**: Duration `0.75s`, ease `"expo.out"`, stagger `0.06s`, `from({ y: 24, autoAlpha: 0 })`.
- **Micro-nudges on hover**: Duration `0.24s`, ease `"power3.out"`.
- **PROHIBITED**: Never use bouncy or elastic eases on typography.

### 4. View Transitions & Reduced Motion Lifecycle
Because Astro uses `ClientRouter`, you must:
1. Initialize animations on `astro:page-load`.
2. Wrap animations in `gsap.matchMedia()` targeting `(prefers-reduced-motion: no-preference)`.
3. Revert contexts on `astro:before-swap` to prevent memory leaks and duplicated event listeners.

```astro
<script>
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  let mm: gsap.MatchMedia | null = null;

  function initAnimations() {
    const root = document.querySelector<HTMLElement>("[data-service-root]");
    if (!root) return;

    mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Hero animation timeline
        const words = root.querySelectorAll<HTMLElement>("[data-title-word]");
        const lead = root.querySelector<HTMLElement>("[data-page-lead]");
        const cards = root.querySelectorAll<HTMLElement>("[data-feature-card]");

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        if (words.length) {
          tl.fromTo(words, { yPercent: 112, rotate: 5 }, { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.045, clearProps: "transform" });
        }
        if (lead) {
          tl.from(lead, { y: 16, autoAlpha: 0, duration: 0.75, clearProps: "transform,opacity,visibility" }, 0.25);
        }

        // ScrollTrigger reveal for cards
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
            stagger: 0.08,
            ease: "expo.out",
            clearProps: "transform,opacity,visibility",
          });
        }
      }, root);

      return () => ctx.revert();
    });
  }

  document.addEventListener("astro:page-load", initAnimations);
  document.addEventListener("astro:before-swap", () => {
    mm?.revert();
    mm = null;
  });
</script>
```

---

## 7. AEO / GEO Direct Answer Block Convention

Every service page MUST provide a visible 40–60 word direct answer callout box designed for AI engines (SearchGPT, Perplexity, Google AI Overviews) and human event organizers.

**Format**:
- Positioned high on the page (immediately following the hero intro or as an extraction callout).
- Distinct styling: `border border-paper/15 bg-ink-raised/80 backdrop-blur-sm rounded-[16px] p-6 sm:p-8`.
- Contains a bold label: `What is Brux's [Service Name]?`
- Direct, factual, unhyped copy with exact deliverable numbers and zero fluff.

---

## 8. Cross-Linking & Navigation Architecture

Every service page must cross-link to sibling services to reinforce the topical graph:
- **Services Hub (`/services/`)** links to: `/services/booking/`, `/services/linkedin/`, `/services/content/`, `/services/web-design/`, and `/pricing/`.
- **Booking (`/services/booking/`)** links to: `/services/linkedin/`, `/services/content/`, and `/pricing/`.
- **LinkedIn (`/services/linkedin/`)** links to: `/services/booking/`, `/services/content/`, and `/pricing/`.
- **Content (`/services/content/`)** links to: `/services/web-design/`, `/services/booking/`, and `/pricing/`.
- **Web Design (`/services/web-design/`)** links to: `/services/content/`, `/services/booking/`, and `/pricing/`.

---

## 9. Argon 4 Execution Index

When executing specific page builds, proceed to the corresponding task file:
- `tasks-argon/01-services-hub.md` -> Target: `src/pages/services/index.astro`
- `tasks-argon/02-service-booking.md` -> Target: `src/pages/services/booking.astro`
- `tasks-argon/03-service-linkedin.md` -> Target: `src/pages/services/linkedin.astro`
- `tasks-argon/04-service-content.md` -> Target: `src/pages/services/content.astro`
- `tasks-argon/05-service-web-design.md` -> Target: `src/pages/services/web-design.astro`
