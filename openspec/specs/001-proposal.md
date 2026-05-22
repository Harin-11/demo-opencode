# SDD Proposal — Rutas del Sol Landing Page

**Phase:** proposal
**Date:** 2026-05-19
**Executor:** sdd-proposal
**Change ID:** 001-landing-page
**Status:** Draft

---

## 1. Change Title & Summary

**Title:** Rutas del Sol — Premium Landing Page (Cultural - Artesanal Direction)

**Summary:** Build a single-page premium brand landing page for Rutas del Sol, a receptive tourism agency in the Andean region. The page follows a four-section AIDA narrative arc (Attention → Interest → Desire → Action) using the Cultural - Artesanal design system inspired by Andean textile heritage. The tech stack is Astro 6.3.5 + Tailwind v4 + GSAP 3.15.0 with ScrollTrigger for cinematic scroll choreography. This is the debut deliverable for the "Mi Primera Web" campaign demonstrating that terminal AI agents can design and ship premium client websites.

---

## 2. Motivation

| Driver                        | Detail                                                                                                                                  |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **"Mi Primera Web" campaign** | First client-facing deliverable proving terminal AI agents can produce premium-quality websites matching human agency output            |
| **Client demonstration**      | Rutas del Sol needs an online presence to attract travelers seeking authentic Andean experiences                                        |
| **Design showcase**           | The Cultural - Artesanal direction positions the brand as heritage-rooted, artisanal, and premium — distinct from generic tourism sites |
| **Technical proof point**     | Validate Astro 6 + Tailwind v4 + GSAP 3 integration for cinematic, performance-optimized landing pages                                  |

---

## 3. Requirements

### Functional

| ID   | Requirement                                                                                                                     | Priority |
| ---- | ------------------------------------------------------------------------------------------------------------------------------- | -------- |
| F-01 | Single-page landing with smooth scroll navigation                                                                               | P0       |
| F-02 | Four AIDA sections: Attention (Hero), Interest (Bento Features), Desire (Cinematic Gallery/Storytelling), Action (CTA + Footer) | P0       |
| F-03 | Responsive layout — asymmetric desktop grids collapse to single-column below 768px                                              | P0       |
| F-04 | Floating glass navigation pill with mobile hamburger-to-X morph                                                                 | P0       |
| F-05 | GSAP-powered scroll-triggered animations (fade-up, text reveals, card stacking, image scale)                                    | P0       |
| F-06 | Contact/booking CTA with magnetic hover button-in-button effect                                                                 | P0       |
| F-07 | Social proof / testimonial carousel or stacked cards                                                                            | P1       |
| F-08 | SEO metadata, Open Graph tags, Spanish-language content                                                                         | P1       |
| F-09 | Favicon and browser tab branding                                                                                                | P1       |
| F-10 | Build-time verified (`pnpm run build` passes) with zero errors                                                                  | P0       |

### Non-Functional

| ID    | Requirement                                                                     | Priority |
| ----- | ------------------------------------------------------------------------------- | -------- |
| NF-01 | Lighthouse score ≥ 90 for Performance and Accessibility                         | P1       |
| NF-02 | Full responsive on mobile (320px+), tablet, and desktop                         | P0       |
| NF-03 | GPU-accelerated animations (transform + opacity only)                           | P0       |
| NF-04 | Font loading optimization (preconnect, swap, print-to-all)                      | P1       |
| NF-05 | No external dependencies beyond Astro, Tailwind, GSAP, and Phosphor/Remix icons | P0       |

### Constraints

| ID   | Constraint                                                                                |
| ---- | ----------------------------------------------------------------------------------------- |
| C-01 | Follow DESIGN.md design system exactly — color tokens, typography, component architecture |
| C-02 | Banned patterns must not appear (see DESIGN.md "Banned Patterns" list)                    |
| C-03 | No emojis in code or output                                                               |
| C-04 | Package manager: pnpm only — no npm, npx, or yarn                                         |
| C-05 | All text content in Spanish (client is Argentine receptive tourism)                       |
| C-06 | Review budget: 400 changed lines across the entire implementation                         |

---

## 4. Proposed Sections (AIDA Framework)

### 4.1 Attention — Hero Section

**Role:** Immersive first impression. Cinematic full-screen hero that immediately communicates place, emotion, and uniqueness.

**Content:**

- Ultra-wide heading (max 2-3 lines): e.g., "Descubrí los caminos que cuentan historias" ("Discover the paths that tell stories")
- Subheading (shorter, atmospheric): "Trekking guiados | Experiencias culturales | Itinerarios cortos"
- Primary CTA: "Explorá experiencias" (magnetic button)
- Secondary CTA: "Ver itinerarios" (outline/link variant)
- Full-bleed background image or video still of Andean landscape / textile pattern
- Inka Gold decorative accent (geometric line or motif overlay)
- Floating glass nav pill (detached, centered, backdrop-blur)

**Layout:**

- `min-h-[100dvh]` — never `h-screen`
- Ultra-wide container `max-w-5xl+`
- Asymmetric layout: text left or centered with offset decorative element
- Background image with subtle dark overlay for readability

**Animation:**

- Fade-up + blur entry: hero text, CTAs stagger in (800ms+ per element)
- Background image scale: `scale: 1.0 → 1.05` on scroll exit (scrubbed)
- Nav pill slide-down on page load with mask reveal

### 4.2 Interest — Bento Features Grid

**Role:** Showcase Rutas del Sol's core offerings through a visually rich, asymmetric bento grid that invites exploration.

**Content (3-5 cards):**

| Card                        | Content Type                      | Description                                                                                  |
| --------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------- |
| **Trekking Guiados**        | Image + heading + short text      | Guided treks through ancient paths (e.g., Quebrada de Humahuaca, Cerro de los Siete Colores) |
| **Itinerarios Cortos**      | Image + heading + text            | 1-3 day curated itineraries for travelers short on time                                      |
| **Experiencias Culturales** | Image + decorative pattern + text | Weaving workshops, local markets, culinary immersions                                        |
| **Seguridad y Confianza**   | Icon + heading + text             | Reassurance pillar — bilingual guides, insurance, emergency support                          |
| **Conexión Local**          | Image + quote/text                | Connection with Andean communities, sustainable tourism                                      |

**Layout:**

- Gapless bento grid with `grid-flow-dense`
- Mix of image-dominant, text-dominant, and decorative cards
- Card sizes vary (2-col wide, 2-row tall, etc.)
- Collapses to single-column below 768px

**Animation:**

- Cards stagger-fade-up on scroll into view (IntersectionObserver or ScrollTrigger)
- Each card has `scale-105` hover with `duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`
- Text reveals with word/character opacity scrub

**Component Architecture:**

- Double-bezel card system per DESIGN.md
  - Outer shell: subtle bg, hairline border, `p-1.5`, `rounded-[2rem]`
  - Inner core: distinct bg, inner highlight, `rounded-[calc(2rem-0.375rem)]`

### 4.3 Desire — Cinematic Gallery / Storytelling Section

**Role:** Emotional engagement. Transport the visitor into the experience through visual storytelling, testimonials, and immersive scroll-driven narrative.

**Content:**

- **Image gallery** — full-width, parallax-scrolling landscape/mountain images with text overlays
- **Testimonial cards** — stacked or carousel-style guest quotes with attribution
- **"El Camino" timeline** — a visual narrative of a typical day on a Rutas del Sol trek (morning → afternoon → sunset) with GSAP pinning
- **Statistics/metrics** — e.g., "12+ rutas", "500+ viajeros", "98% satisfacción" — displayed with count-up animation

**Layout:**

- Full-width alternating sections with generous `py-24` to `py-40`
- Text overlays on images with dark gradient for readability
- Testimonials in a stacking card layout (GSAP pin + stack from bottom)
- Metrics row: 3-4 data points in a horizontal row or bento cluster

**Animation:**

- **Card stacking:** GSAP pin + stack from bottom — cards pile up as user scrolls, then reveal next content
- **Image scale:** `scale: 0.8 → 1.0` on enter, darken overlay on exit
- **Text reveals:** word opacity scrub `0.1 → 1.0` sequential
- **Count-up:** metrics animate from 0 to final value on scroll entry
- **Parallax:** foreground/background elements move at different speeds

### 4.4 Action — Massive CTA + Footer

**Role:** Convert. Drive the visitor toward contact, booking, or inquiry with an undeniable, beautifully designed call-to-action.

**Content:**

- Massive heading: e.g., "¿Listo para tu próxima aventura?" ("Ready for your next adventure?")
- Sub-copy: brief emotional nudge about the experience awaiting
- Primary CTA button: "Reservá tu experiencia" (magnetic button-in-button)
- Secondary link: "Contactanos"
- Footer with:
  - Brand name + short tagline
  - Navigation links (Experiencias, Itinerarios, Contacto)
  - Social links (Instagram, WhatsApp — appropriate for Argentine tourism)
  - Contact info: email, phone
  - Copyright / legal disclaimer

**Layout:**

- Full-width or near-full-width section with generous padding
- Centered or asymmetric layout (variance 7 allows offset)
- Footer minimal — hairline separator, small text

**Animation:**

- Massive CTA button with magnetic hover effect (scale + icon diagonal translate)
- Section entry: fade-up from bottom, 800ms
- Footer: simple fade-in, no complex animation (hierarchy of motion)

---

## 5. Content Architecture

### 5.1 Copy Tone & Voice

| Attribute    | Direction                                                                              |
| ------------ | -------------------------------------------------------------------------------------- |
| **Language** | Spanish (Argentine dialect) — informal, warm, inviting                                 |
| **Tone**     | Evocative, poetic, confident — not transactional                                       |
| **Voice**    | "Un amigo que conoce los mejores caminos" — knowledgeable local guide                  |
| **Length**   | Minimal — headlines < 12 words, body < 3 sentences per block                           |
| **Banned**   | Generic travel clichés ("paradise", "dream", "once-in-a-lifetime"), superlative claims |

### 5.2 Content Inventory

| Section      | Element        | Source          | Notes                                     |
| ------------ | -------------- | --------------- | ----------------------------------------- |
| Hero         | Main heading   | Copywrite       | Evocative, place-based                    |
| Hero         | Subheading     | Copywrite       | Tagline-style service list                |
| Hero         | CTAs           | Copywrite       | "Explorá experiencias", "Ver itinerarios" |
| Bento        | Card headings  | Copywrite       | 5 cards, 2-4 words each                   |
| Bento        | Card body text | Copywrite       | 1-2 sentences per card                    |
| Gallery      | Image captions | Copywrite       | Short poetic phrases                      |
| Testimonials | Guest quotes   | Client-provided | Use placeholder if unavailable            |
| Metrics      | Stat values    | Client-provided | Use realistic placeholders                |
| CTA          | Main heading   | Copywrite       | Question or invitation format             |
| CTA          | Sub-copy       | Copywrite       | 1 sentence emotional nudge                |
| Footer       | Links, contact | Client-provided | Placeholder OK for demo                   |
| Footer       | Social links   | Client-provided | WhatsApp, Instagram typical               |

### 5.3 Imagery Requirements

| Type                | Quantity | Style                                                     | Source                        |
| ------------------- | -------- | --------------------------------------------------------- | ----------------------------- |
| Hero background     | 1        | Wide-angle Andean landscape, warm golden hour light       | Stock / client / AI-generated |
| Bento card images   | 3-4      | Trekking, cultural experience, local market, mountains    | Stock / AI-generated          |
| Gallery images      | 3-4      | Cinematic landscapes, close-up textiles, traveler moments | Stock / AI-generated          |
| Decorative patterns | 2-3      | Andean geometric motifs (SVG or CSS)                      | Custom CSS / inline SVG       |
| Favicon             | 1        | Stylized sun/mountain mark                                | Custom SVG                    |

---

## 6. Visual Identity Brief

### 6.1 Brand Essence

Rutas del Sol is not a generic travel agency — it is a **guide**, a **conductor** through the ancestral paths of the Andean region. The visual identity communicates:

| Quality                 | Expression                                                                         |
| ----------------------- | ---------------------------------------------------------------------------------- |
| **Authentic**           | Earth tones, craft textures, imperfect/asymmetric layouts                          |
| **Warm**                | Inka Gold accents, Clay neutrals, golden-hour imagery                              |
| **Safe & Professional** | Clean typography, generous whitespace, confident hierarchy                         |
| **Rooted**              | Andean textile patterns (geometric, stepped diamonds), natural material references |
| **Modern**              | Cinematic motion, glassmorphism, floating navigation                               |

### 6.2 Color Application

| Color                        | Usage                             | Location                                           |
| ---------------------------- | --------------------------------- | -------------------------------------------------- |
| Clay 50 (`#fbf8f4`)          | Page background                   | Every section by default                           |
| Clay 100 (`#f6efe8`)         | Section alt background            | Bento grid, footer alt                             |
| Clay 200 (`#ede2d6`)         | Hairline borders, card separators | Card double-bezel outer, dividers                  |
| Clay 800 (`#4a3829`)         | Body text                         | Paragraphs, nav links                              |
| Clay 950 (`#1a1410`)         | Headings                          | h1-h6, hero headline                               |
| **Inka Gold** (`#d4a017`)    | Primary accent                    | CTAs, highlight underlines, decorative dots        |
| **Inka Red** (`#b83a2a`)     | Secondary accent                  | Decorative lines, pattern elements, hover states   |
| **Inka Purple** (`#6b2fa0`)  | Tertiary accent                   | Geometric pattern fills, ambient background washes |
| **Sierra Green** (`#4a7c59`) | Natural accent                    | Nature callouts, eco/sustainable mentions          |
| **Sky Blue** (`#7ba9c9`)     | Background washes                 | Atmospheric gradient overlays, gallery sections    |

### 6.3 Typography Application

| Font            | Weight   | Use                              | Size Range               |
| --------------- | -------- | -------------------------------- | ------------------------ |
| Cabinet Grotesk | 700, 800 | Display headings (h1, h2)        | `text-5xl` to `text-8xl` |
| Satoshi         | 300      | Light body / captions            | `text-sm` to `text-base` |
| Satoshi         | 400, 500 | Body text, nav, UI               | `text-base` to `text-lg` |
| Satoshi         | 700      | Subheadings, strong emphasis     | `text-lg` to `text-2xl`  |
| JetBrains Mono  | 400      | Metrics / data points (optional) | `text-4xl` to `text-6xl` |

Line limit: max 65 characters per line for body text.

### 6.4 Motion Language

| Moment               | Animation                                 | Duration            | Easing                        |
| -------------------- | ----------------------------------------- | ------------------- | ----------------------------- |
| Page load (hero)     | Fade-up + blur (`translate-y-16 blur-md`) | 800ms+              | Custom cubic-bezier           |
| Scroll reveals       | Fade-up from `translate-y-8`              | 600-800ms           | Custom ease                   |
| Card hover           | `scale-105` with icon diagonal translate  | 700ms               | `cubic-bezier(0.32,0.72,0,1)` |
| Button hover         | Magnetic scale `1.02`                     | 300ms               | Smooth ease-out               |
| Button press         | `scale-[0.98]`                            | 150ms               | Instant squash                |
| Image scale on enter | `scale: 0.8 → 1.0`                        | Scrubbed            | GSAP ScrollTrigger            |
| Text reveal          | Word opacity `0.1 → 1.0`                  | Sequential per word | Custom scrub                  |
| Card stacking        | GSAP pin + stack from bottom              | Per scroll          | Smooth                        |

---

## 7. Technical Approach

### 7.1 Architecture

```
src/
├── layouts/
│   └── Layout.astro          # Existing — extends with GSAP/Script deps
├── pages/
│   └── index.astro            # Single entry point — orchestrates sections
├── components/
│   ├── Nav.astro              # Floating glass pill nav
│   ├── Hero.astro             # AIDA: Attention
│   ├── Features.astro         # AIDA: Interest — bento grid
│   ├── Gallery.astro          # AIDA: Desire — cinematic + testimonials
│   ├── CtaSection.astro       # AIDA: Action — massive CTA
│   ├── Footer.astro           # Footer with links and info
│   ├── MagneticButton.astro   # Reusable button-in-button CTA
│   └── TestimonialCard.astro  # Reusable testimonial card
├── scripts/
│   ├── anim-hero.js           # GSAP hero entrance
│   ├── anim-features.js       # GSAP bento scroll reveals
│   ├── anim-gallery.js        # GSAP gallery pin + stack + parallax
│   └── anim-metrics.js        # GSAP count-up
├── styles/
│   └── global.css             # Existing — design tokens kept here
└── assets/
    └── images/                # Image assets (hero, bento cards, gallery)
```

### 7.2 Astro Islands Strategy

| Component        | Client Directive      | Rationale                         |
| ---------------- | --------------------- | --------------------------------- |
| Nav              | `client:load`         | Always interactive for navigation                    |
| Hero             | `client:load`         | Framer Motion entrance on first paint               |
| Features (Bento) | `client:load`         | Animations on scroll reveal via `useInView`         |
| Gallery          | `client:load`         | Scroll animations via `useScroll` + `useTransform`  |
| CTA Section      | `client:load`         | Magnetic button effect + metrics count-up           |
| Footer           | Static (no directive) | No client JS needed               |

Use `client:visible` as default interactive directive — components hydrate when close to viewport, preserving initial load performance.

### 7.3 GSAP Integration

- **Package:** `gsap` 3.15.0 (already in dependencies)
- **ScrollTrigger plugin:** bundled with GSAP core for scroll-based animations
- **Animation scripts:** co-located in `src/scripts/` as separate JS modules imported via `<script>` tags in Astro components (not inlined to keep templates clean)
- **GPU safety:** All GSAP animations use `transform` and `opacity` only — no `top`, `left`, `width`, `height` per DESIGN.md
- **Blur constraint:** `blur` only on fixed/sticky elements (nav, overlays)
- **Z-Index discipline:** nav 50, modal 60, overlay 70, tooltip 80

### 7.4 Responsive Strategy

| Breakpoint                  | Behavior                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| **>= 1024px (desktop)**     | Asymmetric bento grids, multi-column layouts, full cinematic hero                          |
| **768px - 1023px (tablet)** | Compressed grids, 2-column bento, smaller hero text                                        |
| **< 768px (mobile)**        | All asymmetric layouts collapse to `w-full` single-column, hamburger nav, stacked sections |
| **< 360px (small mobile)**  | Tighter padding (`px-4`), smaller headings, buttons full-width                             |

### 7.5 Performance Considerations

- Preconnect + preload for Fontshare fonts (already in Layout.astro)
- Images: proper `width`/`height` attributes, `loading="lazy"` for below-fold, `fetchpriority="high"` for hero
- Framer Motion: `useScroll` with `useTransform` for scrubbed parallax effects
- No layout thrashing — batch DOM reads before writes
- Minimal JS payload: only interactive components get client directives

---

## 8. Non-Goals / Out of Scope

| Item                                  | Rationale                                            |
| ------------------------------------- | ---------------------------------------------------- |
| Multi-page site                       | Single landing page is the scope of "Mi Primera Web" |
| CMS integration                       | No headless CMS or dynamic content management        |
| Booking/payment system                | Out of scope — CTA links to contact/inquiry form     |
| Multi-language support                | Spanish-only for initial launch                      |
| User authentication                   | Not applicable for a landing page                    |
| Blog or news section                  | Future phase if client expands scope                 |
| Analytics integration                 | Can be added post-launch; out of initial spec        |
| Server-side rendering of dynamic data | All content is static/markdown                       |
| Dark mode toggle                      | Not in design system, not requested                  |
| E2E tests                             | Build verification suffices for this phase           |
| Image optimization pipeline           | Manual optimization; no sharp/imaging pipeline       |

---

## 9. Risks

| Risk                                          | Impact                                                | Probability | Mitigation                                                                                            |
| --------------------------------------------- | ----------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| **No client copy/images provided**            | Proposal content will use placeholders                | Medium      | Use realistic placeholder copy; note "requires client approval" for copy                              |
| **GSAP premium features assumed**             | Some features may need license                        | Low         | Core GSAP + ScrollTrigger is free; avoid Club GreenSock plugins                                       |
| **Tailwind v4 breaking changes**              | Config syntax may differ from v3                      | Low         | Already using v4 (`@tailwindcss/vite` plugin, `@theme` directive); stay within documented v4 patterns |
| **Astro 6 island hydration overhead**         | Too many `client:load` directives could bloat JS      | Medium      | Use `client:visible` as default; audit bundle before build                                            |
| **Font loading flash (FOUT)**                 | Text may flash unstyled                               | Medium      | Preconnect + preload + `font-display: swap` already configured                                        |
| **ScrollTrigger conflicts with mobile touch** | Animations may jank on iOS Safari                     | Medium      | Test on real devices; use `ScrollTrigger.normalizeScroll(true)` for mobile                            |
| **Build fails after implementation**          | CI/CD block                                           | Low         | Run `pnpm run build` after every significant edit; fix immediately                                    |
| **Hover effects don't work on touch**         | Magnetic button, card scale won't translate on mobile | Low         | Feature detection: use `@media (hover: hover)` for hover-only effects                                 |
| **Image licensing unclear**                   | AI-generated or stock images may need attribution     | Medium      | Use royalty-free stock or note source; avoid identifiable people without release                      |
| **Review budget (400 lines) exceeded**        | CI pipeline may block PR                              | Medium      | Plan lean component structure; extract common patterns to avoid duplication                           |

---

## 10. Delivery Forecast

| Phase               | Estimated Output                            | Dependencies            |
| ------------------- | ------------------------------------------- | ----------------------- |
| **Proposal** (this) | ~25KB spec                                  | None — ready for review |
| **Specification**   | Detailed content + animation specs          | Proposal approval       |
| **Design**          | Component wireframes, animation storyboards | Spec approval           |
| **Tasks**           | 15-30 implementation tasks                  | Design approval         |
| **Apply**           | ~350-400 lines of Astro + JS edits          | Task approval           |
| **Verify**          | Build check + review pass                   | Apply completion        |

---

## Phase Envelope

```
---
phase: proposal
change_id: 001-landing-page
status: draft
date: 2026-05-19
executor: sdd-proposal
artifacts:
  - openspec/specs/001-proposal.md
next_phase: spec
approval_needed: true
risk_score: medium
estimated_tasks: 20-25
estimated_lines: 350-400
---
```
