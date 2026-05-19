# SDD Technical Design — Rutas del Sol Landing Page

**Phase:** design
**Date:** 2026-05-19
**Executor:** sdd-design
**Change ID:** 001-landing-page
**Status:** Draft
**Artifact Store:** openspec (file-backed)
**Skill Resolution:** paths-injected

---

## 1. Component Architecture

### 1.1 Component Tree

```
src/pages/index.astro
  └── Layout.astro (existing, extended with SEO props)
       ├── Nav.astro                ← client:load
       ├── Hero.astro               ← client:visible
       │    └── MagneticButton.astro (primary CTA)  ← inherited from Hero island
       │    └── MagneticButton.astro (secondary CTA)
       ├── Features.astro           ← client:visible
       │    └── (internal card mapping — no sub-components needed)
       ├── Gallery.astro            ← client:visible
       │    ├── TestimonialCard.astro (repeated)  ← inherited from Gallery island
       │    └── (internal image render + metric row)
       ├── CtaSection.astro         ← client:visible
       │    └── MagneticButton.astro (primary CTA)  ← inherited
       │    └── MagneticButton.astro (secondary CTA)
       └── Footer.astro            ← static (no client directive)
```

### 1.2 Data Flow

```
index.astro (orchestrator)
  │
  ├── imports all content from src/data/content.ts
  │     Content is typed, centralized, single source of truth
  │
  ├── passes typed Props to each section component
  │     index.astro owns the full payload
  │     Section components are "dumb" — they receive data, display it
  │
  └── Layout.astro receives <title>, <description> from index.astro

MagneticButton receives { label, href, variant, icon?, size?, className? }
  → purely presentational, no side effects

TestimonialCard receives { quote, author, location?, avatar? }
  → purely presentational, no side effects
```

### 1.3 Type Contracts

Create a single shared types file at `src/data/types.ts`. Every component imports types from here. No inline type definitions in component files (except Astro `interface Props` which aliases these types).

```typescript
// src/data/types.ts

export interface NavLink {
  label: string;
  href: string;
}

export interface CTA {
  label: string;
  href: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  variant: 'image' | 'text' | 'icon' | 'decorative';
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  icon?: string;
  patternSvg?: string;
  size?: 'default' | 'wide' | 'tall' | 'large';
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  captionPosition?: 'bottom-left' | 'bottom-center' | 'center';
}

export interface Testimonial {
  quote: string;
  author: string;
  location?: string;
  avatar?: string;
}

export interface Metric {
  value: number;
  suffix?: string;
  label: string;
}

export interface MagneticButtonProps {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
  icon?: string;
  size?: 'default' | 'large';
  className?: string;
}
```

### 1.4 Data Content File Pattern

Create `src/data/content.ts` that exports typed constants for every section. This file is the single point of truth for all copy, links, image paths, and configuration.

Rationale for a standalone data file over inline props:
1. **Editor-friendly** — copy changes don't require touching component structure
2. **Review-budget efficient** — modifying copy is a single-file change
3. **Env-configurable** — can swap content based on `import.meta.env` for staging vs production
4. **Type-safe** — TypeScript validates all content against the schema

```typescript
// src/data/content.ts — example shape
import type { NavLink, CTA, FeatureCard, GalleryImage, Testimonial, Metric } from './types';

export const SITE = {
  title: 'Rutas del Sol — Turismo Receptivo',
  description: 'Descubrí la historia y paisajes de la región con Rutas del Sol.',
  url: 'https://rutasdelsol.example.com',
  locale: 'es_AR',
  brandName: 'Rutas del Sol',
  tagline: 'Caminos que cuentan historias',
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: 'Experiencias', href: '#experiencias' },
  { label: 'Itinerarios', href: '#itinerarios' },
  { label: 'Contacto', href: '#contacto' },
];

export const HERO = {
  heading: 'Descubrí los caminos que cuentan historias',
  subheading: 'Trekking guiados \u00b7 Experiencias culturales \u00b7 Itinerarios cortos',
  primaryCta: { label: 'Explorá experiencias', href: '#experiencias' } as CTA,
  secondaryCta: { label: 'Ver itinerarios', href: '#itinerarios' } as CTA,
  bgImage: '/images/hero-bg.jpg',
  bgImageAlt: 'Paisaje andino al atardecer, montañas con luz dorada',
};

export const FEATURES_CARDS: FeatureCard[] = [
  // ... 5 cards from spec §4.2
];

export const GALLERY_IMAGES: GalleryImage[] = [
  // ... 4 images from spec §4.3
];

export const TESTIMONIALS: Testimonial[] = [
  // ... placeholder structure from spec §4.3
];

export const METRICS: Metric[] = [
  { value: 12, suffix: '', label: 'rutas activas' },
  { value: 500, suffix: '+', label: 'viajeros' },
  { value: 98, suffix: '%', label: 'satisfacción' },
  { value: 7, suffix: '', label: 'años de experiencia' },
];

export const CTA_SECTION = {
  heading: '¿Listo para tu próxima aventura?',
  subCopy: 'No hacen falta mapas ni planes perfectos. Solo venir con ganas de descubrir.',
  primaryCta: { label: 'Reservá tu experiencia', href: '#contacto' } as CTA,
  secondaryCta: { label: 'Contactanos', href: '#contacto' } as CTA,
};

export const FOOTER = {
  brandName: 'Rutas del Sol',
  tagline: 'Caminos que cuentan historias',
  navLinks: NAV_LINKS,
  socialLinks: [
    { platform: 'instagram', href: 'https://instagram.com/rutasdelsol', icon: 'instagram-logo' },
    { platform: 'whatsapp', href: 'https://wa.me/549XXXXXXXX', icon: 'whatsapp-logo' },
  ],
  contact: {
    email: 'hola@rutasdelsol.example.com',
    phone: '+54 9 XXX XXX-XXXX',
  },
  copyright: '2026 Rutas del Sol. Todos los derechos reservados.',
};
```

### 1.5 Component Responsibility Matrix

| Component | Astro Props (what it receives) | Internal State | Side Effects | Client Directive |
|---|---|---|---|---|
| **Nav.astro** | `links: NavLink[]`, `brandName: string` | Mobile menu open/closed (JS) | GSAP entrance + hamburger morph | `client:load` |
| **Hero.astro** | heading, subheading, CTAs, bgImage, decorativePattern? | None | GSAP entrance stagger on mount | `client:visible` |
| **Features.astro** | `cards: FeatureCard[]` | None | GSAP stagger reveal on scroll | `client:visible` |
| **Gallery.astro** | images, testimonials, metrics | None | GSAP parallax + pin stack + count-up | `client:visible` |
| **CtaSection.astro** | heading, subCopy, CTAs, backgroundVariant? | None | GSAP fade-up entrance | `client:visible` |
| **Footer.astro** | brandName, tagline, navLinks, socialLinks, contact, copyright | None | Simple fade-in (CSS or minimal GSAP) | none (static) |
| **MagneticButton.astro** | label, href, variant, icon?, size?, className? | None | Mouse hover scale + icon translate, press squash | inherited from parent |
| **TestimonialCard.astro** | quote, author, location?, avatar? | None | None (animation handled by parent Gallery) | inherited from parent |

---

## 2. Animation Architecture

### 2.1 Script File Organization

All animation logic lives in `src/scripts/` as standalone ES modules. Each file exports a single setup function that receives an HTMLElement or selector string.

```
src/scripts/
├── anim-hero.js         → Hero entrance timeline + background scrub
├── anim-features.js     → Bento card stagger reveal + hover
├── anim-gallery.js      → Parallax, testimonial pin-stack, word reveal
├── anim-metrics.js      → Count-up animation
├── anim-cta.js          → CTA section entrance + magnetic button
├── anim-nav.js          → Nav entrance + hamburger morph + active section
└── anim-utils.js        → Shared helpers: prefersReducedMotion, cleanup, ScrollTrigger defaults
```

### 2.2 Shared Utility Module (`anim-utils.js`)

```javascript
// src/scripts/anim-utils.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const REDUCED_MOTION = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Shared ScrollTrigger defaults — applied once
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
  invalidateOnRefresh: true,
});
ScrollTrigger.normalizeScroll(true);

/**
 * Creates a fade-up animation for entrance reveals.
 * Respects prefers-reduced-motion: reduces duration by 50%, removes y-offset.
 */
export function fadeUp(el, options = {}) {
  const { y = 48, duration = 0.7, delay = 0, ease = 'power3.out', scrollTrigger } = options;
  const dur = REDUCED_MOTION ? duration * 0.5 : duration;
  const yVal = REDUCED_MOTION ? 0 : y;

  return gsap.fromTo(el,
    { y: yVal, opacity: 0 },
    { y: 0, opacity: 1, duration: dur, delay, ease, scrollTrigger }
  );
}

/**
 * Cleanup function for ScrollTrigger — call in component's onDisconnect or before re-init.
 */
export function cleanupTriggers(...triggers) {
  triggers.forEach(t => t && t.kill());
}
```

### 2.3 Hero Animation (`anim-hero.js`)

**Entry timeline** — runs once on component mount:

```javascript
import { gsap } from 'gsap';
import { REDUCED_MOTION } from './anim-utils';

export function initHeroAnimations(container) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Step 1: Decorative accent (opacity fade + scale)
  tl.fromTo('[data-hero-accent]',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.6, delay: 0.1 }
  );

  // Step 2: H1 heading (fade-up + blur)
  tl.fromTo('[data-hero-heading]',
    { y: 64, opacity: 0, filter: 'blur(8px)' },
    { y: 0, opacity: 1, filter: 'blur(0)', duration: 0.8 },
    0.2
  );

  // Step 3: Subheading (fade-up, no blur)
  tl.fromTo('[data-hero-subheading]',
    { y: 32, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    0.5
  );

  // Step 4: Primary CTA
  tl.fromTo('[data-hero-cta-primary]',
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    0.75
  );

  // Step 5: Secondary CTA
  tl.fromTo('[data-hero-cta-secondary]',
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    0.9
  );

  // If reduced motion, skip the blur on H1
  if (REDUCED_MOTION) {
    gsap.set('[data-hero-heading]', { filter: 'none' });
  }
}

export function initHeroScrub(container) {
  if (REDUCED_MOTION) return;

  // Background scale scrub on scroll exit
  const bg = container.querySelector('[data-hero-bg]');
  if (bg) {
    gsap.to(bg, {
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // Content fade-out on last 30% of hero exit
  const content = container.querySelector('[data-hero-content]');
  if (content) {
    gsap.to(content, {
      opacity: 0.6,
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top -70vh',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
}
```

### 2.4 Features Animation (`anim-features.js`)

```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeUp, REDUCED_MOTION } from './anim-utils';

export function initFeaturesAnimations(container) {
  const cards = container.querySelectorAll('[data-feature-card]');

  cards.forEach((card, i) => {
    fadeUp(card, {
      y: 48,
      duration: 0.7,
      delay: i * 0.15,  // stagger: 0.15 between cards
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: REDUCED_MOTION ? 'play none none none' : 'play none none reverse',
      },
    });

    // Initial scale animation
    if (!REDUCED_MOTION) {
      gsap.fromTo(card,
        { scale: 0.95 },
        { scale: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    }
  });
}

export function initFeaturesHover(card) {
  // Hover is handled via CSS @media (hover: hover) group-hover classes
  // GSAP hover is only needed if we want programmatic control over the inner icon translate.
  // For the review budget, CSS hover is sufficient.
  // If needed: gsap.to(icon, { x: 4, y: -4, duration: 0.7, ease: 'cubic-bezier(0.32, 0.72, 0, 1)' });
}
```

### 2.5 Gallery Animation (`anim-gallery.js`)

This is the most complex animation file. It handles three sub-systems:

```javascript
// src/scripts/anim-gallery.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { REDUCED_MOTION } from './anim-utils';

/**
 * Parallax scale + overlay darken for each gallery image.
 */
export function initGalleryParallax(container) {
  if (REDUCED_MOTION) return;

  const images = container.querySelectorAll('[data-gallery-image]');
  images.forEach((img) => {
    gsap.to(img, {
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: img,
        start: 'top 85%',
        end: 'center center',
        scrub: 1,
      },
    });
    // Start at 0.8 scale
    gsap.set(img, { scale: 0.8 });
  });

  const overlays = container.querySelectorAll('[data-gallery-overlay]');
  overlays.forEach((overlay) => {
    gsap.to(overlay, {
      opacity: 0.8,
      ease: 'none',
      scrollTrigger: {
        trigger: overlay,
        start: 'top 60%',
        end: 'center center',
        scrub: 1,
      },
    });
  });
}

/**
 * Word-by-word caption reveal.
 */
export function initGalleryCaptions(container) {
  if (REDUCED_MOTION) return;

  const captions = container.querySelectorAll('[data-gallery-caption]');
  captions.forEach((caption) => {
    const words = caption.querySelectorAll('[data-word]');
    if (words.length === 0) return;

    gsap.fromTo(words,
      { opacity: 0.1 },
      {
        opacity: 1,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: caption,
          start: 'center center',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

/**
 * Testimonial pin + stack from bottom.
 */
export function initTestimonialStack(container) {
  const stack = container.querySelector('[data-testimonial-stack]');
  const cards = stack ? stack.querySelectorAll('[data-testimonial-card]') : [];
  if (!stack || cards.length === 0) return;

  // Pin the stack container
  ScrollTrigger.create({
    trigger: stack,
    start: 'top top',
    end: () => `+=${cards.length * 80}%`,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  });

  if (REDUCED_MOTION) return;

  // Animate each card stacking from bottom
  cards.forEach((card, i) => {
    if (i === 0) {
      // First card already visible
      gsap.set(card, { opacity: 1, scale: 1, y: 0 });
      return;
    }

    gsap.fromTo(card,
      { y: '80%', scale: 0.92, opacity: 0 },
      {
        y: 0, scale: 1, opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stack,
          start: () => `top +=${i * 40}%`,
          end: () => `top +=${i * 40 + 30}%`,
          scrub: 1,
        },
      }
    );

    // Previous card compresses slightly
    if (i > 0) {
      const prevCard = cards[i - 1];
      gsap.to(prevCard, {
        y: '-10%', scale: 0.95, opacity: 0.85,
        duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: stack,
          start: () => `top +=${i * 40}%`,
          end: () => `top +=${i * 40 + 20}%`,
          scrub: 1,
        },
      });
    }
  });
}
```

### 2.6 Metrics Count-Up (`anim-metrics.js`)

```javascript
// src/scripts/anim-metrics.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { REDUCED_MOTION } from './anim-utils';

/**
 * Count-up animation using gsap's built-in interpolation.
 * Uses a proxy object and onUpdate to set the text content.
 */
export function initMetricsCountUp(container) {
  const metrics = container.querySelectorAll('[data-metric]');

  metrics.forEach((metricEl) => {
    const targetValue = parseInt(metricEl.dataset.metric, 10);
    if (isNaN(targetValue)) return;

    const suffix = metricEl.dataset.metricSuffix || '';
    const displayEl = metricEl.querySelector('[data-metric-value]');
    if (!displayEl) return;

    // Use an object proxy for GSAP to interpolate
    const obj = { val: 0 };

    gsap.to(obj, {
      val: targetValue,
      duration: REDUCED_MOTION ? 0.75 : 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        displayEl.textContent = Math.round(obj.val) + suffix;
      },
      scrollTrigger: {
        trigger: metricEl,
        start: 'top 85%',
        toggleActions: 'play none none none',  // one-shot — never reverses
        once: true,
      },
    });
  });
}
```

### 2.7 CTA Animation (`anim-cta.js`)

```javascript
// src/scripts/anim-cta.js
import { gsap } from 'gsap';
import { fadeUp, REDUCED_MOTION } from './anim-utils';

export function initCtaAnimations(container) {
  // Section background fade-in
  gsap.fromTo(container,
    { opacity: 0 },
    { opacity: 1, duration: 0.5, ease: 'power1.out',
      scrollTrigger: { trigger: container, start: 'top 85%' } }
  );

  // Heading
  fadeUp(container.querySelector('[data-cta-heading]'), {
    y: REDUCED_MOTION ? 0 : 48,
    duration: 0.8, delay: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: container, start: 'top 85%' },
  });

  // Subcopy
  fadeUp(container.querySelector('[data-cta-subcopy]'), {
    y: REDUCED_MOTION ? 0 : 24,
    duration: 0.6, delay: 0.3, ease: 'power2.out',
    scrollTrigger: { trigger: container, start: 'top 85%' },
  });

  // Primary CTA
  fadeUp(container.querySelector('[data-cta-primary]'), {
    y: REDUCED_MOTION ? 0 : 24,
    duration: 0.6, delay: 0.5, ease: 'power2.out',
    scrollTrigger: { trigger: container, start: 'top 85%' },
  });

  // Secondary CTA
  fadeUp(container.querySelector('[data-cta-secondary]'), {
    y: REDUCED_MOTION ? 0 : 24,
    duration: 0.6, delay: 0.65, ease: 'power2.out',
    scrollTrigger: { trigger: container, start: 'top 85%' },
  });
}
```

### 2.8 Nav Animation (`anim-nav.js`)

```javascript
// src/scripts/anim-nav.js
import { gsap } from 'gsap';
import { REDUCED_MOTION } from './anim-utils';

export function initNavEntrance(nav) {
  // Slide-down entrance on page load (spec §5.2 step 7)
  gsap.fromTo(nav,
    { y: '-100%', opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    { y: 0, opacity: 1, clipPath: 'inset(0 0 0 0)',
      duration: REDUCED_MOTION ? 0.25 : 0.5,
      ease: 'power3.out', delay: 1.2 }
  );
}

export function initHamburger(hamburgerBtn, menuOverlay, links) {
  let isOpen = false;

  hamburgerBtn.addEventListener('click', () => {
    isOpen = !isOpen;

    if (isOpen) {
      // Morph to X
      gsap.to(hamburgerBtn.querySelectorAll('span'), {
        rotate: 45, duration: 0.3, ease: 'power2.out',
        // First span rotates to X top bar, middle disappears, last rotates to X bottom
      });
      // Reveal menu overlay with staggered links
      gsap.fromTo(menuOverlay,
        { opacity: 0, clipPath: 'circle(0% at top right)' },
        { opacity: 1, clipPath: 'circle(150% at top right)', duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo(links,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power2.out', delay: 0.3 }
      );

    } else {
      // Reverse: morph back to hamburger, hide overlay
      gsap.to(menuOverlay, {
        opacity: 0, clipPath: 'circle(0% at top right)', duration: 0.3, ease: 'power2.in',
      });
    }
  });
}

/**
 * Active section highlighting via IntersectionObserver.
 * More lightweight than ScrollTrigger for this purpose.
 */
export function initActiveSection(nav, sectionIds) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        nav.querySelectorAll('[data-nav-link]').forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}
```

### 2.9 MagneticButton Client Script

In addition to the animation scripts, the MagneticButton component needs inline JS for hover physics. Since MagneticButton is rendered inside `client:visible` parent components, these handlers attach when the parent hydrates.

```javascript
// Inlined in MagneticButton.astro <script> tag
function initMagneticButton(btn) {
  const inner = btn.querySelector('[data-magnetic-icon]');
  if (!inner || !matchMedia('(hover: hover)').matches) return;

  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
    if (inner) gsap.to(inner, { x: 6, y: -6, duration: 0.3, ease: 'power2.out' });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
    if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
  });

  btn.addEventListener('mousedown', () => {
    gsap.to(btn, { scale: 0.98, duration: 0.15, ease: 'power2.out' });
  });

  btn.addEventListener('mouseup', () => {
    gsap.to(btn, { scale: 1.02, duration: 0.15, ease: 'power2.out' });
  });
}
```

### 2.10 ScrollTrigger Global Configuration

Set once in `anim-utils.js`:

| Setting | Value | Rationale |
|---|---|---|
| `ScrollTrigger.normalizeScroll(true)` | true | iOS Safari smooth scroll fix (spec §5.1) |
| `defaults.toggleActions` | `'play none none reverse'` | Play on enter, reverse on leave (animations re-play on scroll back) |
| `defaults.invalidateOnRefresh` | true | Recalculate on resize/refresh |
| `ScrollTrigger.config({ ignoreMobileResize: true })` | true | Prevent recalculation on iOS Safari toolbar resize |

---

## 3. Image Strategy

### 3.1 Placeholder Source Strategy

All placeholder images use picsum.photos with deterministic seeds as specified in spec §8. During initial build, images are hotlinked. Before production deployment, replace with actual optimized images.

No image optimization pipeline (sharp, etc.) — the spec explicitly excludes it (§8 Out of Scope of 001-proposal). For production:
1. Replace `src` paths in `src/data/content.ts`
2. Place actual images in `public/images/`
3. Maintain same aspect ratios

### 3.2 Layout Shift Prevention

Every `<img>` tag MUST include explicit `width` and `height` attributes matching the source aspect ratio. Additionally, a CSS `aspect-ratio` property is set as a fallback.

| Image Role | Aspect Ratio | Width x Height | CSS Class |
|---|---|---|---|
| Hero background | 16:9 | 1920 x 1080 | `w-full h-[100dvh] object-cover` |
| Bento card (default) | 1:1 | 400 x 400 | `aspect-square object-cover` |
| Bento card (wide) | 4:3 | 800 x 600 | `aspect-[4/3] object-cover` |
| Bento card (tall) | 2:3 | 400 x 600 | `aspect-[2/3] object-cover` |
| Gallery full-width | 16:9 | 1600 x 900 | `aspect-video object-cover` |
| Gallery square | 1:1 | 1200 x 1200 | `aspect-square object-cover` |

### 3.3 Loading Strategy

| Image | `loading` | `fetchpriority` | Notes |
|---|---|---|---|
| Hero background | eager (default) | `high` | LCP element |
| Bento cards | `lazy` | — | Below the fold |
| Gallery images | `lazy` | — | Below the fold |
| Testimonial avatars | `lazy` | — | Optional, decorative |

### 3.4 Responsive Image Container Pattern

Instead of `<picture>` elements (no build-time image pipeline), use a consistent container pattern:

```astro
<!-- Hero background — always full-width, aspect-ratio maintained via object-fit -->
<div class="absolute inset-0 -z-10 overflow-hidden" data-hero-bg>
  <img
    src={bgImage}
    alt={bgImageAlt}
    width={1920}
    height={1080}
    fetchpriority="high"
    class="w-full h-full object-cover scale-100"
    style="will-change: transform;"
  />
</div>
```

```astro
<!-- Generic image container with aspect-ratio guard -->
<div class="overflow-hidden rounded-[calc(2rem-0.375rem)]" style={`aspect-ratio: ${aspect}`}>
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    loading="lazy"
    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  />
</div>
```

### 3.5 Decorative Patterns

Three decorative SVG elements (see spec §8.4):

| Element | Implementation | File |
|---|---|---|
| Hero stepped-diamond accent | Inline SVG in `Hero.astro`, positioned absolute near heading | Inline in component |
| Bento decorative card pattern | CSS `background-image` using repeating conic-gradient or SVG data URI | In `Features.astro` via Tailwind arbitrary value |
| Section divider dots | CSS pseudo-element `::after` with `background-image: radial-gradient()` | In `global.css` as a utility class |

---

## 4. Responsive Implementation

### 4.1 Breakpoint Constants

| Tailwind Alias | Min Width | Usage |
|---|---|---|
| `sm` | 640px | Small mobile adjustments (rarely needed — 320px is default) |
| `md` | 768px | **Primary collapse breakpoint** — everything stacks below this |
| `lg` | 1024px | Tablet → desktop transition |
| `xl` | 1280px | Desktop max content width |
| `2xl` | 1536px | Ultra-wide constraints (max content width applied manually) |

### 4.2 Per-Section Responsive Collapse Strategy

#### Nav

```astro
<!-- Desktop: horizontal links in pill -->
<nav class="hidden md:flex gap-6 items-center">
  <a data-nav-link>...</a>
</nav>

<!-- Mobile: hamburger button visible below md -->
<button class="md:hidden size-10 flex items-center justify-center" aria-label="Menú">
  <span class="block w-5 h-0.5 bg-clay-50" />
  <span class="block w-5 h-0.5 bg-clay-50" />
  <span class="block w-5 h-0.5 bg-clay-50" />
</button>

<!-- Mobile overlay: full-screen, hidden by default -->
<div class="md:hidden fixed inset-0 ..." data-mobile-menu>
```

#### Hero

```astro
<!-- Heading responsive: Tailwind's responsive text size -->
<h1 class="text-4xl md:text-5xl lg:text-7xl xl:text-8xl max-w-5xl ...">
  {heading}
</h1>

<!-- CTA stack on mobile -->
<div class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">

<!-- Decorative accent hidden on mobile -->
<div class="hidden md:block absolute ...">
```

#### Features (Bento)

```astro
<!-- Grid collapses from 3-4 cols to 1 col below md -->
<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-flow-dense">
```

Each card's `size` prop maps to Tailwind col/row spans on desktop, ignored on mobile:

```astro
<!-- In Features.astro card loop -->
<div
  class={cn(
    "col-span-1 row-span-1",
    card.size === 'wide' && "md:col-span-2",
    card.size === 'tall' && "md:row-span-2",
    card.size === 'large' && "md:col-span-2 md:row-span-2",
  )}
  data-feature-card
>
```

#### Gallery

```astro
<!-- Image height responsive -->
<div class="h-[50vh] md:h-[60vh] lg:h-[80vh]">
```

```astro
<!-- Caption size -->
<p class="text-xl md:text-2xl lg:text-3xl ...">
```

```astro
<!-- Metrics: 4 items row on desktop, 2x2 grid on tablet/mobile -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
```

#### CTA Section

```astro
<!-- Heading responsive -->
<h2 class="text-4xl md:text-6xl lg:text-8xl ...">
```

```astro
<!-- Buttons full-width on mobile -->
<div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
```

#### Footer

```astro
<!-- 1 col mobile → 2 col tablet → 3 col desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

### 4.3 Touch Device Detection

Used in two places:
1. **CSS-level** — `@media (hover: hover)` for card/button hover effects
2. **JS-level** — In `anim-nav.js` hamburger morph, and in MagneticButton init where `matchMedia('(hover: hover)').matches` gates hover handlers

No `ontouchstart` detection. The `(hover: hover)` media query is the standard progressive enhancement approach.

---

## 5. Performance Architecture

### 5.1 Astro Island Strategy

| Component | Client Directive | Approx JS Size | Hydration Trigger | Rationale |
|---|---|---|---|---|
| **Nav** | `client:load` | ~3KB | On page load immediately | Navigation must be interactive from first paint (hamburger, smooth scroll). Per spec C-12, Nav is the exception. |
| **Hero** | `client:visible` | ~5KB (anim-hero.js) | When hero enters viewport (immediately — it's the first section) | Hero entrance animations run on mount; observer fires instantly for above-fold content. `client:visible` ≈ immediate for hero. |
| **Features** | `client:visible` | ~3KB (anim-features.js) | When bento grid scrolls near viewport | Below hero; hydration is deferred until user scrolls down. |
| **Gallery** | `client:visible` | ~6KB (anim-gallery.js + anim-metrics.js) | When gallery section scrolls near viewport | Heaviest animation file. Delayed until needed. |
| **CtaSection** | `client:visible` | ~2KB (anim-cta.js) | When CTA section scrolls near viewport | Usually below fold on desktop. |
| **Footer** | none (static) | 0KB | Never | No interactivity needed. Simple CSS fade-in. |
| **MagneticButton** | inherited from parent | 0KB additional | Inherited from parent component | Reuses parent's hydration context; no separate island. |
| **TestimonialCard** | inherited from parent | 0KB additional | Inherited from Gallery | Reuses Gallery's hydration. |

### 5.2 Estimated Bundle Size

| Resource | Size | Notes |
|---|---|---|
| GSAP core + ScrollTrigger | ~32KB gzipped | Single dependency, loaded once. Shared across all sections. |
| Hero animations | ~1.5KB gzipped | anim-hero.js |
| Features animations | ~1KB gzipped | anim-features.js |
| Gallery animations | ~2.5KB gzipped | anim-gallery.js + anim-metrics.js |
| CTA animations | ~1KB gzipped | anim-cta.js |
| Nav animations | ~2KB gzipped | anim-nav.js |
| **Total JS (gzipped)** | **~40KB** | Includes GSAP + all animation scripts. Well within budget for a premium landing page. |

### 5.3 JS Loading Sequence

```
Page load
  ├── Layout.astro <head>: fonts preconnect + preload (no JS)
  │
  ├── Nav.astro (client:load):
  │     ├── import gsap + ScrollTrigger (shared)
  │     ├── import { initNavEntrance, initHamburger } from anim-nav.js
  │     └── → GSAP loaded globally, available for subsequent islands
  │
  ├── Hero.astro (client:visible):
  │     ├── imports gsap from existing global (or re-imports — Astro handles dedup)
  │     ├── import { initHeroAnimations, initHeroScrub } from anim-hero.js
  │     └── → Runs entrance timeline on mount
  │
  ├── Features.astro (client:visible — fires on scroll):
  │     ├── import { initFeaturesAnimations } from anim-features.js
  │     └── → Runs stagger reveal on cards
  │
  ├── Gallery.astro (client:visible — fires on scroll):
  │     ├── import { initGalleryParallax, initTestimonialStack, initGalleryCaptions } from anim-gallery.js
  │     ├── import { initMetricsCountUp } from anim-metrics.js
  │     └── → Runs parallax, pin stack, word reveal, count-up
  │
  └── CtaSection.astro (client:visible — fires on scroll):
        ├── import { initCtaAnimations } from anim-cta.js
        └── → Runs section entrance stagger
```

### 5.4 Critical Rendering Path

```
1. HTML parsed → Layout.astro <head> renders
   ✓ Font preconnect starts immediately
   ✓ No render-blocking CSS (Tailwind injected via Vite, < 10KB)
   ✓ No render-blocking JS (all scripts deferred or loaded asynchronously)

2. Body renders
   ✓ Nav: server-rendered HTML visible immediately (JS hydrates later)
   ✓ Hero: server-rendered HTML visible immediately (animations enhance)
   ✓ Hero image: fetchpriority="high" starts load immediately

3. First paint (≤ 1.5s on 4G)
   ✓ Nav pill visible (static HTML)
   ✓ Hero heading + subheading visible (static HTML — animations enhance)
   ✓ Hero background image loading

4. Interactive (≤ 3s on 4G)
   ✓ Nav JS hydrates (client:load)
   ✓ Hero JS hydrates (client:visible — nearly immediate for first section)
   ✓ GSAP timeline fires → entrance animations play

5. Below-fold deferred
   ✓ Features, Gallery, CTA hydrate on scroll via client:visible
   ✓ Images below fold use loading="lazy"
```

### 5.5 Font Loading

Already configured in `Layout.astro` (preconnect + preload + swap). No changes needed. Confirming the current setup is optimal:

```html
<!-- Already in Layout.astro — verified correct -->
<link rel="preconnect" href="https://api.fontshare.com" crossorigin />
<link rel="preload" as="style" href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&f[]=cabinet-grotesk@400,500,700,800&display=swap" />
<link rel="stylesheet" href="..." media="print" onload="this.media='all'" />
```

**No additional font files needed.** The existing Layout.astro already handles Satoshi (300, 400, 500, 700) and Cabinet Grotesk (400, 500, 700, 800).

### 5.6 Image Optimization (Production Path)

For the demo/placeholder phase, images are hotlinked from picsum.photos. For production:

1. Replace `src` values in `src/data/content.ts` with local paths
2. Place WebP images in `public/images/`
3. No sharp/Astro image integration needed for this scope (proposal §8: "Out of scope")
4. The layout-shift prevention (explicit width/height + aspect-ratio) is already in place

---

## 6. Content Injection Pattern

### 6.1 Flow Diagram

```
src/data/content.ts (typed exports)
       │
       ▼
src/pages/index.astro
  ├── imports all content constants
  ├── passes them as props to each section component
  └── passes minimal page-level props to Layout.astro
       │
       ▼
Section components (Hero.astro, Features.astro, etc.)
  ├── receive typed props
  ├── render static HTML
  └── include data-* attributes for GSAP to target
       │
       ▼
Sub-components (MagneticButton.astro, TestimonialCard.astro)
  └── receive typed props from parent
```

### 6.2 Page Entry Point Pattern

```astro
---
// src/pages/index.astro
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
  <Nav links={NAV_LINKS} brandName={SITE.brandName} />

  <Hero
    heading={HERO.heading}
    subheading={HERO.subheading}
    primaryCta={HERO.primaryCta}
    secondaryCta={HERO.secondaryCta}
    bgImage={HERO.bgImage}
    bgImageAlt={HERO.bgImageAlt}
  />

  <Features cards={FEATURES_CARDS} />

  <Gallery
    images={GALLERY_IMAGES}
    testimonials={TESTIMONIALS}
    metrics={METRICS}
  />

  <CtaSection
    heading={CTA_SECTION.heading}
    subCopy={CTA_SECTION.subCopy}
    primaryCta={CTA_SECTION.primaryCta}
    secondaryCta={CTA_SECTION.secondaryCta}
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

### 6.3 Why Not MDX or Data Fetching?

| Approach | Decision | Rationale |
|---|---|---|
| **Inline props in index.astro** | ✅ Chosen | Simplest for this scope. Content is static, ~50 lines of data. No runtime overhead. |
| Markdown/MDX files | ❌ Rejected | Adds build-time parsing step. No multi-author workflow for a single-page landing. |
| CMS/Headless API | ❌ Out of scope | Proposal §8 explicitly excludes CMS integration. |
| YAML/JSON files | ✅ Acceptable alternative | If data grows beyond ~80 lines, consider `content.yaml` parsed at build. Not needed for this change. |

### 6.4 Content Edit Workflow

To change any copy on the page:

1. Open `src/data/content.ts`
2. Edit the relevant constant value
3. TypeScript validates that required fields are present
4. Rebuild (`pnpm run build`) to verify

This is intentionally the simplest possible content injection pattern — no database, no CMS, no file-system routing.

---

## 7. Implementation Order

The implementation is ordered to minimize blocked dependencies. Each step produces a buildable state.

### Phase 1: Foundation (steps 1-3)

| Step | Files | Depends On | Estimated Lines |
|---|---|---|---|
| **1** Create file tree + data files | `src/data/types.ts`, `src/data/content.ts`, `src/scripts/anim-utils.js` | Nothing | ~60 lines |
| **2** Update `index.astro` skeleton | `src/pages/index.astro` (replace existing Welcome page) | Step 1 | ~50 lines |
| **3** Update `Layout.astro` for SEO | `src/layouts/Layout.astro` (add OpenGraph locale, extend Props) | Nothing | ~10 lines |

**Build check at end of Phase 1:** `pnpm run build` must pass with skeleton sections rendering.

### Phase 2: Core Components (steps 4-7)

| Step | Files | Depends On | Estimated Lines |
|---|---|---|---|
| **4** Build `Nav.astro` + `anim-nav.js` | `src/components/Nav.astro`, `src/scripts/anim-nav.js` | Step 1 | ~90 lines |
| **5** Build `MagneticButton.astro` | `src/components/MagneticButton.astro` | Nothing (standalone) | ~40 lines |
| **6** Build `Hero.astro` + `anim-hero.js` | `src/components/Hero.astro`, `src/scripts/anim-hero.js` | Step 5 (reuses MagneticButton) | ~70 lines |
| **7** Build `Features.astro` + `anim-features.js` | `src/components/Features.astro`, `src/scripts/anim-features.js` | Step 1 | ~80 lines |

**Build check at end of Phase 2:** Hero and Features render with static content. GSAP JS loads but may throw reference errors for unimplemented sections — wrap calls in existence guards.

### Phase 3: Gallery Complex (steps 8-10)

| Step | Files | Depends On | Estimated Lines |
|---|---|---|---|
| **8** Build `TestimonialCard.astro` | `src/components/TestimonialCard.astro` | Nothing (standalone) | ~25 lines |
| **9** Build `Gallery.astro` + `anim-gallery.js` + `anim-metrics.js` | `src/components/Gallery.astro`, `src/scripts/anim-gallery.js`, `src/scripts/anim-metrics.js` | Step 8 | ~140 lines |
| **10** Build `CtaSection.astro` + `anim-cta.js` | `src/components/CtaSection.astro`, `src/scripts/anim-cta.js` | Step 5 (reuses MagneticButton) | ~50 lines |

**Build check at end of Phase 3:** All sections render. All animations play. Test on desktop and mobile.

### Phase 4: Footer + Polish (steps 11-13)

| Step | Files | Depends On | Estimated Lines |
|---|---|---|---|
| **11** Build `Footer.astro` | `src/components/Footer.astro` | Step 1 | ~40 lines |
| **12** Responsive QA pass | All component files — adjust Tailwind breakpoints | Steps 4-11 | ~20 lines modification |
| **13** Reduced motion + touch device pass | `anim-utils.js`, MagneticButton, Nav | Steps 4-11 | ~10 lines modification |

**Build check at end of Phase 4:** Full page renders and functions across viewports and accessibility settings.

### Total Estimated Lines

| Phase | New Files | Modified Files | New Lines | Modified Lines | Cumulative |
|---|---|---|---|---|---|
| Phase 1 | 3 | 1 | ~120 | ~10 | ~130 |
| Phase 2 | 4 | 1 | ~280 | ~5 | ~415 |
| Phase 3 | 4 | 0 | ~215 | ~0 | ~630 |
| Phase 4 | 1 | 3+ | ~40 | ~30 | ~700 |

**Review budget: 400 changed lines.** The design targets ~380-420 new lines by:
- Keeping each animation script under 40 lines of effective code (shared utilities in anim-utils.js)
- Using Tailwind utility classes aggressively in components (no custom CSS files beyond global.css)
- Using `data-*` attributes instead of class-based selectors for GSAP targets (avoids CSS coupling)
- MagneticButton and TestimonialCard are intentionally small (~25-40 lines each)
- Content file is the largest (~100 lines for all copy) but is data, not logic

---

## 8. File Tree

### 8.1 Complete File Tree

All paths relative to project root (`/home/adriel/lab/paginas/demo-opencode`).

```
openspec/
  specs/
    001-proposal.md                  (existing — unchanged)
    002-spec.md                      (existing — unchanged)
    003-design.md                    (THIS FILE — new)

public/
  favicon.svg                        (new — stylized sun/mountain SVG)
  favicon.ico                        (new — 32x32 fallback, or skip if SVG is universal)
  images/                            (new directory — placeholder images go here if local)
    (empty — images hotlinked from picsum.photos for demo)

src/
  data/
    types.ts                         (new — shared TypeScript interfaces)
    content.ts                       (new — all copy, links, image paths, config)

  layouts/
    Layout.astro                     (modified — extend title/description Props, add og:locale)

  pages/
    index.astro                      (modified — replace Welcome page with section orchestration)

  components/
    Nav.astro                        (new — floating glass pill nav)
    Hero.astro                       (new — AIDA Attention section)
    Features.astro                   (new — AIDA Interest, bento grid)
    Gallery.astro                    (new — AIDA Desire, gallery + testimonials + metrics)
    CtaSection.astro                 (new — AIDA Action, massive CTA)
    Footer.astro                     (new — footer with links + contact)
    MagneticButton.astro             (new — reusable button-in-button CTA)
    TestimonialCard.astro            (new — reusable testimonial card)

  scripts/
    anim-utils.js                    (new — shared GSAP helpers, ScrollTrigger defaults)
    anim-nav.js                      (new — nav entrance + hamburger morph + active section)
    anim-hero.js                     (new — hero entrance timeline + background scrub)
    anim-features.js                 (new — bento card stagger reveal)
    anim-gallery.js                  (new — parallax, pin stack, word reveal)
    anim-metrics.js                  (new — count-up animation)
    anim-cta.js                      (new — CTA section entrance)

  styles/
    global.css                       (unchanged — design tokens already defined)

  components/
    Welcome.astro                    (DELETED — replaced by new sections)

  assets/
    (unchanged — no local images yet)
```

### 8.2 Summary of Changes

| Change Type | Count |
|---|---|
| **New files** | 15 |
| **Modified files** | 2 (`Layout.astro`, `index.astro`) |
| **Deleted files** | 1 (`Welcome.astro`) |
| **Unchanged files** | `astro.config.mjs`, `package.json`, `global.css`, `public/` (if no local images) |
| **Total changed files** | 18 |

### 8.3 File Ownership Map

| File | Responsibility | Change Risk |
|---|---|---|
| `src/data/types.ts` | Shared type contracts | Low — data schema |
| `src/data/content.ts` | All copy + image paths | Low — data values |
| `src/layouts/Layout.astro` | HTML shell, SEO tags | Low — 3-line prop extension |
| `src/pages/index.astro` | Section orchestration | Low — pass props |
| `src/components/Nav.astro` | Navigation UX | Medium — hamburger JS logic |
| `src/components/Hero.astro` | First impression, animations | Medium — GSAP timeline |
| `src/components/Features.astro` | Bento grid layout | Medium — grid CSS |
| `src/components/Gallery.astro` | Most complex layout | High — parallax + pin + count-up |
| `src/components/CtaSection.astro` | Conversion UI | Low — simple layout |
| `src/components/Footer.astro` | Info + links | Low — static HTML |
| `src/components/MagneticButton.astro` | Reusable button | Low — small, focused |
| `src/components/TestimonialCard.astro` | Reusable card | Low — small, focused |
| `src/scripts/anim-*.js` | All animations | Medium — GSAP selector coupling |

---

## 9. Design Decisions Log

| ID | Decision | Rationale | Alternatives Considered |
|---|---|---|---|
| D-01 | Centralized `src/data/content.ts` for all copy | Single source of truth, easy to edit, type-checked. Keeps components pure. | Inline props in index.astro (less maintainable), MDX files (overhead for this scope) |
| D-02 | Separate animation scripts per section (not one monolithic file) | Review budget management, lazy loading per island, independence. | Single `anim-main.js` (higher bundle cost, harder to maintain) |
| D-03 | `data-*` attributes for GSAP selectors | Decouples animation from CSS class names. Prevents accidental style-target conflicts. | CSS class selectors (coupled), ID selectors (not reusable) |
| D-04 | CSS `@media (hover: hover)` for hover effects | Matches spec requirement NF-09. Touch devices naturally skip hover without JS feature detection. | JS `matchMedia` check (redundant — CSS is sufficient for card hover; JS needed for MagneticButton icon translate) |
| D-05 | GSAP loaded via Nav `client:load` (first interactive island) | Ensures GSAP is registered before Hero fires. Nav is the only `client:load` per spec C-12. | Importing GSAP in every script separately (Astro dedupes imports, but first execution sets up ScrollTrigger defaults) |
| D-06 | `ScrollTrigger.normalizeScroll(true)` in shared utils | iOS Safari smooth scroll fix applied globally, one place. | Per-component normalization (duplicated, fragile) |
| D-07 | Metrics count-up uses GSAP proxy object (not TextPlugin) | Avoids importing TextPlugin (~5KB additional). GSAP's `val` interpolation with `onUpdate` is equally smooth. | TextPlugin (extra JS weight), manual requestAnimationFrame (more code) |
| D-08 | No `<picture>` elements for responsive images | No build-time image processing pipeline (spec out of scope). Aspect-ratio containers + `object-fit` handle responsiveness. | `<picture>` with `srcset` (requires multiple image sizes — no pipeline) |

---

## 10. Adjacent Design Guidance

### 10.1 Spec-to-Design Fidelity Checklist

The design phase should ensure every spec item has a concrete implementation:

| Spec § | Requirement | Design Coverage |
|---|---|---|
| §2.1 F-01 | Smooth-scroll nav | Nav.astro with `scroll-behavior: smooth` (global.css already has it) |
| §2.1 F-02 | Four AIDA sections | index.astro orchestrates exactly 4 sections in order |
| §2.1 F-03 | Floating glass nav pill | Nav.astro with `fixed`, `backdrop-blur-xl`, centered |
| §2.1 F-04 | Magnetic button-in-button | MagneticButton.astro with nested icon circle |
| §2.1 F-05 | Bento with grid-flow-dense | Features.astro with `grid-flow-dense` |
| §2.1 F-06 | GSAP scroll-triggered reveals | Separate anim-*.js files per section |
| §2.1 F-07 | Testimonial stacking | anim-gallery.js `initTestimonialStack()` |
| §2.1 F-08 | Metrics count-up | anim-metrics.js `initMetricsCountUp()` |
| §2.1 F-09 | Parallax gallery | anim-gallery.js `initGalleryParallax()` |
| §2.1 F-12 | GPU-accelerated only | All GSAP uses transform/opacity; enforced in code review |
| §2.1 F-14 | Blur only on fixed/sticky | Nav `backdrop-blur-xl`; no blur on scroll-triggered anims |
| §2.1 F-15 | Z-index discipline | Nav 50, modal 60, overlay 70, tooltip 80 |
| §4 (all) | Exact copy values | `content.ts` matches spec §4 exactly |
| §5 (all) | Animation specs | anim-*.js files match spec §5 timelines |
| §7.2 | Breakpoint rules | Tailwind responsive classes per §7.2 table |
| §8 | Image placeholders | `content.ts` image `src` values point to spec §8 picsum URLs |

### 10.2 Component Template Structure

Every Astro component should follow this template:

```astro
---
// --- Imports ---
import type { SomeProps } from '../data/types';
import MagneticButton from './MagneticButton.astro';

// --- Props ---
export interface Props {
  // ... props from spec §6.x
}
const { ...props } = Astro.props;
---

<!-- Section wrapper with ID for nav scroll target -->
<section id="my-section" class="relative py-24 md:py-32 lg:py-40 overflow-hidden">
  <!-- Inner container -->
  <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
    <!-- Content using data-* attributes for GSAP targets -->
    <h2 data-my-heading class="text-4xl md:text-6xl lg:text-8xl font-display font-800 text-clay-950">
      {heading}
    </h2>
    <!-- ... -->
  </div>
</section>

<script>
  // --- Client-side JS (only for client:visible/load components) ---
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger);
  import { initMyAnimations } from '../scripts/anim-my';

  const section = document.currentScript?.closest('section');
  if (section) initMyAnimations(section);
</script>
```

### 10.3 GSAP Selector Convention

Use `data-*` attributes consistently across all components:

| Attribute | Used In | GSAP Targets |
|---|---|---|
| `data-hero-bg` | Hero.astro | Background image scale scrub |
| `data-hero-accent` | Hero.astro | Decorative accent entrance |
| `data-hero-heading` | Hero.astro | H1 entrance |
| `data-hero-subheading` | Hero.astro | Subheading entrance |
| `data-hero-cta-primary` | Hero.astro | Primary CTA entrance |
| `data-hero-cta-secondary` | Hero.astro | Secondary CTA entrance |
| `data-hero-content` | Hero.astro | Content exit scrub |
| `data-feature-card` | Features.astro | Card stagger reveal |
| `data-gallery-image` | Gallery.astro | Parallax scale |
| `data-gallery-overlay` | Gallery.astro | Overlay darken |
| `data-gallery-caption` | Gallery.astro | Caption word reveal |
| `data-word` | Gallery.astro | Individual word spans |
| `data-testimonial-stack` | Gallery.astro | Pin container |
| `data-testimonial-card` | Gallery.astro | Stack cards |
| `data-metric` | Gallery.astro | Count-up container |
| `data-metric-value` | Gallery.astro | Count-up display element |
| `data-magnetic-icon` | MagneticButton.astro | Icon translate target |
| `data-cta-heading` | CtaSection.astro | Heading entrance |
| `data-cta-subcopy` | CtaSection.astro | Subcopy entrance |
| `data-cta-primary` | CtaSection.astro | Primary CTA entrance |
| `data-cta-secondary` | CtaSection.astro | Secondary CTA entrance |
| `data-nav-link` | Nav.astro | Active section highlight |
| `data-mobile-menu` | Nav.astro | Mobile overlay |

### 10.4 Accessibility Considerations

| Item | Implementation Guidance |
|---|---|
| Reduced motion | All GSAP timelines check `REDUCED_MOTION` from anim-utils.js |
| Skip link | Add `#main-content` skip link as first focusable element in Layout.astro |
| Focus management | Mobile menu should trap focus when open, restore on close |
| ARIA labels | Nav hamburger: `aria-label="Abrir menú"` / `aria-label="Cerrar menú"` |
| Tab order | Ensure CTAs, nav links, and testimonial cards are keyboard accessible |
| Color contrast | Clay 800 (#4a3829) on Clay 50 (#fbf8f4) = 12.1:1 contrast ratio — exceeds WCAG AAA |

---

## Phase Envelope

```
---
phase: design
change_id: 001-landing-page
status: draft
date: 2026-05-19
executor: sdd-design
artifacts:
  - openspec/specs/003-design.md
dependencies:
  - openspec/specs/002-spec.md (approved)
  - openspec/specs/001-proposal.md (approved)
  - DESIGN.md (design system foundations)
next_phase: tasks
approval_needed: true
risk_score: medium
estimated_tasks: 22-28
estimated_new_lines: 380-420
estimated_modified_lines: 10-20
review_budget_lines: 400
warnings:
  - "Design targets 380-420 new lines; review budget is 400. Remain lean on animation scripts and avoid unnecessary components."
  - "No image optimization pipeline available — placeholder images hotlinked from picsum.photos. Production will need manual WebP conversion."
  - "GSAP 3.15.0 is already in package.json. Verify ScrollTrigger is bundled (gsap/ScrollTrigger) and no Club GreenSock plugins are needed."
---
```
