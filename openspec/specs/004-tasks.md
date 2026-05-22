# Implementation Tasks — Rutas del Sol Landing Page

**Phase:** tasks
**Change ID:** 001-landing-page
**Date:** 2026-05-19
**Executor:** sdd-tasks
**Status:** Draft
**Predecessor:** 003-design.md (approved)

---

## Review Workload Forecast

| Field                   | Value                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| Estimated changed lines | ~950-1050 (gross new), ~875-975 (net after deletion)                                              |
| 400-line budget risk    | **High**                                                                                          |
| Chained PRs recommended | **Yes**                                                                                           |
| Suggested split         | PR 1 (Foundation + Nav + Hero) → PR 2 (Features + Gallery + CTA + Footer) → PR 3 (Polish + Audit) |
| Delivery strategy       | auto-chain                                                                                        |
| Chain strategy          | stacked-to-main                                                                                   |

```text
Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High
```

### Forecast Rationale

The design specifies **18 changed files** (15 new, 2 modified, 1 deleted). Even with aggressive Tailwind utility use and shared utilities, the component count (8 Astro components + 6 animation scripts) pushes the gross line count well past 400. The spec itself estimates ~700 cumulative lines. Adding favicon + content data + types pushes closer to ~950-1050.

**Split strategy:** Three stacked PRs with clear review boundaries. Each PR builds on the previous and produces a runnable build.

| PR       | Focus                                                 | Est. Net Lines | Buildable                                               | Reviewable                          |
| -------- | ----------------------------------------------------- | -------------- | ------------------------------------------------------- | ----------------------------------- |
| **PR 1** | Foundation + Nav + Hero + Leaf Components             | ~230           | Yes (Hero + Nav render, no animations needed for build) | Self-contained data + upper section |
| **PR 2** | Features + Gallery + CTA + Footer + Animation Scripts | ~310           | Yes (full page renders with all animations)             | All sections wired                  |
| **PR 3** | Polish + Responsive + A11y + Lighthouse               | ~50            | Yes (final touches)                                     | Minor diffs only                    |

---

## Task Groups

### Notation

- **→** = new file
- **✏️** = modify existing file
- **🗑️** = delete file

---

## Group A: Foundation (PR 1 — tasks 1-5)

These tasks have zero dependencies on other tasks and can be executed in parallel or sequence. They establish the data layer, shared utilities, and page shell.

---

### Task A1: Create `src/data/types.ts`

**Files:** → `src/data/types.ts`

**Description:** Single source of truth for all TypeScript interfaces used across components. Every component imports types from here. No inline type definitions elsewhere (except Astro `interface Props` which aliases these types).

**Interfaces to define:**

- `NavLink` — `{ label: string; href: string }`
- `CTA` — `{ label: string; href: string }`
- `FeatureCard` — `{ id, title, description, variant, image?, icon?, patternSvg?, size? }`
- `GalleryImage` — `{ src, alt, width, height, caption?, captionPosition? }`
- `Testimonial` — `{ quote, author, location?, avatar? }`
- `Metric` — `{ value: number; suffix?: string; label: string }`
- `MagneticButtonProps` — `{ label, href, variant, icon?, size?, className? }`
- `SocialLink` — `{ platform: string; href: string; icon: string }`
- `ContactInfo` — `{ email?: string; phone?: string }`

**Acceptance criteria:**

- All interfaces are exported
- No inline type definitions required in downstream components (besides Props alias)
- File compiles with `pnpm run build` (types checked)

**Estimated lines:** 40
**Dependencies:** None

---

### Task A2: Create `src/data/content.ts`

**Files:** → `src/data/content.ts`

**Description:** Centralized data file exporting typed constants for every section. Single source of truth for all copy, image paths, links, and configuration. All content matches spec §4 exactly.

**Exports:**

- `SITE` — title, description, url, locale, brandName, tagline
- `NAV_LINKS` — NavLink[] (3 items: Experiencias, Itinerarios, Contacto)
- `HERO` — heading, subheading, primaryCta, secondaryCta, bgImage, bgImageAlt
- `FEATURES_CARDS` — FeatureCard[] (5 cards matching spec §4.2)
- `GALLERY_IMAGES` — GalleryImage[] (4 images with captions from spec §4.3)
- `TESTIMONIALS` — Testimonial[] (placeholder structure)
- `METRICS` — Metric[] (12 rutas, 500+ viajeros, 98% satisfacción, 7 años)
- `CTA_SECTION` — heading, subCopy, primaryCta, secondaryCta
- `FOOTER` — brandName, tagline, navLinks, socialLinks, contact, copyright

**Image paths:** Use picsum.photos placeholder URLs exactly as specified in design §3.2 and spec §8.

**Acceptance criteria:**

- All exports are typed (uses interfaces from types.ts)
- All copy matches spec §4 exactly (Spanish, voseo, exact wording)
- Image src values use picsum.photos with deterministic seeds
- File compiles without errors

**Estimated lines:** 100
**Dependencies:** Task A1

---

### Task A3: (Superseded) Animation Utility Module

No separate animation utility is needed. All animations are handled inline via **Framer Motion** within each React component.

**Patterns used across components:**

- `motion.div` with `initial`/`animate`/`exit` for entrance and exit animations
- `useInView` with `once: true` for one-shot scroll-triggered reveals
- `useScroll` + `useTransform` for scrubbed parallax and scale effects
- `AnimatePresence` for modal, menu, and testimonial transitions
- `whileInView` for declarative scroll-triggered animations

**Acceptance criteria:**

- No `gsap` or `ScrollTrigger` references needed in any file
- All animations use only `transform` and `opacity` (GPU-safe)
- Component animations respect `prefers-reduced-motion`

**Estimated lines:** 0 (no new file needed)
**Dependencies:** None (framer-motion already in package.json)

---

### Task A4: Update `src/layouts/Layout.astro` for SEO

**Files:** ✏️ `src/layouts/Layout.astro`

**Description:** Extend the existing Layout to accept and render additional SEO props. The Layout already has title/description and OpenGraph tags — needs og:locale added.

**Changes:**

- Add `og:locale` meta tag with value `es_AR`
- Ensure `lang="es"` is present on `<html>` (already is)
- (Optional) Add `theme-color` meta tag using `--color-clay-950`
- Ensure Props interface has all relevant fields

**No changes to:** font loading (already correct), style imports, slot.

**Acceptance criteria:**

- `og:locale` meta tag renders in `<head>` as `es_AR`
- Existing title/description/OG tags remain functional
- Build passes

**Estimated lines:** 5-8 modified
**Dependencies:** None

---

### Task A5: Replace Favicon with Rutas del Sol Sun/Mountain Mark

**Files:** → `public/favicon.svg`, → `public/favicon.ico`

**Description:** Replace the default Astro favicon with a custom sun/mountain SVG mark per spec §8.5. Design: stylized half-sun (Inka Gold) above a triangular mountain (Clay 950), referencing Andean iconography.

**Guidelines:**

- `favicon.svg` — clean SVG, viewBox ~32x32 or 128x128, proper `<title>` for accessibility
- `favicon.ico` — 32x32 fallback (optional, can skip if SVG browser support is sufficient)
- Both files placed in `public/` (Astro static file serving)

**Acceptance criteria:**

- `favicon.svg` renders in browser tab
- Mark is clearly a sun + mountain motif in Inka Gold + Clay tones
- No JavaScript, no external dependencies

**Estimated lines:** ~20 (SVG)
**Dependencies:** None

---

## Group B: Leaf Components (PR 1 — tasks 6-7)

Small, reusable components with no section-specific logic. Used by multiple parent sections.

---

### Task B1: Create `src/components/MagneticButton.astro`

**Files:** → `src/components/MagneticButton.astro`

**Description:** Reusable magnetic button-in-button CTA component. Outer pill-shaped button with nested icon circle that translates diagonally on hover.

**Props (from types.ts):**

```typescript
interface Props {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "outline";
  icon?: string;
  size?: "default" | "large";
  className?: string;
}
```

**Variants:**

- **primary:** Inka Gold background, Clay 950 text
- **secondary:** Transparent bg, Inka Gold text, hairline border
- **outline:** Transparent bg, Clay 800 text, Clay 300 border

**Structure:**

- Outer `<a>` tag with `rounded-full`, `group`, inline `position: relative`
- Inner `<span>` for icon circle with `data-magnetic-icon` attribute (positioned `absolute`, offset to right)
- Text label before the icon span

**Hover behavior (inline `<script>`):**

- On mouseenter: scale outer to 1.02 (300ms, power2.out), translate icon diagonally (6px, -6px)
- On mousedown: scale to 0.98 (150ms)
- On mouseup/mouseleave: reset
- Gate hover effects with `matchMedia('(hover: hover)').matches` — skip on touch devices
- Use `data-magnetic-icon` selector for icon element

**Accessibility:**

- `<a>` with proper `href`
- `aria-label` if icon is present (screenreader reads "label, icon-name")
- Minimum 44px touch target

**Acceptance criteria:**

- All four variants render correctly
- Hover magnetic effect works on desktop (scale + icon translate)
- Touch devices show no hover artifacts
- Button is a proper anchor tag — opens href on click
- Build passes

**Estimated lines:** 45
**Dependencies:** Task A1 (types)

---

### Task B2: Create `src/components/TestimonialCard.astro`

**Files:** → `src/components/TestimonialCard.astro`

**Description:** Reusable testimonial card component used inside Gallery's pin-stack system. Double-bezel card per design system (C-11).

**Props:**

```typescript
interface Props {
  quote: string;
  author: string;
  location?: string;
  avatar?: string;
  className?: string;
}
```

**Structure:**

- Outer shell: `p-1.5`, `rounded-[2rem]`, hairline border
- Inner core: distinct bg, `rounded-[calc(2rem-0.375rem)]`, padding
- Large opening quotation mark (Inka Gold) decorative element
- Quote text (Satoshi 400/500)
- Author attribution line with optional avatar

**Data attributes:** `data-testimonial-card` on the outer shell (for GSAP targeting)

**Acceptance criteria:**

- Double-bezel system applied correctly
- Quote renders with decorative quotation mark
- Author and location render below quote
- Avatar renders as small circle if provided
- Build passes

**Estimated lines:** 30
**Dependencies:** Task A1 (types)

---

## Group C: Nav Section (PR 1 — tasks 8-9)

---

### Task C1: Create `src/scripts/anim-nav.js`

**Files:** → `src/scripts/anim-nav.js`

**Description:** Nav entrance animation + hamburger morph + active section tracking.

**Exports:**

- `initNavEntrance(navEl)` — slide-down entrance on page load: `fromTo({ y: '-100%', opacity: 0, clipPath: 'inset(0 0 100% 0)' })` → visible. Duration: 500ms, ease: power3.out, delay: 1.2s. Shorter duration and no clipPath if REDUCED_MOTION.
- `initHamburger(buttonEl, overlayEl, links)` — hamburger → X morph with staggered overlay reveal. Three `<span>` bars morph: first rotates to X top, middle disappears (opacity 0), last rotates to X bottom. Overlay uses `clipPath: circle()` animation. Links stagger in at 0.1s intervals.
- `initActiveSection(navEl, sectionIds)` — lightweight IntersectionObserver (not ScrollTrigger) that highlights `data-nav-link` when its section is in view. Threshold 0.3, rootMargin '-80px 0px 0px 0px'.

**GSAP usage:** `gsap.fromTo`, `gsap.to` — only transform/opacity/clipPath. No layout properties.

**Acceptance criteria:**

- Nav slides down with clipPath reveal on page load
- Hamburger morphs to X on click with staggered menu overlay
- Links in overlay stagger-in
- Active section highlights as user scrolls
- Reduced motion: shorter durations, no clipPath
- Build passes

**Estimated lines:** 55
**Dependencies:** Task A3 (anim-utils)

---

### Task C2: Create `src/components/Nav.astro`

**Files:** → `src/components/Nav.astro`

**Description:** Floating glass pill navigation, `client:load` directive. Fixed position, centered horizontally, detached from edges, backdrop-blur. Desktop: horizontal links. Mobile (<768px): hamburger → overlay menu.

**Props:**

```typescript
interface Props {
  links: NavLink[];
  brandName?: string;
}
```

**Desktop structure:**

- `<nav>` fixed top-4 left-1/2 -translate-x-1/2, rounded-full, backdrop-blur-xl, bg-clay-950/80, z-index 50
- Brand (Rutas del Sol) on left
- Horizontal nav links with hover underline animation
- `data-nav-link` on each anchor

**Mobile structure (<768px):**

- Same floating pill but shows hamburger button (three stacked `<span>` bars)
- Full-screen overlay: fixed inset-0, bg-clay-950/95, backdrop-blur-xl
- Vertical links with larger tap targets
- `data-mobile-menu` on overlay div

**Script section:**

- Imports gsap + ScrollTrigger + anim-nav.js
- Calls `initNavEntrance`, `initHamburger`, `initActiveSection` on mount
- `client:load` directive

**Acceptance criteria:**

- Nav is a floating glass pill centered at top of page
- Desktop: horizontal links visible, hover underline effect
- Mobile (<768px): hamburger icon visible
- Hamburger morphs to X with overlay animation on tap
- Active section link highlights during scroll
- Smooth scroll on link click (scroll-behavior: smooth already in global.css)
- Build passes

**Estimated lines:** 75
**Dependencies:** Task A1 (types), Task A2 (content), Task C1 (anim-nav)

---

## Group D: Hero Section (PR 1 — tasks 10-11)

---

### Task D1: Create `src/scripts/anim-hero.js`

**Files:** → `src/scripts/anim-hero.js`

**Description:** Hero entrance timeline + background scrub on scroll exit.

**Exports:**

- `initHeroAnimations(containerEl)` — timeline with 5 steps:
  1. `[data-hero-accent]` — opacity 0→1, scale 0.8→1, 600ms, +100ms delay
  2. `[data-hero-heading]` — y 64→0, opacity 0→1, blur 8px→0, 800ms, +200ms
  3. `[data-hero-subheading]` — y 32→0, opacity 0→1, 700ms, +500ms
  4. `[data-hero-cta-primary]` — y 24→0, opacity 0→1, 600ms, +750ms
  5. `[data-hero-cta-secondary]` — y 24→0, opacity 0→1, 600ms, +900ms
- `initHeroScrub(containerEl)` — scroll exit effects:
  - Background `[data-hero-bg]`: scale 1→1.05 scrubbed from top to next section
  - Content `[data-hero-content]`: opacity 1→0.6, y 0→-40 on last 30% of exit
  - Skip entirely if REDUCED_MOTION

**Easing:** power3.out for entrance, `none` (linear) for scrub

**Reduced motion:** Skip blur on H1, skip all scrub animations, keep entrance but shorter durations.

**Acceptance criteria:**

- Hero entrances fire sequentially on mount (or immediately for above-fold)
- Background scales from 1.0 to 1.05 on scroll exit
- Content fades and lifts on exit
- Reduced motion: blur disabled, scrub disabled
- All selectors use data-\* attributes, no CSS class coupling
- Build passes

**Estimated lines:** 50
**Dependencies:** Task A3 (anim-utils)

---

### Task D2: Create `src/components/Hero.astro`

**Files:** → `src/components/Hero.astro`

**Description:** AIDA Attention section — full-viewport hero with background image, heading, subheading, CTAs, decorative accent.

**Props:**

```typescript
interface Props {
  heading: string;
  subheading: string;
  primaryCta: CTA;
  secondaryCta: CTA;
  bgImage: string;
  bgImageAlt: string;
  decorativePattern?: string;
}
```

**Structure:**

- `<section>` with `min-h-[100dvh]`, relative, overflow-hidden
- Background image container with `[data-hero-bg]`: absolute inset-0, -z-10
  - `<img>` with fetchpriority="high", width=1920, height=1080
  - Dark overlay: `bg-gradient-to-b from-clay-950/40 via-transparent to-clay-950/60`
- Content container `[data-hero-content]`: relative, z-10, flex column, justify-center, ultra-wide container
  - Decorative accent `[data-hero-accent]` — inline SVG stepped-diamond motif (Inka Gold), hidden on mobile
  - `<h1>` with `[data-hero-heading]` — responsive text: text-4xl md:text-5xl lg:text-7xl xl:text-8xl
  - `<p>` with `[data-hero-subheading]` — responsive text
  - CTAs with `[data-hero-cta-primary]` and `[data-hero-cta-secondary]` — each renders `<MagneticButton>`
  - CTAs stack on mobile (flex-col sm:flex-row)

**Script section:**

- client:visible directive
- Imports gsap + ScrollTrigger + anim-hero.js
- Calls `initHeroAnimations(section)` and `initHeroScrub(section)` on mount

**Acceptance criteria:**

- Hero renders at full viewport (`min-h-[100dvh]`)
- Background image loads with fetchpriority="high"
- Dark gradient overlay ensures text readability
- Decorative accent visible on desktop, hidden on mobile
- Heading/subheading/CTAs use exact spec §4.1 copy
- CTAs stack on mobile
- GSAP entrance animations fire on mount/visibility
- Build passes

**Estimated lines:** 65
**Dependencies:** Task A1 (types), Task A2 (content), Task B1 (MagneticButton), Task D1 (anim-hero)

---

## Group E: Features Section (PR 2 — tasks 12-13)

---

### Task E1: Create `src/scripts/anim-features.js`

**Files:** → `src/scripts/anim-features.js`

**Description:** Bento card stagger reveal on scroll.

**Exports:**

- `initFeaturesAnimations(containerEl)` — for each `[data-feature-card]`:
  - fadeUp with stagger 0.15s between cards
  - y: 48, duration: 0.7, ease: power3.out
  - ScrollTrigger: start 'top 85%', end 'bottom 20%', toggleActions 'play none none reverse'
  - Additional scale: 0.95→1.0 entrance (skip if REDUCED_MOTION)

**No hover JS** — card hover is handled via CSS `@media (hover: hover) group-hover:scale-105`. Only programmatic hover would be needed for inner icon translate, but for budget reasons CSS hover is sufficient.

**Acceptance criteria:**

- Cards stagger-reveal as user scrolls through the features section
- Each card fades up and scales in
- Reduced motion: disables scale, keeps fade-up with shorter duration
- All selectors use `[data-feature-card]` attributes
- Build passes

**Estimated lines:** 35
**Dependencies:** Task A3 (anim-utils)

---

### Task E2: Create `src/components/Features.astro`

**Files:** → `src/components/Features.astro`

**Description:** AIDA Interest section — asymmetric bento grid with grid-flow-dense, double-bezel cards.

**Props:**

```typescript
interface Props {
  cards: FeatureCard[];
}
```

**Structure:**

- `<section>` with id="experiencias", relative, py-24 md:py-32 lg:py-40, overflow-hidden
- Inner container: max-w-7xl mx-auto px-4 md:px-8 lg:px-12
- Section heading (optional, or implied by nav target)
- Grid: `grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-flow-dense`
- For each card in cards array:
  - Map `card.size` to grid spans:
    - default: `col-span-1 row-span-1`
    - wide: `md:col-span-2`
    - tall: `md:row-span-2`
    - large: `md:col-span-2 md:row-span-2`
  - Double-bezel wrapper (`p-1.5 rounded-[2rem]` outer, `rounded-[calc(2rem-0.375rem)]` inner)
  - `data-feature-card` attribute on outer wrapper
  - Inner content varies by `card.variant`:
    - `image`: `<img>` with width/height, lazy loading
    - `icon`: Phosphor Light icon SVG or inline SVG
    - `text`: Rich text with decorative elements
    - `decorative`: SVG pattern background, minimal text
  - Card hover: CSS `group-hover:scale-105` with custom easing `duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`

**Script section:**

- `client:visible` directive
- Imports gsap + ScrollTrigger + anim-features.js
- Calls `initFeaturesAnimations(section)` on mount

**Acceptance criteria:**

- Grid renders as asymmetric bento on desktop (3-4 cols), collapses to 1-col below 768px
- Grid-flow-dense is active
- Double-bezel system applied to all cards
- Each card variant renders correctly (image, icon, text, decorative)
- Card hover scale works on desktop (CSS)
- GSAP stagger-reveal animations fire on scroll
- All 5 feature cards match spec §4.2 copy exactly
- Build passes

**Estimated lines:** 85
**Dependencies:** Task A1 (types), Task A2 (content), Task E1 (anim-features)

---

## Group F: Gallery Section (PR 2 — tasks 14-16)

---

### Task F1: Create `src/scripts/anim-gallery.js`

**Files:** → `src/scripts/anim-gallery.js`

**Description:** Most complex animation file. Handles parallax, pin stack, word reveal.

**Exports:**

- `initGalleryParallax(containerEl)` — for each `[data-gallery-image]`:
  - Start at scale 0.8, scrub to scale 1.0 from top 85% to center center
  - For each `[data-gallery-overlay]`: opacity 0.6→0.8 scrubbed
  - Skip if REDUCED_MOTION
- `initGalleryCaptions(containerEl)` — for each `[data-gallery-caption]`:
  - Find `[data-word]` spans inside
  - Animate opacity 0.1→1.0, stagger 0.08s, duration 0.4s, power2.out
  - ScrollTrigger: start 'center center', toggleActions 'play none none none'
  - Skip if REDUCED_MOTION
- `initTestimonialStack(containerEl)` — pin + stack from bottom:
  - Find `[data-testimonial-stack]` container and its `[data-testimonial-card]` children
  - First card: set visible at full opacity/scale
  - Pin the stack container with `ScrollTrigger.create({ pin: true })` — dynamic end based on card count
  - For each subsequent card: animate from y '80%', scale 0.92, opacity 0 → visible, scrubbed
  - Previous card compresses: y '-10%', scale 0.95, opacity 0.85
  - After last card, unpin
  - Reduced motion: keep pin but skip card entrance animations

**Acceptance criteria:**

- Images scale from 0.8 to 1.0 on scroll entry
- Dark overlays intensify on scroll
- Caption words reveal sequentially
- Testimonials pin at top and stack from bottom as user scrolls
- Reduced motion: parallax disabled, captions disabled, stacking keeps pin only
- All selectors use data-\* attributes
- Build passes

**Estimated lines:** 85
**Dependencies:** Task A3 (anim-utils)

---

### Task F2: Create `src/scripts/anim-metrics.js`

**Files:** → `src/scripts/anim-metrics.js`

**Description:** Count-up animation for metrics row using GSAP proxy object.

**Exports:**

- `initMetricsCountUp(containerEl)` — for each `[data-metric]` element:
  - Read target value from `dataset.metric` (e.g., `data-metric="12"`)
  - Read suffix from `dataset.metricSuffix` (e.g., `data-metric-suffix="+"`)
  - Find `[data-metric-value]` display element inside
  - GSAP proxy object: `{ val: 0 }` → `gsap.to(obj, { val: targetValue, ... })`
  - On each update frame: set `displayEl.textContent = Math.round(obj.val) + suffix`
  - Duration: 1.5s (0.75s if REDUCED_MOTION), ease: power2.out
  - ScrollTrigger: start 'top 85%', once: true (one-shot — never reverses)

**Rationale for proxy approach:** Avoids importing GSAP TextPlugin (~5KB). GSAP's numeric interpolation with `onUpdate` is equally smooth and smaller.

**Acceptance criteria:**

- Numbers count up from 0 to target value on scroll entry
- Suffixes (+, %, none) appear without animation (static)
- Animation fires only once (no reverse on scroll back up)
- Reduced motion: shorter duration but still animates
- Build passes

**Estimated lines:** 35
**Dependencies:** Task A3 (anim-utils)

---

### Task F3: Create `src/components/Gallery.astro`

**Files:** → `src/components/Gallery.astro`

**Description:** AIDA Desire section — cinematic gallery with parallax images, captions, testimonial stacking, and metrics count-up.

**Props:**

```typescript
interface Props {
  images: GalleryImage[];
  testimonials: Testimonial[];
  metrics: Metric[];
}
```

**Structure — Gallery Images:**

- Iterate images array, each wrapped in `<section>` or `<div>` with full-width, py-24 to py-40
- Image container: relative, overflow-hidden, h-[50vh] md:h-[60vh] lg:h-[80vh]
  - `<img>` with `data-gallery-image`, width/height, loading="lazy", object-cover, start scale-80 (GSAP sets initial)
  - Dark gradient overlay `[data-gallery-overlay]`: absolute inset-0, bg-gradient-to-t from-clay-950/70 via-clay-950/20 to-transparent
  - Caption overlay `[data-gallery-caption]`: positioned at captionPosition
    - For word reveal: each word wrapped in `<span data-word>` using a split utility or manual mapping

**Structure — Testimonials:**

- `<div data-testimonial-stack>` — relative container, min-height for pin space
- Each testimonial renders `<TestimonialCard>` with `data-testimonial-card`
- Cards stack vertically in the pin container

**Structure — Metrics:**

- `<div>` with grid grid-cols-2 lg:grid-cols-4 gap-8
- Each metric:
  - `<div data-metric={value} data-metric-suffix={suffix}>`
  - `<span data-metric-value>` for the animated number
  - `<span>` for the label (static)

**Script section:**

- `client:visible` directive
- Imports gsap + ScrollTrigger
- Imports `initGalleryParallax`, `initTestimonialStack`, `initGalleryCaptions` from anim-gallery.js
- Imports `initMetricsCountUp` from anim-metrics.js
- Calls all on mount

**Acceptance criteria:**

- Gallery images render with parallax scroll effect
- Captions overlay with word-reveal animation
- Testimonial cards stack with GSAP pin
- Metrics count up on scroll entry
- All copy matches spec §4.3
- Images use lazy loading
- Responsive: heights adjust, metrics go 2x2 on tablet/mobile
- Build passes

**Estimated lines:** 110
**Dependencies:** Task A1 (types), Task A2 (content), Task B2 (TestimonialCard), Task F1 (anim-gallery), Task F2 (anim-metrics)

---

## Group G: CTA + Footer Sections (PR 2 — tasks 17-19)

---

### Task G1: Create `src/scripts/anim-cta.js`

**Files:** → `src/scripts/anim-cta.js`

**Description:** CTA section entrance animations — section background fade + heading/subcopy/CTAs fade-up stagger.

**Exports:**

- `initCtaAnimations(containerEl)` — sequence:
  1. Section container: opacity 0→1, 500ms, power1.out, trigger top 85%
  2. `[data-cta-heading]`: fadeUp with y 48, duration 0.8, delay 0.1
  3. `[data-cta-subcopy]`: fadeUp with y 24, duration 0.6, delay 0.3
  4. `[data-cta-primary]`: fadeUp with y 24, duration 0.6, delay 0.5
  5. `[data-cta-secondary]`: fadeUp with y 24, duration 0.6, delay 0.65
  - Use `fadeUp` helper from anim-utils.js with scrollTrigger

**Reduced motion:** fadeUp handles reduced motion internally (shorter duration, zero y-offset).

**Acceptance criteria:**

- Section background fades in on scroll entry
- Heading, subcopy, and CTAs fade up sequentially with stagger
- Reduced motion respected
- All selectors use data-\* attributes
- Build passes

**Estimated lines:** 40
**Dependencies:** Task A3 (anim-utils)

---

### Task G2: Create `src/components/CtaSection.astro`

**Files:** → `src/components/CtaSection.astro`

**Description:** AIDA Action section — massive CTA with heading, subcopy, and magnetic buttons.

**Props:**

```typescript
interface Props {
  heading: string;
  subCopy: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
  backgroundVariant?: "default" | "alt";
}
```

**Structure:**

- `<section>` with id="contacto", relative, py-32 md:py-40, overflow-hidden
- Background: Clay 50 (default) or Clay 100 (alt) based on variant
- Inner container: max-w-7xl mx-auto, text-center (or asymmetric per variance 7)
- Heading `<h2>` with `[data-cta-heading]`: text-4xl md:text-6xl lg:text-8xl, font-display font-800
- Subcopy `<p>` with `[data-cta-subcopy]`: text-lg md:text-xl, max-w-2xl mx-auto
- Button group: flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center
  - Primary CTA: `<MagneticButton>` with `[data-cta-primary]`
  - Secondary CTA: `<MagneticButton>` with `[data-cta-secondary]`

**Script section:**

- `client:visible` directive
- Imports gsap + ScrollTrigger + anim-cta.js
- Calls `initCtaAnimations(section)` on mount

**Acceptance criteria:**

- Section renders with massive heading and subcopy matching spec §4.4
- Primary and secondary CTA buttons use MagneticButton component
- Buttons full-width on mobile, side-by-side on desktop
- GSAP fade-up animations fire on scroll
- Build passes

**Estimated lines:** 55
**Dependencies:** Task A1 (types), Task A2 (content), Task B1 (MagneticButton), Task G1 (anim-cta)

---

### Task G3: Create `src/components/Footer.astro`

**Files:** → `src/components/Footer.astro`

**Description:** Static footer (no client directive). Brand info, nav links, social links, contact, copyright.

**Props:**

```typescript
interface Props {
  brandName: string;
  tagline?: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  contact: ContactInfo;
  copyright: string;
}
```

**Structure:**

- `<footer>` with bg-clay-950 (dark) or bg-clay-100 (light), py-16
- Hairline separator at top: h-px bg-clay-800 (dark footer) or bg-clay-200 (light footer)
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
  - Column 1: Brand name + tagline
  - Column 2: Nav links (vertical list)
  - Column 3: Social links (horizontal row of icons) + contact info
- Copyright line at bottom, text-sm, text-clay-500

**No script section** — no client directive. Simple fade-in handled via CSS `@keyframes` or minimal GSAP if added later. Static component.

**Acceptance criteria:**

- Footer renders with all content from content.ts FOOTER constant
- Three-column grid on desktop, collapses to single-column on mobile
- Brand name, tagline, nav links, social links, contact, and copyright all present
- Social links use Phosphor Light icons for Instagram and WhatsApp
- No client JavaScript loaded for this component
- Build passes

**Estimated lines:** 45
**Dependencies:** Task A1 (types), Task A2 (content)

---

## Group H: Integration (PR 1 + PR 2 — task 20)

---

### Task H1: Wire `src/pages/index.astro` with Full Section Orchestration

**Files:** ✏️ `src/pages/index.astro`

**Description:** Replace the existing Welcome page with full section orchestration. Import all components and content, pass typed props to each section.

**Structure:**

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Features from '../components/Features.astro';
import Gallery from '../components/Gallery.astro';
import CtaSection from '../components/CtaSection.astro';
import Footer from '../components/Footer.astro';

import {
  SITE, NAV_LINKS, HERO, FEATURES_CARDS,
  GALLERY_IMAGES, TESTIMONIALS, METRICS,
  CTA_SECTION, FOOTER
} from '../data/content';
---

<Layout title={SITE.title} description={SITE.description}>
  <Nav links={NAV_LINKS} brandName={SITE.brandName} client:load />

  <Hero
    heading={HERO.heading}
    subheading={HERO.subheading}
    primaryCta={HERO.primaryCta}
    secondaryCta={HERO.secondaryCta}
    bgImage={HERO.bgImage}
    bgImageAlt={HERO.bgImageAlt}
    client:visible
  />

  <Features cards={FEATURES_CARDS} client:visible />

  <Gallery
    images={GALLERY_IMAGES}
    testimonials={TESTIMONIALS}
    metrics={METRICS}
    client:visible
  />

  <CtaSection
    heading={CTA_SECTION.heading}
    subCopy={CTA_SECTION.subCopy}
    primaryCta={CTA_SECTION.primaryCta}
    secondaryCta={CTA_SECTION.secondaryCta}
    client:visible
  />

  <Footer
    brandName={FOOTER.brandName}
    tagline={FOOTER.tagline}
    navLinks={FOOTER.navLinks}
    socialLinks={FOOTER.socialLinks}
    contact={FOOTER.contact}
    copyright={FOOTER.copyright}
  />
</Layout>
```

**Implementation notes:**

- PR 1: Skeleton version imports and renders Nav + Hero + Footer, with commented placeholders for Features/Gallery/CtaSection
- PR 2: Full wiring with all sections active

**Acceptance criteria:**

- All sections render in AIDA order: Nav, Hero, Features, Gallery, CtaSection, Footer
- All props are typed and match interface definitions
- Client directives match spec: Nav=client:load, others=client:visible, Footer none
- Build passes with zero errors
- No Welcome.astro import remains

**Estimated lines:** 55
**Dependencies:** A4 (Layout), A1+A2 (data), B1+B2 (leaf), C2 (Nav), D2 (Hero), E2 (Features), F3 (Gallery), G2 (CTA), G3 (Footer)

---

## Group I: Polish (PR 3 — tasks 21-24)

---

### Task I1: Responsive QA Pass

**Files:** ✏️ All component files (minor Tailwind class adjustments)

**Description:** Systematic responsive QA across breakpoints (320px, 768px, 1024px, 1440px+).

**Checklist:**

- No horizontal scroll at any breakpoint
- Nav: hamburger visible <768px, links visible >=768px, hamburger tap target >=44px
- Hero: heading scales down responsively (text-4xl → 5xl → 7xl → 8xl)
- Features: grid collapses to 1-col below md, card sizes respected on desktop
- Gallery: image heights adjust (50vh → 60vh → 80vh)
- Metrics: 2x2 grid below lg, 4-col on desktop
- CTA: buttons full-width on mobile
- Footer: single-col → 2-col → 3-col across breakpoints
- Touch targets: all interactive elements >=44px height on mobile
- Body text: max 65 characters per line

**Acceptance criteria:**

- Page renders without horizontal scroll at 320px, 768px, 1024px, 1440px
- All breakpoint-specific behaviors work (stack, collapse, resize)
- Build passes

**Estimated lines:** ~15 modified across files
**Dependencies:** All Group B-G tasks complete

---

### Task I2: Reduced Motion + Touch Device Pass

**Files:** ✏️ `src/scripts/anim-utils.js` (verify REDUCED_MOTION is working), ✏️ `src/components/MagneticButton.astro` (verify touch gating)

**Description:** Verify and fix accessibility for motion sensitivity and touch devices.

**Verification checklist:**

1. Enable `prefers-reduced-motion: reduce` in browser dev tools
2. Confirm hero animations still play but with shorter durations and no blur/scrub
3. Confirm features/gallery/CTA animations still reveal content (no content hidden due to animation not playing)
4. Confirm ScrollTrigger scrub animations are disabled
5. Test on touch device or Chrome DevTools mobile emulation:
   - Hover effects don't trigger on tap (MagneticButton scale, card hover)
   - No stuck hover states
   - MagneticButton still has active press state (scale 0.98)

**Acceptance criteria:**

- With reduced motion enabled: all content still reveals, animations are shorter, blur/scrub disabled
- On touch devices: no hover artifacts, buttons respond to tap
- Build passes

**Estimated lines:** ~10 modified
**Dependencies:** All Group B-G tasks complete

---

### Task I3: Accessibility Audit

**Files:** ✏️ Component files as needed (no new files)

**Description:** Run axe-core or manual a11y checks against acceptance criteria from spec §9.

**Checklist:**

- All `<img>` have meaningful `alt` attributes
- Nav links and CTAs have visible focus styles (Tailwind `focus-visible:`)
- Skip-to-content link (optional — assess if needed)
- Heading hierarchy: single `<h1>` in Hero, `<h2>` for section headings, `<h3>` for card headings
- Color contrast: all text meets WCAG AA (check Inka Gold on Clay backgrounds)
- All interactive elements have accessible names
- `aria-label` on hamburger button: "Abrir menú" / "Cerrar menú"
- `aria-expanded` on hamburger button toggles with menu state
- `role="navigation"` on nav element
- Screen reader testing: tab order follows visual order
- Font swap doesn't cause invisible text (already handled by Layout.astro)

**Acceptance criteria:**

- Lighthouse Accessibility score >= 90
- No heading hierarchy violations
- All images have alt text
- Color contrast meets WCAG AA
- Build passes

**Estimated lines:** ~15 modified
**Dependencies:** All Group B-G tasks complete

---

### Task I4: Build Verification + Lighthouse Audit

**Files:** None (verification only)

**Description:** Final quality gate before delivery.

**Steps:**

1. `pnpm run build` — must pass with zero errors
2. `pnpm run preview` — verify page loads in browser
3. Open browser DevTools → Network tab: verify no 404s
4. Lighthouse audit (Performance, Accessibility):
   - Performance >= 90
   - Accessibility >= 90
5. Verify no console errors on page load and scroll
6. Verify GSAP animations play correctly
7. Verify all content matches spec §4

**If Lighthouse scores are below 90:**

- Check render-blocking resources
- Check image optimization (lazy loading, proper sizes)
- Check CLS (Cumulative Layout Shift) caused by images without dimensions
- Check unused JS/Tailwind CSS

**Acceptance criteria:**

- Build passes with zero errors
- Lighthouse Performance >= 90
- Lighthouse Accessibility >= 90
- No 404s
- No console errors

**Estimated lines:** 0 (no file changes expected)
**Dependencies:** All tasks complete

---

## Task Dependency Graph

```
A1 (types.ts)
 ├─ A2 (content.ts)
 ├─ B1 (MagneticButton.astro)
 ├─ B2 (TestimonialCard.astro)
 ├─ C2 (Nav.astro)
 ├─ D2 (Hero.astro)
 ├─ E2 (Features.astro)
 ├─ F3 (Gallery.astro)
 ├─ G2 (CtaSection.astro)
 └─ G3 (Footer.astro)

A3 (anim-utils.js)
 ├─ C1 (anim-nav.js) → C2 (Nav.astro)
 ├─ D1 (anim-hero.js) → D2 (Hero.astro)
 ├─ E1 (anim-features.js) → E2 (Features.astro)
 ├─ F1 (anim-gallery.js) → F3 (Gallery.astro)
 ├─ F2 (anim-metrics.js) → F3 (Gallery.astro)
 └─ G1 (anim-cta.js) → G2 (CtaSection.astro)

A4 (Layout.astro)
A5 (Favicon)

H1 (index.astro) → depends on all above
  ├─ I1 (Responsive QA) → depends on H1
  ├─ I2 (Reduced motion) → depends on H1
  ├─ I3 (Accessibility) → depends on H1
  └─ I4 (Build verification) → depends on I1-I3
```

---

## Chained PR Strategy

### PR 1: Foundation + Upper Section

**~230 net new lines**

| Task | File                                                       | Est. Lines |
| ---- | ---------------------------------------------------------- | ---------- |
| A1   | `src/data/types.ts`                                        | 40         |
| A2   | `src/data/content.ts`                                      | 100        |
| A3   | `src/scripts/anim-utils.js`                                | 45         |
| A4   | ✏️ `src/layouts/Layout.astro`                              | 8          |
| A5   | `public/favicon.svg`                                       | 20         |
| B1   | `src/components/MagneticButton.astro`                      | 45         |
| B2   | `src/components/TestimonialCard.astro`                     | 30         |
| C1   | `src/scripts/anim-nav.js`                                  | 55         |
| C2   | `src/components/Nav.astro`                                 | 75         |
| D1   | `src/scripts/anim-hero.js`                                 | 50         |
| D2   | `src/components/Hero.astro`                                | 65         |
| H1   | ✏️ `src/pages/index.astro` (skeleton: Nav + Hero + Footer) | 30         |
| —    | 🗑️ `src/components/Welcome.astro` (remove import)          | 1          |

**Build milestone:** `pnpm run build` passes. Hero and Nav render with static content (animations not yet wired for other sections).

### PR 2: Middle + Lower Sections + Full Integration

**~310 net new lines** (stacked on PR 1)

| Task | File                                                       | Est. Lines |
| ---- | ---------------------------------------------------------- | ---------- |
| E1   | `src/scripts/anim-features.js`                             | 35         |
| E2   | `src/components/Features.astro`                            | 85         |
| F1   | `src/scripts/anim-gallery.js`                              | 85         |
| F2   | `src/scripts/anim-metrics.js`                              | 35         |
| F3   | `src/components/Gallery.astro`                             | 110        |
| G1   | `src/scripts/anim-cta.js`                                  | 40         |
| G2   | `src/components/CtaSection.astro`                          | 55         |
| G3   | `src/components/Footer.astro`                              | 45         |
| H1   | ✏️ `src/pages/index.astro` (full wiring with all sections) | 25         |

**Build milestone:** `pnpm run build` passes. Full page renders with all animations.

### PR 3: Polish + Audit

**~30-50 modified lines** (stacked on PR 2)

| Task | File                                              | Est. Lines |
| ---- | ------------------------------------------------- | ---------- |
| I1   | ✏️ Responsive QA (touch all component files)      | 15         |
| I2   | ✏️ Reduced motion + touch device pass             | 10         |
| I3   | ✏️ Accessibility audit                            | 15         |
| I4   | Build verification + Lighthouse (no file changes) | 0          |

**Build milestone:** `pnpm run build` passes. Lighthouse >= 90 on Performance and Accessibility.

---

## Estimated Line Count Summary

| Category                              | PR 1                     | PR 2     | PR 3    | Total    |
| ------------------------------------- | ------------------------ | -------- | ------- | -------- |
| New files                             | 10                       | 8        | 0       | 18       |
| Modified files                        | 1                        | 1        | 3+      | 5+       |
| Deleted files                         | 1 (import)               | —        | —       | 1        |
| New lines (gross)                     | ~533                     | ~530     | ~0      | ~1063    |
| Modified lines                        | ~9                       | ~25      | ~40     | ~74      |
| Deleted lines (Welcome.astro content) | ~75 (not counted in net) | —        | —       | ~75      |
| **Net new for review**                | **~230**                 | **~310** | **~40** | **~580** |

**Note:** The 400-line budget is exceeded because this is a greenfield implementation (18 files). The chained PR strategy mitigates review burden by splitting across 3 stacked PRs.

---

## Risk Mitigation Table

| Risk                                                  | Mitigation                                                                                        | Task   |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------ |
| GSAP ScrollTrigger not registered before Hero fires   | Nav (client:load) loads first, registers plugin globally via anim-utils.js                        | C2, A3 |
| iOS Safari scroll jank                                | ScrollTrigger.normalizeScroll(true) in anim-utils.js                                              | A3     |
| MagneticButton not hydrated when Hero renders         | Hero uses client:visible but MagneticButton is rendered inside Hero's HTML and inherits hydration | D2     |
| Testimonial stack pins incorrectly on short viewports | ScrollTrigger `pinSpacing: true`, `anticipatePin: 1`, test at multiple heights                    | F1     |
| Metrics count-up targets wrong element                | Use data-\* selectors (`data-metric`, `data-metric-value`) with strict naming                     | F2     |
| Tailwind v4 class name changes                        | All classes vetted against Tailwind v4; avoid v3-only utilities                                   | All    |
| Lighthouse < 90 on Performance                        | client:visible for all non-nav components, lazy loading for below-fold images, font swap          | I4     |
| Lighthouse < 90 on Accessibility                      | Follow Task I3 checklist, proper heading hierarchy, alt text, focus styles                        | I3     |
| `pnpm run build` breaks mid-chain                     | Run build after every significant task; fix immediately                                           | All    |

---

## Phase Envelope

```yaml
phase: tasks
change_id: 001-landing-page
status: draft
date: 2026-05-19
executor: sdd-tasks
artifacts:
  - openspec/specs/004-tasks.md
dependencies:
  - openspec/specs/003-design.md (approved)
next_phase: apply
approval_needed: false
risk_score: high (budget exceeded, mitigated by chained PRs)
estimated_tasks: 24
estimated_lines: ~580 net new across 3 PRs
warnings:
  - "400-line review budget exceeded. Chained PR strategy recommended: 3 stacked PRs."
  - "Greenfield implementation: 18 files changed (15 new, 2 modified, 1 deleted import)."
  - "GSAP 3.15.0 must be confirmed in lockfile. Run `pnpm install` before starting apply."
```
