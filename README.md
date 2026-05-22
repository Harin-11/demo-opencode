# Rutas del Sol — Landing Page

> Turismo receptivo en Arequipa · Caminos que cuentan historias

Landing page premium para **Rutas del Sol**, una agencia de turismo receptivo en la región de Arequipa, Perú. Diseñada con identidad visual Cultural-Artesanal inspirada en el legado textil andino.

Construida con **Astro 6** + **React 19** + **Tailwind v4** + **Framer Motion**, siguiendo la arquitectura de componentes del sistema de diseño `DESIGN.md`.

## Stack

| Capa        | Tecnología                              |
| ----------- | --------------------------------------- |
| Framework   | [Astro](https://astro.build) 6.3.5      |
| UI          | React 19 + TypeScript                   |
| Estilos     | Tailwind CSS v4 + CSS custom properties |
| Animaciones | Framer Motion 12                        |
| Iconos      | Tabler Icons + Base UI + Lucide React   |
| Componentes | shadcn/ui sobre Base UI React           |

## Estructura del proyecto

```
src/
├── components/
│   ├── ui/                    # Componentes Base UI / shadcn
│   │   ├── button.tsx
│   │   ├── navigation-menu.tsx
│   │   └── sheet.tsx
│   ├── PageEntrance.tsx       # Pantalla de entrada animada
│   ├── Nav.tsx                # Navegación flotante glass
│   ├── Hero.tsx               # Hero cinematográfico
│   ├── Features.tsx           # Bento grid de experiencias
│   ├── Itineraries.tsx        # Itinerarios expandibles
│   ├── TrustBar.tsx           # Logos de medios (marquee)
│   ├── Gallery.tsx            # Galería + testimonios
│   ├── CtaSection.tsx         # CTA + métricas
│   └── Footer.tsx             # Footer completo
├── data/
│   ├── content.ts             # Contenido centralizado
│   └── types.ts               # Interfaces TypeScript
├── layouts/
│   └── Layout.astro           # Layout principal con SEO
├── pages/
│   └── index.astro            # Punto de entrada
└── styles/
    └── global.css             # Tokens de diseño + tema
```

## AIDA Narrative

La página sigue una estructura AIDA de cuatro secciones narrativas:

1. **Attention** — Hero cinematográfico a pantalla completa
2. **Interest** — Bento grid de experiencias
3. **Desire** — Galería cinemática + testimonios
4. **Action** — CTA masivo + footer

## Comandos

| Comando               | Acción                                      |
| :-------------------- | :------------------------------------------ |
| `pnpm install`        | Instalar dependencias                       |
| `pnpm dev`            | Servidor de desarrollo en `localhost:4321`  |
| `pnpm build`          | Build a producción en `dist/`               |
| `pnpm preview`        | Previsualizar build local                   |
| `pnpm astro`          | CLI de Astro                                |
| `pnpm audit`          | Auditoría Lighthouse (requiere dev server)  |
| `pnpm test`           | Tests Playwright                            |

## SDD / OpenSpec

Este proyecto se desarrolló con el flujo **SDD (Spec-Driven Development)** usando artefactos OpenSpec en `openspec/specs/`:

- `000-initialization-report.md` — Estado inicial del proyecto
- `001-proposal.md` — Propuesta y alcance
- `002-spec.md` — Especificación detallada
- `003-design.md` — Diseño técnico y arquitectura
- `004-tasks.md` — Desglose de tareas de implementación
