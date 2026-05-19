# SDD Specification — Rutas del Sol Landing Page

**Phase:** spec
**Date:** 2026-05-19
**Executor:** sdd-spec
**Change ID:** 001-landing-page
**Status:** Draft
**Artifact Store:** openspec (file-backed)
**Skill Resolution:** paths-injected

---

## 1. Change Metadata

| Field | Value |
|---|---|
| **Change ID** | 001-landing-page |
| **Title** | Rutas del Sol — Premium Landing Page (Cultural - Artesanal Direction) |
| **Type** | New artifact (greenfield project) |
| **Domain** | landing-page |
| **Framework** | Astro 6.3.5 + Tailwind v4 + GSAP 3.15.0 (ScrollTrigger) |
| **Language** | Spanish (Argentine dialect) |
| **Design System** | Cultural - Artesanal (see DESIGN.md) |
| **Review Budget** | 400 changed lines |
| **Package Manager** | pnpm (strict — no npm, npx, or yarn) |
| **Canonical Baseline** | No existing canonical spec — this is the first domain spec for `landing-page` |

---

## 2. Requirements

### 2.1 Functional Requirements

| ID | Requirement | Priority | Verification |
|---|---|---|---|
| F-01 | The page MUST render as a single-page landing with smooth-scroll navigation via a floating glass nav pill. | P0 | Visual inspection, scroll test |
| F-02 | The page MUST follow the AIDA narrative arc with exactly four sections: Attention (Hero), Interest (Bento Features), Desire (Cinematic Gallery/Storytelling), Action (CTA + Footer). | P0 | DOM structure inspection |
| F-03 | The floating glass navigation pill MUST be detached from edges, centered horizontally, with backdrop-blur effect, and MUST morph into a hamburger-to-X menu below 768px. | P0 | Responsive viewport test |
| F-04 | The primary CTA button MUST use a magnetic button-in-button effect with nested circle wrapper, scale hover, and diagonal icon translation. | P0 | Hover interaction test |
| F-05 | The bento features grid MUST use `grid-flow-dense` with asymmetric card sizing (mix of image-dominant, text-dominant, and decorative cards) on desktop, collapsing to single-column below 768px. | P0 | Responsive visual test |
| F-06 | GSAP-powered scroll-triggered animations MUST activate on section entry: fade-up reveals, text word-opacity scrub, image scale transitions, and card stacking. | P0 | Scroll interaction test |
| F-07 | A testimonials section MUST display guest quotes in a stacking card layout using GSAP pin + stack-from-bottom. | P1 | Scroll behavior test |
| F-08 | The metrics row MUST display 3-4 data points with GSAP count-up animation triggered on scroll entry. | P1 | Scroll behavior test |
| F-09 | The gallery/storytelling section MUST include a parallax scrolling effect on at least 3 landscape images with text overlays and dark gradient. | P0 | Scroll interaction test |
| F-10 | The page MUST include SEO metadata (title, description, Open Graph tags) in Spanish. | P1 | HTML head inspection |
| F-11 | The page MUST include a favicon (stylized sun/mountain SVG mark) and browser tab branding. | P1 | Browser tab inspection |
| F-12 | The page MUST use GPU-accelerated properties (`transform`, `opacity`) for all animations; MUST NOT animate `top`, `left`, `width`, or `height`. | P0 | Code review, GSAP audit |
| F-13 | All external dependencies MUST be limited to Astro, Tailwind CSS, GSAP, and Phosphor Light icons (or Remix Line). | P0 | `package.json` audit |
| F-14 | The `blur` CSS property MUST only appear on fixed/sticky elements (nav pill, overlays), never on scroll-triggered animations. | P0 | Code review |
| F-15 | Z-index values MUST follow the systemic layer discipline: nav=50, modal=60, overlay=70, tooltip=80. | P0 | Code review |
| F-16 | The page MUST pass `pnpm run build` with zero errors before delivery. | P0 | CI build check |

### 2.2 Non-Functional Requirements

| ID | Requirement | Target | Priority |
|---|---|---|---|
| NF-01 | Lighthouse Performance score | >= 90 | P1 |
| NF-02 | Lighthouse Accessibility score | >= 90 | P1 |
| NF-03 | Responsive coverage | 320px+ mobile, tablet, desktop | P0 |
| NF-04 | Font loading strategy | preconnect + preload + `font-display: swap` for all fonts | P1 |
| NF-05 | Images below the fold | `loading="lazy"` attribute | P1 |
| NF-06 | Hero background image | `fetchpriority="high"` for early LCP | P1 |
| NF-07 | Body text line limit | Max 65 characters per line | P0 |
| NF-08 | Animation motion safety | Respect `prefers-reduced-motion` — disable GSAP ScrollTrigger scrubbing when reduced motion is preferred | P1 |
| NF-09 | Hover effects on touch devices | MUST feature-detect with `@media (hover: hover)`; non-hover devices MUST NOT break layout | P1 |

### 2.3 Constraints

| ID | Constraint | Source |
|---|---|---|
| C-01 | All text content MUST be in Spanish (Argentine dialect). Use voseo where natural. | Proposal §5.1 |
| C-02 | No emojis in code or output. | DESIGN.md — Banned Patterns |
| C-03 | Package manager: pnpm only — no npm, npx, or yarn. | AGENTS.md |
| C-04 | Review budget: 400 changed lines across the entire implementation. | config.yaml |
| C-05 | Banned fonts: Inter, Roboto, Arial, Open Sans, Helvetica MUST NOT appear. | DESIGN.md |
| C-06 | Banned icons: Lucide, FontAwesome, Material icons MUST NOT appear. Use Phosphor Light or Remix Line. | DESIGN.md |
| C-07 | Banned patterns: No meta-labels ("SECTION 01", "ABOUT US"), no scroll chevrons, no generic 1px gray borders, no harsh drop shadows, no edge-to-edge sticky navbars. | DESIGN.md |
| C-08 | Hero MUST use `min-h-[100dvh]` — never `h-screen`. | DESIGN.md — Layout Principles |
| C-09 | Transition functions MUST NOT use `linear` or `ease-in-out`. Use custom cubic-bezier or GSAP defaults. | DESIGN.md — Motion Philosophy |
| C-10 | Layout MUST use CSS Grid over Flexbox math; no `calc()` percentage hacks. | DESIGN.md — Layout Principles |
| C-11 | The double-bezel card system MUST be used for all cards (outer shell with `p-1.5`, `rounded-[2rem]`; inner core with distinct bg, `rounded-[calc(2rem-0.375rem)]`). | DESIGN.md — Component Architecture |
| C-12 | All Astro interactive components MUST use `client:visible` as the default client directive, NOT `client:load`, except the Nav component which MUST use `client:load`. | Proposal §7.2 |

---

## 3. User Flow Scenarios

### 3.1 First Visit — Full Scroll Journey

```
Scenario: First-time visitor lands on the page and scrolls through all four AIDA sections.
```

- **GIVEN** a visitor opens `https://rutasdelsol.example.com` on a desktop browser (1440px viewport)
- **WHEN** the page loads
- **THEN** the hero section renders full-viewport with a wide-angle Andean background image
- **AND** the heading "Descubrí los caminos que cuentan historias" fades up with blur over 800ms
- **AND** the subheading and CTAs stagger in sequentially
- **AND** the floating glass nav pill slides down with a mask reveal
- **WHEN** the visitor scrolls down
- **THEN** the hero background image scales from 1.0 to 1.05 (scrubbed)
- **AND** the bento features grid cards stagger-fade-up into view one by one
- **WHEN** the visitor reaches the gallery section
- **THEN** images scale from 0.8 to 1.0 on entry with dark gradient overlays
- **AND** testimonial cards stack from the bottom using GSAP pin
- **AND** metric numbers count up from 0 to their final values
- **WHEN** the visitor reaches the CTA section
- **THEN** the massive heading and button fade up from below
- **AND** the footer fades in simply at the bottom
- **WHEN** the visitor hovers over the primary CTA button
- **THEN** the button scales to 1.02 and the nested icon translates diagonally (magnetic effect)

### 3.2 Mobile Hamburger Navigation

```
Scenario: Mobile user opens the page and uses the navigation menu.
```

- **GIVEN** a visitor on a mobile device (375px viewport)
- **WHEN** the page loads
- **THEN** the floating nav pill displays a hamburger icon instead of full links
- **WHEN** the visitor taps the hamburger icon
- **THEN** the icon morphs into an X with a staggered mask reveal animation
- **AND** a full-screen or expanded menu overlay appears with navigation links
- **WHEN** the visitor taps a navigation link
- **THEN** the page smooth-scrolls to the corresponding section
- **AND** the menu closes (X morphs back to hamburger)

### 3.3 Magnetic Button Interaction

```
Scenario: Visitor explores call-to-action buttons.
```

- **GIVEN** a visitor viewing the Hero or CTA section with a mouse/trackpad
- **WHEN** the visitor moves the cursor over the primary CTA button
- **THEN** the button scales to 1.02 (duration 300ms, ease-out)
- **AND** the nested icon circle translates diagonally outward (up + right or down + right)
- **WHEN** the visitor clicks the button
- **THEN** the button momentarily scales to 0.98 (duration 150ms, squash effect)
- **AND** the visitor is navigated to the target link

### 3.4 Testimonial Card Stacking Reveal

```
Scenario: Visitor scrolls through the testimonial section.
```

- **GIVEN** a visitor scrolling through the Desire section
- **WHEN** the testimonial area enters the viewport
- **THEN** the first testimonial card pins at the top of the viewport
- **WHEN** the visitor continues scrolling
- **THEN** the next card stacks up from the bottom, partially overlapping the first
- **AND** each card has a subtle scale entrance (0.95 to 1.0)
- **WHEN** the last card is stacked
- **THEN** the entire stack unpins and scrolls away, revealing the next content section

### 3.5 Metrics Count-Up

```
Scenario: Visitor scrolls to the metrics row.
```

- **GIVEN** a visitor scrolling through the gallery section
- **WHEN** the metrics row enters the viewport
- **THEN** each metric value animates from 0 to its final number over 1.5 seconds
- **AND** the units/labels remain static during the animation
- **AND** the animation only triggers once (not on re-entry)

---

## 4. Content Specification

All copy in Spanish (Argentine dialect). Uses voseo (`vos`, `descubrí`, `caminá`, `conocé`, `reservá`, `contactanos`). Evocative and grounded in place — avoids generic tourism clichés.

### 4.1 Hero Section

| Element | Content | Notes |
|---|---|---|
| **Main Heading (H1)** | `Descubrí los caminos que cuentan historias` | Evocative, place-based. Max 2-3 lines on ultra-wide. |
| **Subheading** | `Trekking guiados · Experiencias culturales · Itinerarios cortos` | Tagline-style, three pillars. Interpunct separators. |
| **Primary CTA label** | `Explorá experiencias` | Magnetic button-in-button variant |
| **Secondary CTA label** | `Ver itinerarios` | Outline/link variant |
| **Decorative accent** | Geometric stepped-diamond motif in Inka Gold, positioned offset from center | Inline SVG or CSS pseudo-element |

### 4.2 Bento Features Grid (Interest)

| Card | Heading | Body Text | Visual Type |
|---|---|---|---|
| **Trekking Guiados** | `Caminos ancestrales` | `Caminá por senderos que las montañas guardan hace siglos. La Quebrada de Humahuaca, el Cerro de los Siete Colores, los valles calchaquíes. Cada paso, una historia.` | Image-dominant (landscape trek view) |
| **Itinerarios Cortos** | `Poco tiempo, muchas historias` | `Itinerarios de 1 a 3 días para quienes quieren lo esencial sin apurarse. Diseñados al ritmo de cada viajero.` | Image-dominant (map or path detail) |
| **Experiencias Culturales** | `Tejé la memoria` | `Tejé con artesanas locales, probá la cocina andina, recorré mercados tradicionales. El viaje no termina en el paisaje: entra en las manos que lo trabajan.` | Image-dominant + decorative pattern overlay (textile motif) |
| **Seguridad y Confianza** | `Cuidamos cada paso` | `Guías bilingües, seguro de viaje, equipo certificado. Porque una gran aventura merece estar bien cuidada.` | Icon-dominant (Phosphor Light shield/checkmark icon) |
| **Conexión Local** | `Raíces que sostienen` | `Conocé a las comunidades que hacen vivo este territorio. Turismo sustentable que respeta, celebra y devuelve.` | Text-dominant with quote accent from local guide |

### 4.3 Cinematic Gallery / Storytelling (Desire)

#### Gallery Image Captions

| Image | Caption (Spanish) | Tone |
|---|---|---|
| Mountain landscape at golden hour | `El sol nace entre los cerros, igual que ayer, igual que hace siglos.` | Timeless, meditative |
| High-altitude puna landscape | `El viento en la puna cuenta lo que los mapas no dicen.` | Mysterious, evocative |
| Weaving/textile close-up | `Cada hilado tiene un nombre. Cada color, una historia que no necesita palabras.` | Sensory, intimate |
| Traveler on a trail at sunset | `El sendero no termina donde termina el camino.` | Poetic, open-ended |

#### Testimonials

```
[CLIENT: Provide 2-3 guest testimonial quotes with full name, location, and optionally a portrait photo.]

Placeholder structure for each testimonial:
{
  "quote": "[CLIENT: testimonial quote in Spanish, 1-3 sentences]",
  "author": "[CLIENT: full name]",
  "location": "[CLIENT: city/country of origin]"
}
```

#### Metrics Row

| Value | Label | Notes |
|---|---|---|
| `12` | `rutas activas` | Counts up from 0. Unit stays static. |
| `500+` | `viajeros` | Shows plus sign after count reaches 500. |
| `98%` | `satisfaccion` | Percentage sign appears at end. |
| `7` | `anos de experiencia` | Counts up from 0. |

### 4.4 Action Section (CTA)

| Element | Content | Notes |
|---|---|---|
| **Heading (H2)** | `Listo para tu proxima aventura?` | Question format, personal, direct |
| **Sub-copy** | `No hacen falta mapas ni planes perfectos. Solo venir con ganas de descubrir.` | One sentence emotional nudge, minimal |
| **Primary CTA label** | `Reserva tu experiencia` | Magnetic button-in-button |
| **Secondary CTA label** | `Contactanos` | Outline/link variant |

### 4.5 Footer

| Element | Content | Notes |
|---|---|---|
| **Brand name** | `Rutas del Sol` | With tagline below |
| **Tagline** | `Caminos que cuentan historias` | Aligns with hero H1 |
| **Nav links** | `Experiencias` · `Itinerarios` · `Contacto` | Same interpunct separators |
| **Social links** | Instagram (`@[CLIENT: instagram_handle]`), WhatsApp (`[CLIENT: whatsapp_link]`) | Using Phosphor Light icons |
| **Contact email** | `[CLIENT: email address]` | Placeholder for client data |
| **Contact phone** | `[CLIENT: phone number]` | Placeholder for client data |
| **Copyright** | `2026 [CLIENT: legal entity]. Todos los derechos reservados.` | Standard disclaimer |

---

## 5. Animation Specification

### 5.1 GSAP Configuration

- **Package:** `gsap` 3.15.0 with bundled ScrollTrigger plugin
- **GPU safety:** All animations MUST use only `transform` (translate, scale, rotate) and `opacity` — NEVER `top`, `left`, `width`, `height`, `margin`, `padding`
- **Blur constraint:** `filter: blur()` only on fixed/sticky elements (nav pill, overlays)
- **Reduced motion:** `gsap.matchMedia()` or `prefers-reduced-motion: reduce` media query MUST disable scrub-based animations and reduce durations by 50% for entrance animations
- **Mobile:** On touch devices (no hover), skip hover-scale animations; keep entrance animations
- **ScrollTrigger mobile:** Use `ScrollTrigger.normalizeScroll(true)` for smooth iOS Safari behavior

### 5.2 Hero Entrance Timeline

| Step | Element | Animation | Duration | Easing | Trigger |
|---|---|---|---|---|---|
| 1 | Background image | `scale(1)` initial, no entrance blur | — | — | On paint |
| 2 | Decorative accent (geometric SVG) | `opacity: 0 → 1`, `scale: 0.8 → 1` | 600ms | `power2.out` | Page load +100ms |
| 3 | H1 heading | `translateY(64px) → 0`, `opacity: 0 → 1`, `filter: blur(8px) → blur(0)` | 800ms | `power3.out` | Page load +200ms |
| 4 | Subheading | `translateY(32px) → 0`, `opacity: 0 → 1` | 700ms | `power2.out` | Page load +500ms |
| 5 | Primary CTA | `translateY(24px) → 0`, `opacity: 0 → 1` | 600ms | `power2.out` | Page load +750ms |
| 6 | Secondary CTA | `translateY(24px) → 0`, `opacity: 0 → 1` | 600ms | `power2.out` | Page load +900ms |
| 7 | Nav pill | `translateY(-100%) → 0`, `opacity: 0 → 1` with mask reveal (clip-path) | 500ms | `power3.out` | Page load +1200ms |

**Scrub animation (scroll exit):**

| Element | Property | Range | Easing |
|---|---|---|---|
| Hero background image | `scale: 1 → 1.05` | Scroll from top to next section | `none` (scrubbed) |
| Hero content wrapper | `opacity: 1 → 0.6`, `translateY: 0 → -40` | Last 30% of hero viewport exit | `none` (scrubbed) |

### 5.3 Bento Features Timeline (Scroll Reveal)

Each card uses an individual ScrollTrigger with staggered start positions.

| Parameter | Value |
|---|---|
| **Trigger** | `.features-grid` section |
| **Cards stagger** | Each card: `stagger: 0.15` between cards |
| **Per-card animation** | `translateY(48px) → 0`, `opacity: 0 → 1`, `scale: 0.95 → 1` |
| **Duration** | 700ms per card |
| **Easing** | `power3.out` |
| **ScrollTrigger** | `start: "top 85%"`, `end: "bottom 20%"`, `toggleActions: "play none none reverse"` |

**Card hover animation:**

| Property | Start | End | Duration | Easing |
|---|---|---|---|---|
| Card transform | `scale(1)` | `scale(1.05)` | 700ms | `cubic-bezier(0.32, 0.72, 0, 1)` |
| Inner icon (if present) | `translate(0, 0)` | `translate(4px, -4px)` | 700ms | Same easing |
| Inner highlight | `opacity: 0` | `opacity: 1` | 400ms | `power2.out` |

### 5.4 Gallery / Storytelling Timeline

**Image parallax on scroll:**

| Element | Property | Range | Easing |
|---|---|---|---|
| Gallery image | `scale: 0.8 → 1.0` | `start: "top 85%"` to `end: "center center"` | Scrubbed |
| Dark gradient overlay | `opacity: 0.6 → 0.8` (darken) | Last 40% of image viewport | Scrubbed |
| Caption text | `translateY(24px) → 0`, `opacity: 0 → 1` | When image is at `center 60%` | `power2.out` |

**Text word reveal (caption overlays):**

Each word in the caption uses:
- `opacity: 0.1 → 1.0` with `stagger: 0.08` between words
- Triggered when the parent image reaches `center center`
- Duration: 400ms per word, `power2.out`

**Testimonial card stacking:**

| Step | Action | Trigger |
|---|---|---|
| 1 | Pin testimonial container when its top hits viewport top | `ScrollTrigger.create({ pin: true })` |
| 2 | First card visible at full opacity, `scale(1)` | In view initially |
| 3 | As user scrolls, next card enters from bottom: `translateY(80%) → 0`, `scale(0.92) → 1`, `opacity: 0 → 1` | Scrubbed over 60% of viewport |
| 4 | Previous card compresses: `translateY(0) → -10%`, `scale(1) → 0.95`, `opacity: 1 → 0.85` | Simultaneous with step 3 |
| 5 | After last card, unpin container and slide entire stack up and out | End of testimonial section |

**Metrics count-up:**

| Element | Animation | Duration | Easing | Trigger |
|---|---|---|---|---|
| Each metric value | `TextPlugin` or manual counter from 0 to target value | 1500ms | `power2.out` | When metrics row enters viewport (`start: "top 85%"`) |
| Visual polish | Number only animates; unit/label stays static | — | — | — |
| One-shot | `once: true` on ScrollTrigger — does not re-animate on scroll re-entry | — | — | — |

### 5.5 CTA Section Entry

| Element | Animation | Duration | Easing | Trigger |
|---|---|---|---|---|
| Section background | `opacity: 0 → 1` | 500ms | `power1.out` | `start: "top 85%"` |
| Heading (H2) | `translateY(48px) → 0`, `opacity: 0 → 1` | 800ms | `power3.out` | Delayed +100ms after section trigger |
| Sub-copy | `translateY(24px) → 0`, `opacity: 0 → 1` | 600ms | `power2.out` | Delayed +300ms after section trigger |
| Primary CTA | `translateY(24px) → 0`, `opacity: 0 → 1` | 600ms | `power2.out` | Delayed +500ms after section trigger |
| Secondary CTA | `translateY(24px) → 0`, `opacity: 0 → 1` | 600ms | `power2.out` | Delayed +650ms after section trigger |

### 5.6 Footer Entry

| Element | Animation | Duration | Easing | Trigger |
|---|---|---|---|---|
| Footer content | `opacity: 0 → 1` | 400ms | `power1.out` | When footer enters viewport |
| Hairline separator | `scaleX(0) → 1` (from center) | 600ms | `power2.out` | Same trigger, +100ms delay |

No scroll scrubbing or pinned animations in the footer — hierarchy of motion keeps it simple.

---

## 6. Component API

### 6.1 Nav.astro

**Client directive:** `client:load`

```typescript
interface NavProps {
  links: Array<{
    label: string;    // Navigation link text (e.g., "Experiencias")
    href: string;     // Section anchor (e.g., "#experiencias")
  }>;
  brandName?: string; // Default: "Rutas del Sol"
  brandLogo?: string; // Optional SVG string or path
}
```

**Behavior:**
- Renders as a floating glass pill: `fixed top-4 left-1/2 -translate-x-1/2`, `rounded-full`, `backdrop-blur-xl`, `bg-clay-950/80`
- Desktop (>= 768px): horizontal nav links with hover underline animation
- Mobile (< 768px): hamburger icon → morphs to X on tap → expands menu overlay
- Menu overlay: full-screen or large sheet with staggered link reveals using `stagger: 0.1`
- Active section tracking: highlight current section link as user scrolls (IntersectionObserver)
- Slide-down entrance on page load (see §5.2, step 7)

### 6.2 Hero.astro

**Client directive:** `client:visible`

```typescript
interface HeroProps {
  heading: string;              // Main H1 text
  subheading: string;           // Subheading text
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  bgImage: string;              // URL or path to hero background
  bgImageAlt: string;           // Alt text for background image
  decorativePattern?: string;   // Optional: inline SVG string for geometric motif
}
```

**Behavior:**
- `min-h-[100dvh]` full-viewport container
- Background: `<img>` with `fetchpriority="high"`, subtle dark overlay (`bg-gradient-to-b from-clay-950/40 via-transparent to-clay-950/60`)
- Text left-aligned or centered with offset decorative element (variance 7)
- `max-w-5xl+` ultra-wide container for heading
- GSAP entrance stagger on mount (see §5.2)
- Background scale scrub on scroll exit

### 6.3 Features.astro (Bento Grid)

**Client directive:** `client:visible`

```typescript
interface FeatureCard {
  id: string;                   // Unique key
  title: string;                // Card heading
  description: string;          // Card body text (1-2 sentences)
  variant: 'image' | 'text' | 'icon' | 'decorative';
  image?: {
    src: string;
    alt: string;
  };
  icon?: string;                // Phosphor Light icon name (for 'icon' variant)
  patternSvg?: string;          // Inline SVG for decorative variant
  size?: 'default' | 'wide' | 'tall' | 'large';
  // size mapping:
  //   default: 1x1 cell
  //   wide:    2x1 cells
  //   tall:    1x2 cells
  //   large:   2x2 cells
}

interface FeaturesProps {
  cards: FeatureCard[];
  className?: string;
}
```

**Behavior:**
- CSS Grid with `grid-flow-dense`, auto-fill columns on desktop (typically 3-4 cols depending on content)
- Each card wrapped in double-bezel system (outer shell `p-1.5 rounded-[2rem]`, inner core `rounded-[calc(2rem-0.375rem)]`)
- GSAP scroll-triggered stagger reveal (see §5.3)
- Hover: `scale(1.05)` with custom easing on the outer shell
- Collapses to single-column `w-full` below 768px

### 6.4 Gallery.astro (Cinematic / Storytelling)

**Client directive:** `client:visible`

```typescript
interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;             // Poetic caption overlay text
  captionPosition?: 'bottom-left' | 'bottom-center' | 'center';
}

interface Testimonial {
  quote: string;
  author: string;
  location?: string;
  avatar?: string;              // Optional portrait photo URL
}

interface Metric {
  value: number;                // Numeric value for count-up
  suffix?: string;              // e.g., "+", "%"
  label: string;                // Static label next to the value
}

interface GalleryProps {
  images: GalleryImage[];
  testimonials: Testimonial[];
  metrics: Metric[];
}
```

**Behavior:**
- Alternating full-width image sections with `py-24` to `py-40` spacing
- Each image: `object-cover w-full h-[60vh]` to `h-[80vh]`, with dark gradient overlay (`bg-gradient-to-t from-clay-950/70 via-clay-950/20 to-transparent`)
- Caption overlaid at specified position
- GSAP parallax: image scale 0.8→1.0 on scroll entry, darken overlay on exit
- Text word-reveal: sequential opacity scrub per word
- Testimonials: stacking card layout using GSAP pin + stack from bottom (see §5.4)
- Metrics: horizontal row, count-up animation (see §5.4)

### 6.5 CtaSection.astro

**Client directive:** `client:visible`

```typescript
interface CtaSectionProps {
  heading: string;              // Massive heading text
  subCopy: string;              // Short emotional nudge
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  backgroundVariant?: 'default' | 'alt';  // Default uses Clay 50, alt uses Clay 100
}
```

**Behavior:**
- Full-width section with generous padding (`py-32` to `py-40`)
- Centered or asymmetric layout
- Heading: `text-6xl` to `text-8xl` using Cabinet Grotesk 800
- GSAP fade-up entry stagger (see §5.5)
- Primary CTA uses MagneticButton component

### 6.6 Footer.astro

**Client directive:** static (no client directive — renders as HTML only)

```typescript
interface FooterProps {
  brandName: string;
  tagline?: string;
  navLinks: Array<{
    label: string;
    href: string;
  }>;
  socialLinks: Array<{
    platform: string;      // e.g., "instagram", "whatsapp"
    href: string;
    icon: string;          // Phosphor Light icon name
  }>;
  contact: {
    email?: string;
    phone?: string;
  };
  copyright: string;
}
```

**Behavior:**
- Dark background section (`bg-clay-950`) or light (`bg-clay-100`) depending on CTA background
- Hairline separator at top (Clay 200, `h-px`)
- Three-column grid desktop, single-column mobile
- Simple fade-in animation on scroll entry (no pinning, no scrubbing)

### 6.7 MagneticButton.astro

**Client directive:** `client:visible` (or reused inside parent sections)

```typescript
interface MagneticButtonProps {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
  icon?: string;                // Phosphor Light icon name for trailing icon
  size?: 'default' | 'large';   // 'large' for CTA section
  className?: string;
}
```

**Behavior:**
- `rounded-full` pill shape
- Button-in-button architecture: outer button with nested icon circle
- Primary variant: Inka Gold background, Clay 950 text
- Secondary variant: transparent background, Inka Gold text, hairline border
- Magnetic hover: `scale(1.02)` on the outer button + inner icon translates diagonally (translateX + translateY)
- Active press: `scale(0.98)` for 150ms
- Touch devices: skip hover scale, keep active press

### 6.8 TestimonialCard.astro

**Client directive:** `client:visible` (or reused inside Gallery)

```typescript
interface TestimonialCardProps {
  quote: string;
  author: string;
  location?: string;
  avatar?: string;
  className?: string;
}
```

**Behavior:**
- Double-bezel card (same system as bento cards)
- Quote: large opening quotation mark decorative element (Inka Gold)
- Author attribution below quote with optional avatar
- Used inside the GSAP pin-stack system in Gallery.astro

---

## 7. Responsive Behavior

### 7.1 Breakpoint Definitions

| Breakpoint | Name | Layout Strategy |
|---|---|---|
| `>= 1280px` | Desktop XL | Full asymmetric grids, max content width, cinematic hero |
| `1024px - 1279px` | Desktop | Slightly compressed margins, same grid structure |
| `768px - 1023px` | Tablet | 2-column bento, smaller hero text (`text-5xl`), compressed gallery |
| `480px - 767px` | Mobile | Single-column everything, hamburger nav, stacked sections |
| `320px - 479px` | Small Mobile | Tighter padding `px-4`, smaller headings (`text-3xl`), full-width buttons |

### 7.2 Per-Section Responsive Rules

#### Hero

| Element | Desktop (>= 1024px) | Tablet (768-1023px) | Mobile (< 768px) |
|---|---|---|---|
| Heading size | `text-7xl` to `text-8xl` | `text-5xl` to `text-6xl` | `text-4xl` to `text-5xl` |
| Subheading size | `text-xl` | `text-lg` | `text-base` |
| Background height | `min-h-[100dvh]` | `min-h-[80vh]` | `min-h-[70vh]` |
| Text alignment | Left-aligned or centered with offset | Centered | Centered |
| Padding horizontal | `px-12` | `px-8` | `px-4` |
| Decorative accent | Visible, offset | Visible, smaller | Hidden |
| CTA buttons | Side by side | Side by side | Stacked, full-width |

#### Bento Features

| Element | Desktop (>= 1024px) | Tablet (768-1023px) | Mobile (< 768px) |
|---|---|---|---|
| Grid columns | 3-4 column asymmetric | 2-column compressed | 1-column stacked |
| Card size `wide` | 2 cols | 2 cols | 1 col (full width) |
| Card size `tall` | 2 rows | 1 row (compressed) | 1 row |
| Grid gap | `gap-4` | `gap-3` | `gap-3` |
| Card font size | `text-2xl` heading | `text-xl` heading | `text-lg` heading |
| Section padding | `py-32` | `py-24` | `py-16` |

#### Gallery / Storytelling

| Element | Desktop (>= 1024px) | Tablet (768-1023px) | Mobile (< 768px) |
|---|---|---|---|
| Image height | `h-[80vh]` | `h-[60vh]` | `h-[50vh]` |
| Caption font size | `text-3xl` | `text-2xl` | `text-xl` |
| Section padding | `py-40` | `py-28` | `py-20` |
| Metrics row | 4 items horizontal | 2x2 grid | 2x2 grid or stacked |
| Metric value size | `text-6xl` | `text-5xl` | `text-4xl` |
| Testimonial card max-width | `max-w-2xl` | `max-w-xl` | `max-w-full` |

#### CTA Section

| Element | Desktop (>= 1024px) | Tablet (768-1023px) | Mobile (< 768px) |
|---|---|---|---|
| Heading size | `text-7xl` to `text-8xl` | `text-5xl` to `text-6xl` | `text-4xl` |
| Sub-copy size | `text-xl` | `text-lg` | `text-base` |
| Section padding | `py-40` | `py-28` | `py-20` |
| Button size | Default | Default | Full-width |
| Text alignment | Centered or asymmetric | Centered | Centered |

#### Footer

| Element | Desktop (>= 1024px) | Tablet (768-1023px) | Mobile (< 768px) |
|---|---|---|---|
| Layout | 3-column grid | 2-column grid | 1-column stacked |
| Padding | `py-16 px-12` | `py-12 px-8` | `py-10 px-4` |
| Text alignment | Left | Left | Center |
| Social links | Horizontal row | Horizontal row | Horizontal row, centered |

### 7.3 Touch Device Adaptations

| Feature | Touch Device Behavior |
|---|---|
| Magnetic button hover | Skipped — `@media (hover: hover)` blocks hover transforms |
| Card hover scale | Skipped — no hover state on touch |
| GSAP ScrollTrigger | `ScrollTrigger.normalizeScroll(true)` for iOS Safari inertia |
| Nav hamburger | Tap target minimum 44x44px |
| All buttons | Minimum touch target 44px height |

---

## 8. Image Placeholder Specification

### 8.1 Hero Background

| Attribute | Value |
|---|---|
| **Role** | Full-viewport hero background |
| **Dimensions** | 1920 x 1080px (16:9 landscape) |
| **Min width** | 1440px (content width) |
| **Aspect ratio** | 16:9 |
| **Placeholder URL** | `https://picsum.photos/seed/andean-sunset/1920/1080` |
| **Alt text** | `Paisaje andino al atardecer, montanas con luz dorada` |
| **Loading** | `fetchpriority="high"` (eager, priority) |
| **Style guide** | Wide-angle Andean landscape, warm golden hour light, terracotta and gold tones. No identifiable people without signed release. Dark gradient overlay applied via CSS for text readability. |
| **When real image added** | Replace `src` attribute only; maintain same aspect ratio and loading strategy. Image should be WebP format, maximum 200KB. |

### 8.2 Bento Card Images

#### Trekking Guiados (Wide card)

| Attribute | Value |
|---|---|
| **Dimensions** | 800 x 600px (4:3) |
| **Placeholder URL** | `https://picsum.photos/seed/cerro-siete-colores/800/600` |
| **Alt text** | `Cerro de los Siete Colores, Purmamarca, Jujuy` |
| **Loading** | `loading="lazy"` |

#### Itinerarios Cortos (Default card)

| Attribute | Value |
|---|---|
| **Dimensions** | 400 x 400px (1:1 square) |
| **Placeholder URL** | `https://picsum.photos/seed/sendero-andino/400/400` |
| **Alt text** | `Sendero de montana entre cardones y piedras` |
| **Loading** | `loading="lazy"` |

#### Experiencias Culturales (Tall card)

| Attribute | Value |
|---|---|
| **Dimensions** | 400 x 600px (2:3 portrait) |
| **Placeholder URL** | `https://picsum.photos/seed/tejedora-andina/400/600` |
| **Alt text** | `Artesana tejiendo en telar tradicional andino` |
| **Loading** | `loading="lazy"` |

### 8.3 Gallery Cinematic Images

#### Image 1 — Mountain Landscape (Golden Hour)

| Attribute | Value |
|---|---|
| **Dimensions** | 1600 x 900px (16:9) |
| **Placeholder URL** | `https://picsum.photos/seed/montanas-doradas/1600/900` |
| **Alt text** | `Cordillera de los Andes iluminada por el sol del atardecer` |
| **Loading** | `loading="lazy"` |

#### Image 2 — High Puna Landscape

| Attribute | Value |
|---|---|
| **Dimensions** | 1600 x 900px (16:9) |
| **Placeholder URL** | `https://picsum.photos/seed/puna-viento/1600/900` |
| **Alt text** | `Puna argentina, plano infinito de arena y cielo` |
| **Loading** | `loading="lazy"` |

#### Image 3 — Textile / Weaving Close-Up

| Attribute | Value |
|---|---|
| **Dimensions** | 1200 x 1200px (1:1) |
| **Placeholder URL** | `https://picsum.photos/seed/textile-andino/1200/1200` |
| **Alt text** | `Primer plano de tejido artesanal con patrones geometricos` |
| **Loading** | `loading="lazy"` |

#### Image 4 — Traveler on Trail at Sunset

| Attribute | Value |
|---|---|
| **Dimensions** | 1600 x 900px (16:9) |
| **Placeholder URL** | `https://picsum.photos/seed/sendero-atardecer/1600/900` |
| **Alt text** | `Viajero caminando por un sendero de montana al atardecer` |
| **Loading** | `loading="lazy"` |

### 8.4 Decorative Patterns

| Element | Format | Description |
|---|---|---|
| Hero decorative accent | Inline SVG | Stepped diamond geometric motif in Inka Gold (`#d4a017`), inspired by Andean textile patterns. Approximately 120x40px. Offset positioned near the hero heading. |
| Bento decorative card | Inline SVG | Repeat pattern of stepped crosses (Andean `chakana` motif) in Inka Purple (`#6b2fa0`) at low opacity (0.15). Used as background fill for the decorative variant card. |
| Section dividers | CSS pseudo-element | Hairline rule with Inka Red (`#b83a2a`) geometric dot pattern at intervals. Implemented via CSS `background-image: radial-gradient()` or repeating gradient. |

### 8.5 Favicon

| Attribute | Value |
|---|---|
| **Format** | SVG |
| **Design** | Stylized sun/mountain mark — stepped half-sun (Inka Gold) above a triangular mountain (Clay 950), referencing Andean iconography |
| **File path** | `public/favicon.svg` |
| **Fallback** | `public/favicon.ico` (32x32) |
| **Alt text on HTML link** | Not applicable (favicon link tag, not an img) |

### 8.6 General Image Style Guidelines

| Rule | Detail |
|---|---|
| **Format** | WebP preferred, JPEG fallback for older browsers |
| **Quality** | 80-85% compression |
| **Max file size** | Hero: 200KB. Gallery: 150KB each. Bento cards: 80KB each. |
| **Color treatment** | Warm tone grade — boost oranges, golds, and earth tones. Slight desaturation on greens. Contrast +10%. |
| **No text in images** | All text must be HTML/CSS overlay, never embedded in image files |
| **Attribution** | If using stock photography, attribution must be in footer or page credits |
| **People** | Avoid identifiable faces without signed model release. Silhouettes, backs, and distant figures are safe. |

---

## 9. Acceptance Criteria

### 9.1 Build & Integration

| ID | Criterion | Method | Pass/Fail |
|---|---|---|---|
| AC-01 | `pnpm run build` completes with zero errors | Run build command | |
| AC-02 | All interactive components hydrate without console errors | Browser dev console | |
| AC-03 | No 404s on any resource (images, fonts, assets) | Network tab / Lighthouse | |
| AC-04 | Total changed lines <= 400 (review budget) | `git diff --stat` against baseline | |

### 9.2 Content & Language

| ID | Criterion | Method | Pass/Fail |
|---|---|---|---|
| AC-05 | All visible text content is in Spanish (Argentine dialect) | Manual review | |
| AC-06 | No emojis appear anywhere in the rendered page | Manual review | |
| AC-07 | Hero heading is exactly "Descubrí los caminos que cuentan historias" | Visual inspection | |
| AC-08 | All bento card copy matches Section 4.2 | Visual inspection | |
| AC-09 | All CTA copy matches Sections 4.1, 4.4 | Visual inspection | |
| AC-10 | SEO title tag and meta description are present and in Spanish | HTML head inspection | |
| AC-11 | Open Graph tags (og:title, og:description, og:image, og:locale) present | HTML head inspection | |

### 9.3 Structure & Layout

| ID | Criterion | Method | Pass/Fail |
|---|---|---|---|
| AC-12 | Exactly four AIDA sections exist in DOM order: Hero, Features, Gallery, CTA+Footer | DOM inspector | |
| AC-13 | Floating glass nav pill is present, centered, detached, with backdrop blur | Visual inspection | |
| AC-14 | Nav pill hamburger morphs to X below 768px | Responsive viewport test | |
| AC-15 | Bento grid uses `grid-flow-dense` on desktop | CSS inspection | |
| AC-16 | Bento grid collapses to single-column below 768px | Responsive viewport test | |
| AC-17 | Double-bezel card system applied to all feature cards | CSS inspection | |
| AC-18 | Hero uses `min-h-[100dvh]` not `h-screen` | CSS inspection | |

### 9.4 Animation & Motion

| ID | Criterion | Method | Pass/Fail |
|---|---|---|---|
| AC-19 | GSAP animations trigger on page load for hero elements | Visual + console inspection | |
| AC-20 | Scroll-triggered animations activate when sections scroll into view | Scroll test | |
| AC-21 | Magnetic button-in-button effect works on hover (desktop) | Hover interaction test | |
| AC-22 | All animations use only `transform` and `opacity` — no layout-triggering properties | GSAP code review | |
| AC-23 | Testimonial cards stack using GSAP pin | Scroll interaction test | |
| AC-24 | Metrics count up from 0 to target values on scroll entry | Scroll interaction test | |
| AC-25 | `prefers-reduced-motion` disables scrub animations and reduces entrance durations | Browser accessibility test | |
| AC-26 | Hover effects are disabled on touch devices via `@media (hover: hover)` | Touch device test | |

### 9.5 Performance & Accessibility

| ID | Criterion | Method | Pass/Fail |
|---|---|---|---|
| AC-27 | Lighthouse Performance >= 90 | Lighthouse audit | |
| AC-28 | Lighthouse Accessibility >= 90 | Lighthouse audit | |
| AC-29 | All images have `alt` attributes | Accessibility audit | |
| AC-30 | Body text lines do not exceed 65 characters | Visual measurement | |
| AC-31 | Hero image has `fetchpriority="high"` | HTML inspection | |
| AC-32 | Below-fold images have `loading="lazy"` | HTML inspection | |

### 9.6 Responsive

| ID | Criterion | Method | Pass/Fail |
|---|---|---|---|
| AC-33 | Page renders without horizontal scroll at 320px viewport | Responsive test | |
| AC-34 | Page renders without horizontal scroll at 768px viewport | Responsive test | |
| AC-35 | Page renders without horizontal scroll at 1440px viewport | Responsive test | |
| AC-36 | All CTAs and nav links have minimum 44px touch target on mobile | Touch target audit | |

### 9.7 Design System Compliance

| ID | Criterion | Method | Pass/Fail |
|---|---|---|---|
| AC-37 | Only DESIGN.md colors used — no arbitrary hex values | CSS audit | |
| AC-38 | Only approved fonts used (Cabinet Grotesk, Satoshi, JetBrains Mono) | CSS audit | |
| AC-39 | No banned fonts present (Inter, Roboto, Arial, Open Sans, Helvetica) | CSS audit | |
| AC-40 | No banned icons present (Lucide, FontAwesome, Material) | Dependency audit | |
| AC-41 | No banned patterns present (meta-labels, scroll chevrons, edge-to-edge nav, etc.) | Visual + code audit | |
| AC-42 | Z-index values follow systemic discipline: nav=50, modal=60, overlay=70, tooltip=80 | CSS audit | |
| AC-43 | `blur` only on fixed/sticky elements | CSS audit | |

---

## 10. Risks

| Risk | Impact | Probability | Mitigation |
|---|---|---|---|
| **Flat file naming conflict** | The project uses flat `001-proposal.md` pattern; canonical OpenSpec convention expects `changes/001-landing-page/specs/landing-page/spec.md`. Archive phase must handle this shape. | Medium | Flagged here for archive/merge phase. The spec is written to `openspec/specs/002-spec.md` matching established pattern but will need proper routing at archive time. |
| **No client copy/images provided** | Proposal content uses placeholders; client may reject tone or accuracy | Medium | All client-provided content marked with `[CLIENT: ...]` placeholders for easy replacement |
| **Lighthouse >= 90 on both Performance and Accessiblity** | GSAP + ScrollTrigger + multiple client:visible components may impact initial JS payload | Medium | Use `client:visible` (not `client:load`) aggressively; lazy-load gallery/testimonial JS only when needed |
| **400-line review budget** | Component structure across 8 Astro components + 4 animation scripts may exceed budget | Medium | Extract shared animation patterns; keep each component lean; use Tailwind utility classes aggressively to reduce CSS |
| **Tailwind v4 breaking changes** | `@theme` directive syntax or utility class names may differ from v3 | Low | Design tokens and utility classes are already v4-compatible in the DESIGN.md baseline |
| **ScrollTrigger on iOS Safari** | Scrubbed animations may jank on mobile Safari without normalization | Medium | `ScrollTrigger.normalizeScroll(true)` applied globally; test on real iOS device before delivery |

---

## Phase Envelope

```
---
phase: spec
change_id: 001-landing-page
status: draft
date: 2026-05-19
executor: sdd-spec
artifacts:
  - openspec/specs/002-spec.md
dependencies:
  - openspec/specs/001-proposal.md (approved)
  - DESIGN.md (design system foundations)
next_phase: design
approval_needed: true
risk_score: medium
estimated_tasks: 22-28
estimated_lines: 380-420
warnings:
  - "Flat file naming: spec at openspec/specs/002-spec.md does not follow canonical openspec/changes/001-landing-page/specs/landing-page/spec.md convention. Archive phase must handle this shape before merging into canonical specs."
  - "No existing canonical spec for domain 'landing-page' — this is a greenfield full spec, not a delta."
---
```
