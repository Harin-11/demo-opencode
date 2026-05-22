# Rutas del Sol — Design System

> Cultural - Artesanal · Inspired by Andean textile heritage

## Visual Atmosphere

- **Density:** 4 (Art Gallery Airy — spacious, editorial)
- **Variance:** 7 (Offset Asymmetric — broken grids, dynamic layouts)
- **Motion:** 8 (Cinematic Choreography — Framer Motion, `AnimatePresence`, scroll-driven variants)

## Color Palette

| Name             | Hex       | Role                                   |
| ---------------- | --------- | -------------------------------------- |
| Clay 50          | `#fbf8f4` | Page background                        |
| Clay 100         | `#f6efe8` | Section alt background                 |
| Clay 200         | `#ede2d6` | Card borders, hairline                 |
| Clay 800         | `#4a3829` | Body text                              |
| Clay 950         | `#1a1410` | Headings                               |
| **Inka Gold**    | `#d4a017` | Primary accent — CTAs, highlights      |
| **Inka Red**     | `#b83a2a` | Secondary accent — decorative elements |
| **Inka Purple**  | `#6b2fa0` | Tertiary accent — geometric patterns   |
| **Sierra Green** | `#4a7c59` | Natural accent — nature references     |
| **Sky Blue**     | `#7ba9c9` | Background washes, atmospheric         |

## Typography

- **Display:** Cabinet Grotesk (700, 800) — massive headings
- **Body:** Satoshi (300, 400, 500, 700) — paragraph, navigation, UI
- **Mono:** JetBrains Mono (optional, for data/metrics)
- **Line limit:** Max 65 characters per line for body text
- **BANNED:** Inter, Roboto, Arial, Open Sans, Helvetica

## Component Architecture

### Navigation — Floating Glass Island

- Detached pill nav: `mx-auto mt-6 w-max rounded-full`
- Backdrop blur glass with Clay 950/80 background
- Hamburger morph to X on mobile
- Staggered mask reveal on menu open

### Buttons — Nested CTA Architecture

- Fully rounded pills (`rounded-full`)
- Button-in-button trailing icon (nested circle wrapper)
- Magnetic hover: scale, translate icon diagonally
- Active press: `scale-[0.98]`

### Cards — Double-Bezel System

- Outer shell: subtle bg, hairline border, `p-1.5`, `rounded-[2rem]`
- Inner core: distinct bg, inner highlight, `rounded-[calc(2rem-0.375rem)]`
- Hover: `scale-105` with `transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`

### Bento Grids — Gapless

- `grid-flow-dense` always applied
- 3–5 intentional cards, no empty cells
- Mix of imagery, typography, and CSS effects

## Motion Philosophy

| Element           | Technique                                              | Timing     |
| ----------------- | ------------------------------------------------------ | ---------- |
| Page load entries | Fade-up + blur: `translate-y-16 blur-md opacity-0 → 0` | 800ms+     |
| Scroll reveals    | Framer Motion `useInView` + `whileInView`              | Scrubbed   |
| Card stacking     | Framer Motion `AnimatePresence` + `layout` animations  | Scrolled   |
| Text reveals      | Word opacity scrub 0.1 → 1.0                           | Sequential |
| Image scale       | `scale: 0.8 → 1.0` on enter, darken on exit            | Scrolled   |
| Hover physics     | `group-hover:scale-105`, icon diagonal translate       | 700ms ease |

- **BANNED:** `linear` or `ease-in-out` transitions
- **GPU-safe:** Only `transform` and `opacity` — never `top`, `left`, `width`, `height`
- **Blur constraint:** Only on fixed/sticky elements (nav, overlays)
- **Z-Index discipline:** Systemic layers only (nav 50, modal 60, overlay 70, tooltip 80)

## Layout Principles

- **Sections:** `py-24` to `py-40` — macro whitespace
- **Container max:** `max-w-7xl mx-auto` with generous padding
- **Hero:** Ultra-wide (`max-w-5xl+`), max 2-3 line heading
- **Full-height sections:** `min-h-[100dvh]` — never `h-screen` (iOS fix)
- **Grid:** CSS Grid over Flexbox math — no `calc()` percentage hacks
- **Responsive:** All asymmetric layouts collapse to `w-full` single-column below `768px`

## AIDA Page Structure

1. **Attention:** Hero (cinematic, cultural imagery)
2. **Interest:** Bento features grid (experiences, treks)
3. **Desire:** Framer Motion scroll section (gallery, storytelling, testimonials)
4. **Action:** Massive CTA + footer

## Banned Patterns

- ❌ Meta-labels ("SECTION 01", "ABOUT US")
- ❌ Inter, Roboto, Arial fonts
- ❌ FontAwesome, Material icons (use Tabler, Lucide, Phosphor Light, or Remix Line)
- ❌ Generic 1px gray borders
- ❌ Harsh drop shadows (`shadow-md`, `rgba(0,0,0,0.3)`)
- ❌ 3-column Bootstrap-style grids without whitespace
- ❌ Edge-to-edge sticky navbars
- ❌ Centered hero when variance > 4
- ❌ Scroll chevrons / "scroll to explore" text
- ❌ Emojis in code or output
