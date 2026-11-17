# Team Registry & Placeholder Specifications

**Document Version**: 1.0.0  
**Associated Milestone**: Milestone 2 (M2 — Navigation, Footer, and Meet the Team Section)  
**Target Component**: `src/components/home/MeetTheTeam.astro` (`id="about"`)  
**Target Page**: `src/pages/index.astro` (Slot 7, between `<PricingTeaser />` and `<Faq />`)  
**Date**: November 2026  

---

## 1. Executive Summary

This document serves as the formal registry of real and placeholder details implemented in the "Meet the Team" section of the Brux website. 

The section is designed to introduce the key individuals who operate the backstage infrastructure for keynote speakers. To establish full credibility with event organizers and prospective speakers, the section presents three functional domains:
1. **Web & Creative / Digital Infrastructure** (Jhon Cordero — Real Co-Founder)
2. **Outreach & Speaker Strategy** (Everth Ferrer — Real Co-Founder)
3. **Operations & Speaker Relations** (Maria — Provisional Placeholder Persona)

Because high-resolution founder photography was not available in the repository at the time of implementation, the component utilizes stylized SVG monogram avatar blocks (`JC`, `EF`, `ML`) paired with functional Lucide badge icons (`Layout`, `Mic`, `CalendarCheck`). The component is architected to seamlessly transition to real photographs whenever image assets are added to `src/assets/team/`.

---

## 2. Team Member Registry

### 2.1 Jhon Cordero — Co-Founder & Head of Web & Creative

| Attribute | Specification | Status |
| :--- | :--- | :--- |
| **Full Name** | Jhon Cordero | **Confirmed** (Co-Founder) |
| **Display Role** | Co-Founder, Head of Web & Creative | **Provisional** (Pending founder sign-off) |
| **Functional Domain** | Digital Infrastructure & Creative Assets | **Provisional** |
| **Avatar Initials** | `JC` | **Active** (SVG typographic monogram) |
| **Badge Icon** | `Layout` (Lucide) | **Active** (Signifies speaker websites and digital platforms) |
| **Display Bio** | *"Designs high-converting speaker websites, edits talk demo reels and keynote clips, and crafts the press kits and branding that establish immediate authority with event producers."* | **Provisional** (Modeled from project requirements) |
| **Focus Areas** | Speaker websites, Video editing, Keynote reels, Branding | **Active** |
| **Internal Email** | `jhon@brux.agency` | **Documented in project specs** |
| **Photo Status** | None on disk (`src/assets/team/` pending upload) | **Pending** |

---

### 2.2 Everth Ferrer — Co-Founder & Head of Outreach & Strategy

| Attribute | Specification | Status |
| :--- | :--- | :--- |
| **Full Name** | Everth Ferrer | **Confirmed** (Co-Founder) |
| **Display Role** | Co-Founder, Head of Outreach & Strategy | **Provisional** (Pending founder sign-off) |
| **Functional Domain** | Outreach, Positioning & Event Relations | **Provisional** |
| **Avatar Initials** | `EF` | **Active** (SVG typographic monogram) |
| **Badge Icon** | `Mic` (Lucide) | **Active** (Signifies keynote stages and speaker pitching) |
| **Display Bio** | *"Leads direct pitching to conference organizers in your specific niche, positions your profile on LinkedIn to build authority, and builds relationships with decision-makers."* | **Provisional** (Modeled from project requirements) |
| **Focus Areas** | Direct pitching, LinkedIn positioning, Conference relations, Niche targeting | **Active** |
| **Internal Email** | `everth@brux.agency` | **Documented in project specs** |
| **Photo Status** | None on disk (`src/assets/team/` pending upload) | **Pending** |

---

### 2.3 Maria — Head of Operations & Speaker Relations (Placeholder)

| Attribute | Specification | Status |
| :--- | :--- | :--- |
| **Full Name** | Maria (Surname TBD / Placeholder) | **PLACEHOLDER** |
| **Display Role** | Head of Operations & Speaker Relations | **PLACEHOLDER** |
| **Functional Domain** | Operations, CRM Pipeline & Client Success | **PLACEHOLDER** |
| **Avatar Initials** | `ML` | **Active** (SVG typographic monogram) |
| **Badge Icon** | `CalendarCheck` (Lucide) | **Active** (Signifies CRM tracking, calendars, and contracts) |
| **Display Bio** | *"Manages the speaker CRM pipeline, tracks every organizer touchpoint, and coordinates calendars, prep calls, and speaking agreements so nothing slips through the cracks."* | **PLACEHOLDER** |
| **Focus Areas** | CRM pipeline tracking, Organizer follow-ups, Calendar & contracts, Post-event review | **PLACEHOLDER** |
| **Internal Email** | Not provisioned | **Pending** |
| **Photo Status** | Placeholder monogram | **Pending** |

#### Why Maria Was Created (Placeholder Rationale)
In accordance with the project specification (`ORIGINAL_REQUEST.md` § R2), a third team member was required to highlight the operational backbone of Brux. In agency operations, event organizers and keynote speakers expect a dedicated point of contact who manages CRM follow-ups, contract execution, calendar coordination, and post-event logistics. The persona of "Maria" was established with the role "Head of Operations & Speaker Relations" to demonstrate this end-to-end service offering.

---

## 3. Visual Styling & Photography Migration Guide

### 3.1 Current Visual Styling
- **Background**: `--color-ink` (`#0A0A0A`), matching the backstage theme and easing the visual transition between `<PricingTeaser />` (`bg-paper`) and `<Faq />` (`bg-ink`).
- **Cards**: `--color-ink-raised` (`#161616`) with `border border-paper/10`.
- **Avatars**: `size-16 sm:size-18` containers in `bg-paper/5 border border-paper/10` with high-contrast typographic monograms (`text-paper`).
- **Badge Icons**: Positioned at `-bottom-1.5 -right-1.5` in a dark chip (`bg-ink border border-paper/15 text-stage-glow`).
- **Typography & Motion**: Word-by-word kinetic text reveals masked with `expo.out` easing, and staggered cards sliding up on scroll entrance via GSAP + ScrollTrigger, fully compliant with Bang Motion standards.

### 3.2 How to Add Real Photographs
To replace the typographic monogram avatars with real founder photographs:
1. Place square portrait photographs (recommended 800×800px or 1000×1000px in `.webp` or `.jpg` format, compressed under 150KB) in `src/assets/team/`:
   - `src/assets/team/jhon-cordero.webp`
   - `src/assets/team/everth-ferrer.webp`
   - `src/assets/team/maria.webp`
2. In `src/components/home/MeetTheTeam.astro`:
   ```astro
   import jhonPhoto from "../../assets/team/jhon-cordero.webp";
   import everthPhoto from "../../assets/team/everth-ferrer.webp";
   // import mariaPhoto from "../../assets/team/maria.webp";
   ```
3. Assign the imported image object to the `photo` field in the `team` array:
   ```typescript
   {
     name: "Jhon Cordero",
     photo: jhonPhoto.src,
     ...
   }
   ```
4. The template will automatically render the photographic image while preserving the Lucide badge icon and hover animations.

---

## 4. Founder Review Checklist

Please review the following items before general public deployment:

- [ ] **Co-Founder Titles**: Confirm whether *"Co-Founder, Head of Web & Creative"* and *"Co-Founder, Head of Outreach & Strategy"* accurately reflect the desired public corporate titles for Jhon Cordero and Everth Ferrer.
- [ ] **Founder Bios**: Review the copy in lines 19–35 of `src/components/home/MeetTheTeam.astro` to ensure it reflects your authentic voice and accomplishments.
- [ ] **Resolution of Maria's Placeholder**:
  - **Option 1**: Replace "Maria" with the actual full name, title, and bio of Brux's operations lead / account manager.
  - **Option 2**: Retain "Maria" as the provisional client success representative until a permanent team member is appointed.
  - **Option 3**: Temporarily remove the third card if the founders prefer to present only the two co-founders during the early launch phase.
- [ ] **Headshots / Photography**: Provide official professional headshots to replace the monogram avatars.
- [ ] **Social Links**: Decide whether to add LinkedIn icon links to the team cards (e.g. Everth's LinkedIn profile for speaker outreach credibility).
