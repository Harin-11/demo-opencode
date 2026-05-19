# Pi Agent Configuration — demo-opencode

## Package Manager

**ALWAYS use `pnpm`** for all package management operations.

- `pnpm add <pkg>` — install dependencies
- `pnpm dlx <cmd>` — run packages without installing
- `pnpm dev` / `pnpm build` / `pnpm preview` — run scripts
- Never use `npm` under any circumstance.
- Never use `npx`.
- Never use `yarn`.

## Project Tech

- **Framework**: Astro
- **Package Manager**: pnpm
- **Language**: TypeScript (strict)
- **Styling**: CSS + Tailwind when needed
- **Animations**: GSAP + ScrollTrigger

## Memory

- **Engram** persistent memory is available for this project.
- Save significant decisions, bugfixes, and patterns to Engram with `mem_save`.
- Use `mem_context` to recall prior decisions.
- Session summaries should use `mem_session_summary`.

## SDD

- OpenSpec artifacts in `openspec/` directory.
- Design decisions recorded in Engram.
- Interactive mode: get user approval between SDD phases.
