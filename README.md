# Brux Website

Marketing website for **Brux** ([brux.site](https://www.brux.site)) — a zero-commission speaker booking agency and LinkedIn management partner for keynote speakers.

Built with **Astro**, **Tailwind CSS v4**, and **GSAP**, and deployed as static assets on **Cloudflare Workers**.

---

## Tech Stack

- **Framework:** [Astro](https://astro.build) (`^7.4.12`) with static output (`format: 'file'`, `trailingSlash: 'never'`), inline stylesheets, and `ClientRouter` view transitions
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/vite`) with custom semantic theme tokens in [`src/styles/global.css`](src/styles/global.css) and self-hosted Archivo variable fonts
- **Motion:** [GSAP](https://gsap.com) (`ScrollTrigger` + `SplitText`) with `prefers-reduced-motion` support and deferred section initialization
- **Icons:** [Lucide](https://lucide.dev) (`lucide`, `@lucide/astro`) and [Morphicons](https://github.com/amorriscode/morphicons)
- **SEO & AI Discovery:** `@astrojs/sitemap`, per-page JSON-LD structured data (`Organization`, `WebSite`, `Service`, `BreadcrumbList`, `AboutPage`), [`public/robots.txt`](public/robots.txt), [`public/llms.txt`](public/llms.txt), and [`public/pricing.md`](public/pricing.md)
- **Analytics & Consent:** Google Analytics 4 with Consent Mode v2 in [`src/components/CookieConsent.astro`](src/components/CookieConsent.astro) (only rendered when `PUBLIC_GA_MEASUREMENT_ID` is configured)
- **Hosting:** [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) via [`wrangler.jsonc`](wrangler.jsonc)

---

## Pages & Routes

| Route | Source | Description |
| :--- | :--- | :--- |
| `/` | `src/pages/index.astro` | Homepage (curtain hero, booking process, services, testimonials, work, pricing teaser, team, FAQ) |
| `/services` | `src/pages/services/index.astro` | Services overview hub |
| `/services/booking` | `src/pages/services/booking.astro` | Monthly speaker outreach & booking service |
| `/services/linkedin` | `src/pages/services/linkedin.astro` | Executive LinkedIn positioning & management |
| `/services/content` | `src/pages/services/content.astro` | Demo reels, press kits, and edited talk clips |
| `/services/web-design` | `src/pages/services/web-design.astro` | Custom speaker websites |
| `/pricing` | `src/pages/pricing.astro` | Monthly plans, comparison matrix, deliverables, website add-on, and FAQ |
| `/about` | `src/pages/about.astro` | Agency story, zero-commission model comparison, and leadership team |
| `/blog` | `src/pages/blog/index.astro` | Articles index |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` | Individual blog post pages |
| `/404` | `src/pages/404.astro` | Custom 404 stage page |

---

## Project Structure

```text
├── public/
│   ├── videos/             # Stage/curtain, process, service, and client reel videos + WebP posters
│   ├── _headers            # Cloudflare caching & security headers
│   ├── _redirects          # 301 redirects for legacy URLs
│   ├── llms.txt            # Machine-readable site summary for AI crawlers
│   ├── pricing.md          # Machine-readable pricing breakdown
│   ├── robots.txt          # Crawler rules & sitemap pointer
│   ├── og-image.png
│   └── favicon.ico
├── src/
│   ├── assets/             # Optimized images (team, testimonials, work, blog, brand) & Archivo fonts
│   ├── components/
│   │   ├── about/          # About page hero stage
│   │   ├── home/           # Homepage sections
│   │   ├── pricing/        # Pricing page sections
│   │   ├── services/       # Service page hero stages
│   │   ├── ui/             # Reusable buttons and CTA blocks
│   │   ├── CookieConsent.astro
│   │   ├── MainFooter.astro
│   │   ├── MainHead.astro
│   │   ├── MainHero.astro
│   │   ├── Nav.astro
│   │   └── NotFoundStage.astro
│   ├── content/
│   │   ├── blog/           # Markdown blog posts
│   │   └── testimonials/   # Markdown client testimonials (+ _plantilla.md template)
│   ├── data/
│   │   ├── pricing.ts      # Typed pricing tiers, comparison matrix, deliverables, FAQs
│   │   └── site.ts         # Shared navigation, services summary, plan summary, booking URL
│   ├── layouts/
│   │   └── MainLayout.astro
│   ├── lib/
│   │   ├── defer-section.ts
│   │   └── gsap-sections.ts
│   ├── pages/              # File-based Astro routes
│   ├── styles/
│   │   └── global.css      # Tailwind v4 @theme tokens & base styles
│   └── content.config.ts   # Zod schemas for blog & testimonials collections
├── .env.example
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── wrangler.jsonc
```

---

## Getting Started

### Prerequisites

- **Node.js** `>= 22.23.4`
- **pnpm**

### Installation

```sh
pnpm install
```

### Environment Variables

Copy `.env.example` to `.env` if you want to enable Google Analytics 4:

```sh
cp .env.example .env
```

| Variable | Required | Description |
| :--- | :--- | :--- |
| `PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics 4 Measurement ID (e.g. `G-ABC123DEF4`). When unset, GA4 and the cookie consent banner are disabled. |

### Commands

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Start local development server at `http://localhost:4321` |
| `pnpm build` | Build production static site to `./dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm astro check` | Run Astro and TypeScript diagnostics |

---

## Content & Data Management

- **Testimonials:** Add a `.md` file in `src/content/testimonials/` following [`src/content/testimonials/_plantilla.md`](src/content/testimonials/_plantilla.md) and the schema in [`src/content.config.ts`](src/content.config.ts). Files prefixed with `_` are ignored by the build.
- **Blog Posts:** Add `.md` files in `src/content/blog/`. The filename becomes the URL slug under `/blog/<slug>`. Set `draft: true` to hide unpublished posts.
- **Pricing & Site Data:** Shared booking link, service summaries, and pricing tables are centralized in [`src/data/site.ts`](src/data/site.ts) and [`src/data/pricing.ts`](src/data/pricing.ts).

---

## Deployment

The site builds to `./dist/` and is configured for **Cloudflare Workers Static Assets** in [`wrangler.jsonc`](wrangler.jsonc):

- `not_found_handling: "404-page"` serves the custom `/404` page.
- `html_handling: "drop-trailing-slash"` matches Astro's `trailingSlash: 'never'` and `build.format: 'file'`.
- [`public/_headers`](public/_headers) sets long-lived cache headers for `/_astro/*` and `/videos/*` plus security headers.
- [`public/_redirects`](public/_redirects) handles 301 redirects from legacy URLs.

To deploy with Wrangler after building:

```sh
pnpm build
npx wrangler deploy
```
