# CLAUDE.md

Guidance for Claude Code working in this repository. Read fully before making changes.

## Project

Personal engineering portfolio. Next.js (App Router) + TypeScript + Tailwind CSS v4 + ESLint.

- Package manager: npm (`package-lock.json` is committed; do not add other lockfiles).
- Node: v20.9+ required by Next 16; developed on Node 25.

## Mandatory skill workflow

Every UI change follows these phases in order. Do not skip a phase, and do not claim a phase was applied unless the skill was actually invoked.

| Phase | Skill(s) | Purpose |
|---|---|---|
| BUILD | `frontend-design` (Anthropic) | Produce the component/page implementation. |
| STYLE | `taste` / `design-taste-frontend` + `UI/UX Pro Max` | Apply visual taste, hierarchy, spacing, typography, color, and UX patterns. |
| CHECK | `Impeccable` + Vercel `agent-skills` | Review for quality defects and React/Next.js best practices. |
| SHIP PREMIUM | Final production-quality acceptance review | Last gate before a feature is considered done. |

Rules:

1. Before starting UI work, confirm each skill is available (listed as a skill in the session). If one is missing, stop and tell the user which skill is missing. Do not silently substitute another approach and present it as the workflow.
2. Record which phases ran in the summary for each UI change (e.g. "BUILD ✔ STYLE ✔ CHECK ✔ SHIP PREMIUM ✔").
3. CHECK findings must be fixed or explicitly deferred with a reason. Nothing is shipped with unresolved findings.
4. No homepage or portfolio section is built until the user asks for it. Scaffolding and infrastructure work does not require the design workflow.

## Next.js version caveat

This is Next.js 16, which has breaking changes from earlier versions. Before writing framework code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices. See `AGENTS.md`; do not remove the block it generates.

## Project structure

```
src/
  app/              Routes, layouts, metadata, global CSS (App Router only)
  components/
    ui/             Generic, reusable primitives (Button, Link, Container, ...)
    sections/       Page-level sections composed of ui/ primitives
  content/          Structured portfolio content (projects, experience, copy)
  lib/              Pure utilities and helpers (no React, no side effects)
  types/            Shared TypeScript types
public/             Static assets (images, icons, fonts)
```

Dependency direction: `app` → `components` → `lib` / `types` / `content`. `lib` and `types` must not import from `components` or `app`.

## Engineering standards

### TypeScript
- `strict` stays on. No `any`; use `unknown` and narrow. No `@ts-ignore` without a comment explaining why.
- Prefer explicit types for exported functions and component props.
- Keep TypeScript on 5.x. TypeScript 7 (native rewrite) is not used until Next.js officially supports it.

### React and Next.js
- Server Components by default. Add `"use client"` only when a component needs state, effects, or browser APIs; push it to the leaf.
- Use `next/image`, `next/link`, and `next/font`. No raw `<img>` for content images.
- Set `metadata` per route. Every page needs a unique title and description.
- Avoid unnecessary client JavaScript; do not add libraries for things CSS or the platform can do.

### Styling
- Tailwind CSS v4. Design tokens (color, type scale, spacing, radius) are defined once in `src/app/globals.css` via `@theme`; components reference tokens, not hard-coded hex values.
- Support light and dark via tokens. Respect `prefers-reduced-motion` for any animation.
- Mobile-first. Verify layouts at 360px, 768px, and 1280px widths. No horizontal scroll at any of them.

### Accessibility
- Semantic HTML first (`header`, `main`, `nav`, `section` with headings, `button` for actions).
- Every interactive element is keyboard reachable with a visible focus state.
- Text contrast meets WCAG AA (4.5:1 body, 3:1 large text). Images have meaningful `alt`, or `alt=""` when decorative.

### Performance
- No layout shift from images or fonts (set width/height or aspect ratio).
- Keep the initial JS bundle lean; check `npm run build` output for route sizes when adding dependencies.

### Dependencies
- Add a dependency only with a clear reason. Prefer the platform and existing packages.
- Use exact-compatible versions: install the latest stable release that satisfies peer dependencies.
- Keep `npm audit` free of high/critical findings in production dependencies.

### Code quality
- Files and folders: `kebab-case` for files, `PascalCase` for component names, `camelCase` for functions and variables.
- One component per file. Keep files focused; split when a file grows past roughly 200 lines.
- No dead code, commented-out code, or `console.log` left in committed changes.

## Commands

```bash
npm run dev     # Development server (http://localhost:3000)
npm run build   # Production build; must pass before shipping
npm run start   # Serve the production build
npm run lint    # ESLint; must pass with zero errors
```

Verification before reporting a change as done: `npm run lint` and `npm run build` both succeed. For UI changes, also check the page in the dev server at phone and desktop widths.

## Git

- Do not commit or push unless the user asks.
- Commit messages: imperative mood, concise subject line, body explains why when non-obvious.
