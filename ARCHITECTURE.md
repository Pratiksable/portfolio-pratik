# ARCHITECTURE.md

Technical architecture for Pratik Sable's portfolio. Built on the approved direction in `DESIGN_BLUEPRINT.md` (Engineering Journal spine, with a Mission Control homepage moment and a keyboard search accelerator from the Developer OS concept).

**Status:** Proposed for review. No pages are built yet. Nothing here is implemented.
**Related:** `PRODUCT_PLAN.md` (requirements and backlog), `DESIGN_SYSTEM.md` (component and interaction rules), `CLAUDE.md` (engineering standards and skill workflow).

**Framework facts checked against the installed docs** (`node_modules/next/dist/docs/` for Next 16.4.6):
- `cacheComponents: true` and `partialPrefetching: true` are already set in `next.config.ts`. Static output is the default target for this site.
- MDX with the App Router needs `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, and an `mdx-components.tsx` file at the project root. Versions are to be confirmed at install time.
- Static routes with dynamic segments use `generateStaticParams`.

**Versions to confirm at install time:** all new dependencies are proposed, not added. Each one is pinned to the latest stable release that matches the installed peers.

---

## 1. Architecture summary

- **Type:** static-first Next.js 16 site. Every route is prerendered at build time.
- **Content:** structured data (TypeScript modules or JSON) for lists and facts; MDX for long-form narrative (case studies, journal entries, experiment write-ups). All content lives in the repository.
- **Backend:** none for the first release. See §11.
- **Rendering:** React Server Components by default. Client components only at the leaves that need state or browser APIs.
- **Styling:** Tailwind CSS v4 with design tokens defined once (see `DESIGN_SYSTEM.md`).
- **Quality gates:** content validation at build, lint, type-check, unit and component tests, end-to-end and accessibility tests, and a production build that must pass before any change is considered done.

```
Content (MDX + typed data)
        │  build-time validation (schema, disclosure rules)
        ▼
Static build (prerender every route, search index JSON)
        │
        ▼
Static hosting (CDN) ──► browser: RSC payload + small client islands
```

---

## 2. Next.js route structure

Route groups keep the shell (header, footer, skip link) shared, without affecting URLs.

```
app/
├── layout.tsx                    Root: <html>, fonts, metadata defaults, skip link target
├── not-found.tsx                 404 (site shell)
├── robots.ts                     robots.txt
├── sitemap.ts                    sitemap.xml, built from content
├── (site)/
│   ├── layout.tsx                Site shell: SiteHeader, MobileNav, SiteFooter, search provider
│   ├── page.tsx                  /                     Home (Briefing)
│   ├── projects/
│   │   ├── page.tsx              /projects             Projects index (+ filters via URL params)
│   │   └── [slug]/
│   │       ├── page.tsx          /projects/[slug]      Case study (MDX)
│   │       └── opengraph-image.tsx   (later, optional)
│   ├── journal/
│   │   ├── page.tsx              /journal              Journal index
│   │   └── [slug]/page.tsx       /journal/[slug]       Journal entry (MDX)
│   ├── lab/
│   │   ├── page.tsx              /lab                  Lab index (status filter)
│   │   └── [slug]/page.tsx       /lab/[slug]           Experiment record (MDX)
│   ├── skills/page.tsx           /skills               Skills by problem domain
│   ├── about/page.tsx            /about                About, experience, focus areas
│   ├── now/page.tsx              /now                  Dated current work
│   └── contact/page.tsx          /contact              Channels, résumé download
└── (feeds)/                      (later, optional) feed.xml for Journal
```

**Rules**
- Every route is a Server Component unless a child opts into client code.
- `[slug]` routes export `generateStaticParams` from the content index, so each entry is prerendered. A missing slug returns `notFound()`.
- `dynamicParams` is `false` on slug routes, so unknown slugs 404 at build time rather than at request time.
- Filters on `/projects` and `/lab` are URL search params (`?domain=…&stack=…`). The page reads them on the server and renders the matching subset, so filtered views are shareable and need no client data fetching.
- No `app/api/` directory in the first release. Adding one is a backend decision (see §11).

**Metadata:** each route exports `metadata` or `generateMetadata`. Titles and descriptions come from content (FR-06, NFR-05).

---

## 3. Reusable component hierarchy

Three layers, matching the design system's component rules (`DESIGN_SYSTEM.md` §4).

```
src/components/
├── ui/                  Primitives. No knowledge of content types. Server-safe unless noted.
│   ├── button.tsx
│   ├── link.tsx             Wraps next/link; external-link handling
│   ├── badge.tsx            Text + shape + tone. Used for disclosure, status, and tags
│   ├── tag-list.tsx
│   ├── container.tsx        Max width and gutters
│   ├── stack.tsx            Vertical rhythm
│   ├── prose.tsx            Typography for MDX output
│   ├── figure.tsx           Image + required alt + optional caption (only when it adds meaning)
│   ├── kbd.tsx
│   ├── visually-hidden.tsx
│   ├── skip-link.tsx
│   └── disclosure.tsx       Native <details>-based disclosure (no JS required)
│
├── layout/              Shell. Stateless except the mobile nav and header scroll state.
│   ├── site-header.tsx
│   ├── primary-nav.tsx      Four items; aria-current on the active item
│   ├── mobile-nav.tsx       Bottom bar under 768px; client (active route only)
│   ├── site-footer.tsx
│   └── breadcrumb.tsx
│
├── content/             Patterns built from ui/ for specific content types. Server components.
│   ├── project-row.tsx
│   ├── project-list.tsx
│   ├── decision-headline.tsx
│   ├── options-comparison.tsx   Compound: Options / Option / Reason
│   ├── decision-record.tsx
│   ├── domain-section.tsx
│   ├── experience-timeline.tsx
│   ├── entry-list.tsx           Journal and Lab shared list by date
│   ├── status-badge.tsx         Maps status to badge variants (no color-only meaning)
│   ├── disclosure-note.tsx
│   └── related-entries.tsx
│
├── mdx/                 Components available inside MDX via mdx-components.tsx
│   ├── margin-note.tsx          Client: toggles a note (see §6)
│   ├── figure-artifact.tsx      Figure with required alt, checked at build
│   ├── callout.tsx
│   └── replay.tsx               Client, lazy-loaded (B-043, later)
│
├── features/            Interactive features. Client components, lazy where possible.
│   ├── search/
│   │   ├── search-trigger.tsx   Client: `/` and ⌘K shortcuts, opens dialog
│   │   ├── search-dialog.tsx    Client: native <dialog>, focus trap, arrow navigation
│   │   └── use-search-index.ts  Loads the index JSON on first open only
│   ├── toc/
│   │   └── toc-tracker.tsx      Client: reading position (IntersectionObserver)
│   ├── filters/
│   │   └── filter-bar.tsx       Client: writes URL params; server renders the result
│   └── entrance/
│       └── home-entrance.tsx    CSS-only entrance moment, reduced-motion aware
│
└── lib-types/ (types only, no components)
```

**Composition rules**
- Prefer explicit variants over boolean props. For example, `<Badge tone="learning">` rather than `<Badge learning isOutlined isSmall>`.
- Compound components for multi-part patterns: `OptionsComparison` with `.Option` and `.Reason`, `FilterBar` with `.Group` and `.Reset`. This follows the Vercel composition guidance installed in `.agents/skills/vercel-composition-patterns`.
- `ui/` never imports from `content/`, `features/`, or `app/`. `content/` never imports from `features/`, except through props.
- Client components receive serializable props only. Data loading happens in Server Components.

---

## 4. Content schemas

All content is validated at build time with a schema library (proposed: **zod**, to be added at install time). A failed validation fails the build (FR-23).

### 4.1 Shared types

```ts
type Disclosure = 'public' | 'sanitized' | 'summary-only';
type ContentStatus = 'draft' | 'published';
type IsoMonth = `${number}-${number}`;        // "2024-03"
type IsoDate = `${number}-${number}-${number}`; // "2024-03-15"
type DomainId = string;                       // references skills.domains[].id
```

### 4.2 Project (case study)

```ts
type ProjectEntry = {
  slug: string;                  // unique within projects
  type: 'project';
  title: string;
  status: ContentStatus;
  period: { start: IsoMonth; end: IsoMonth | 'present' };
  role: string;
  disclosure: Disclosure;
  disclosureNote: string;        // what is withheld and why; shown on the page
  domains: DomainId[];           // at least one
  stack: string[];               // technology tags
  decisionHeadline: string;      // "Chose X over Y because Z"
  summary: string;               // one to two sentences
  related: string[];             // project or journal slugs
  updated: IsoDate;
  artifacts: Artifact[];
  metrics?: Metric[];            // only with approval and a source (see below)
};

type Artifact = {
  src: string;                   // path under public/content/projects/<slug>/
  alt: string;                   // required, non-empty
  kind: 'diagram' | 'sketch' | 'ui-capture';
  width: number;
  height: number;
};

type Metric = {
  label: string;
  value: string;
  source: string;                // required
  approvedBy: 'user';            // required literal; the build rejects anything else
  approvedOn: IsoDate;
};
```

**Body structure.** The MDX body must contain these headings in this order: `Context`, `Problem`, `Constraints`, `Options considered`, `Decision`, `Validation`, `Learnings`. A build check enforces presence and order (FR-05).

**Disclosure rules enforced by the build**
- `disclosure: 'summary-only'` forbids `artifacts` and `metrics`.
- `disclosure: 'sanitized'` requires `disclosureNote` to be non-empty.
- Any `Metric` without `approvedBy: 'user'` fails the build (see PRODUCT_PLAN §7).

### 4.3 Experience

```ts
type ExperienceEntry = {
  id: string;
  company: string;               // as disclosable; may be a generic description
  role: string;
  period: { start: IsoMonth; end: IsoMonth | 'present' };
  disclosure: Disclosure;
  highlights: Array<{
    text: string;                // decision-level, not a duty list
    linkedProject?: string;      // slug; build fails if it does not exist
  }>;
};
```

### 4.4 Skills

Skills are organized by problem domain (FR-07, Blueprint §4.8). Each domain must have at least one evidence entry.

```ts
type SkillDomain = {
  id: DomainId;
  title: string;                 // a problem, not a technology
  summary: string;               // two sentences: what was done and where it is weaker
  status: 'practiced' | 'learning';   // "learning" domains are labelled on the page (FR-08)
  tags: string[];                // technologies used in this domain
  evidence: string[];            // project, journal, or lab slugs; required when practiced
};
```

**Build rules:** `evidence` slugs must resolve; a `practiced` domain with no evidence fails the build. Every `ProjectEntry.domains` value must exist in `skills.domains`.

### 4.5 Journal entry

```ts
type JournalEntry = {
  slug: string;
  type: 'journal';
  title: string;
  status: ContentStatus;
  date: IsoDate;
  tags: string[];
  summary: string;
  related: string[];
};
```

### 4.6 Lab experiment

```ts
type ExperimentEntry = {
  slug: string;
  type: 'experiment';
  title: string;                 // phrased as the question
  status: 'open' | 'concluded' | 'abandoned';
  date: IsoDate;
  domains: DomainId[];
  abandonedReason?: string;      // required when status is 'abandoned'
  conclusion?: string;           // required when status is 'concluded'
  replay?: { transcriptPath: string };   // later (B-043)
};
```

### 4.7 Now

```ts
type NowPage = {
  updated: IsoDate;              // shown on the page and the homepage (FR-14)
  current: Array<{ text: string; linkedSlug?: string }>;   // three items at most
  finished: Array<{ text: string; linkedSlug?: string }>;
};
```

**Where content lives**

```
content/
├── projects/            <slug>.mdx (body) + front matter validated against ProjectEntry
├── journal/             <slug>.mdx
├── lab/                 <slug>.mdx
├── data/
│   ├── experience.ts    ExperienceEntry[]
│   ├── skills.ts        SkillDomain[]
│   └── now.ts           NowPage
└── schema/              zod schemas and build validators (no content)
```

---

## 5. MDX article architecture

**Pipeline**
1. `@next/mdx` compiles `.mdx` files under `content/` (configured via `pageExtensions` or a loader rule).
2. Front matter is read with `remark-frontmatter` and exported with `remark-mdx-frontmatter`, so each file exports a typed `frontmatter` object. (Exact plugin names to be confirmed against the installed `@next/mdx` version.)
3. A build step validates each file's front matter against its schema (§4) and checks the required heading structure (§4.2).
4. Route pages import the compiled module, read `frontmatter`, and render the body inside a shared layout (`CaseStudyLayout`, `EntryLayout`, `ExperimentLayout`).

**Components available inside MDX** (registered once in `mdx-components.tsx`):

| Component | Use | Rules |
|---|---|---|
| `h2`, `h3` | Section headings | Heading IDs generated, used for TOC and deep links |
| `p`, `ul`, `ol`, `blockquote` | Prose | Styled through `prose.tsx` |
| `code`, `pre` | Code | Syntax highlighting at build time (no client JS) |
| `Figure` | Artifacts | `alt` required; caption only when it adds meaning |
| `MarginNote` | Term-linked explanation | Renders inline on mobile; margin on desktop (client) |
| `DecisionRecord` | Options considered | Compound: `Option` with `rejected` reason; stacks on mobile |
| `Callout` | Disclosure or important caveat | Text label, not color alone |
| `Replay` | Lab run (later) | Lazy-loaded client component |

**MDX rules**
- No raw HTML `<img>`; use `Figure` so alt text is enforced.
- No inline styles or class names in MDX. Styling belongs to components.
- Headings start at `h2`. `h1` comes from the page template.
- Links to other entries use the internal link component, so they are checked during build.

**Build-time link check:** every internal link in MDX must resolve to a published entry or a route. Broken links fail the build.

---

## 6. Animation and interaction architecture

**Principles** (from `DESIGN_SYSTEM.md` §6)
- Motion answers a person's action or marks one moment. Nothing animates on scroll by default.
- Only `transform` and `opacity` are animated.
- Every motion has a reduced-motion equivalent that is instant or absent.

**Layers**

| Layer | Technique | Used for | Dependencies |
|---|---|---|---|
| 1. Micro-interactions | CSS transitions on `:hover`, `:focus-visible`, `:active` | Buttons, links, rows | None |
| 2. Entrance moment | CSS keyframes, one-time, on the homepage only | Opening statement | None |
| 3. Route transitions | Native View Transitions (`document.startViewTransition` or React `<ViewTransition>`, to be verified against the installed React version) | Shared element from project row to case-study title | Feature-detected; falls back to no animation |
| 4. Disclosure | Native `<details>` / `<dialog>` with CSS | Margin notes (fallback), search dialog | None |
| 5. Lab replay | `requestAnimationFrame` in a lazy-loaded client module | Experiment playback (later) | Loaded only on the Lab page |

**Explicitly not used in v1:** animation libraries (Framer Motion, GSAP), scroll-linked effects, parallax, shaders, autoplay video.

**View transitions (Vercel guidance):** the installed `vercel-react-view-transitions` skill lists the priority order for transitions: shared element first, then Suspense reveal, list identity, state change. Only the shared-element pattern is planned for v1, between a project row and its case-study title. Each transition must communicate continuity ("same thing, going deeper"). If it cannot be explained that way, it is not added.

**Interaction states** (every interactive element)
- Default, hover, focus-visible, active (press), disabled, and loading if applicable.
- Focus is always visible. Press feedback is a small scale or color step, never a transform that shifts layout.

**Search dialog behavior**
- Opens on `/` (when no text field has focus) or `⌘K` / `Ctrl+K`.
- Native `<dialog>` with focus trapped inside while open; `Esc` closes and returns focus to the trigger.
- Results navigated with arrow keys, `Enter` opens, results announced via a live region with the count.

**Timing tokens** are defined in `DESIGN_SYSTEM.md` §6 and referenced by name, never as raw numbers.

---

## 7. Responsive design strategy

**Approach:** mobile-first, single-column base, expanding at breakpoints. Content width is controlled by the reading measure, not by viewport width.

| Name | Min width | Layout changes |
|---|---|---|
| base | 360px | Single column. Bottom nav. Stacked everything. |
| `md` | 768px | Two-column index rows. Options comparison in a grid. Header nav replaces bottom nav. |
| `lg` | 1024px | Case-study table of contents appears as a sticky side column. Margin notes move to the margin. |
| `xl` | 1280px | Wider gutters. No new layout. |

**Rules**
- Reading column: 65–75 characters (under 80, per the frontend-design guidance). Serif body text, if chosen, gets slightly more line height.
- No horizontal scroll at any width. Wide content (code, tables, diagrams) scrolls within its own container, with a visible scroll affordance.
- Touch targets at least 44 × 44 px with at least 8 px between them.
- Text reflows without loss at 320 CSS px wide and at 200% zoom (WCAG 1.4.10 and 1.4.4).
- Images use responsive `sizes`. Diagrams are authored to read at 360px wide, or they are provided as a simplified mobile variant.
- Tested at 360, 768, 1024, and 1280 (PRODUCT_PLAN B-051).

---

## 8. Accessibility requirements

Target: **WCAG 2.2 AA** (PRODUCT_PLAN NFR-01). Each item is testable.

**Structure**
- One `h1` per page. Heading levels never skip.
- Landmarks: `header`, `nav` (primary, and footer), `main`, `footer`. The search dialog is a labelled `dialog`.
- A skip link is the first focusable element and targets `main`.
- Each page has a unique `<title>`.

**Keyboard and focus**
- Every interactive element is reachable and operable with a keyboard.
- Visible focus indicator meeting WCAG 2.4.11 (not obscured) and 2.4.13 (appearance).
- No keyboard traps, except the search dialog, which traps focus intentionally and releases it on close.
- Shortcuts (`/`, `⌘K`) do not fire while typing in a text field, and can be turned off through the search UI.

**Content**
- Text contrast at least 4.5:1 for body, 3:1 for large text and UI components. Verified against the final tokens, not the draft.
- Status and disclosure use text plus shape, never color alone (WCAG 1.4.1).
- Images: meaningful `alt` text, or `alt=""` when decorative. Every artifact requires `alt` at build time.
- Diagrams have a text equivalent beside them (a short summary in the body).
- Tables use real `<table>`, `<th scope>`, and captions where needed.
- Language set on `<html lang>`.

**Motion and media**
- `prefers-reduced-motion: reduce` disables the entrance moment, view transitions, and replay animation.
- No autoplaying media. No content that flashes more than three times a second.

**Dynamic content**
- Filter results update a live region with the count.
- Search results announced with count; the active result is communicated through `aria-activedescendant` or focus.

**Testing** (see §10): automated axe scan on every route, plus manual keyboard and screen-reader pass for the search dialog, filters, and case-study TOC.

---

## 9. Performance and lazy-loading strategy

**Rendering**
- All routes prerendered (static). Cache Components and partial prefetching are already enabled.
- Slug routes use `generateStaticParams`; `dynamicParams = false`.
- Server Components by default; client code only at leaves listed in §3.

**Lazy loading**
| Code | Loaded when | Mechanism |
|---|---|---|
| Search index JSON | First open of the search dialog | Dynamic `fetch` of a static JSON file |
| Search dialog UI | First open | `next/dynamic` with `ssr: false` |
| Margin note script | Only on pages that use `MarginNote` | Component-level client bundle |
| TOC tracker | Desktop breakpoint only, on case studies | Client component, `matchMedia` check |
| Replay | Only on experiments that declare a replay (later) | `next/dynamic` |
| Images | Below the fold | `next/image` default lazy loading, with `sizes` |

**Assets**
- Images in WebP or AVIF through `next/image`. Source images stored at no more than needed for the largest display size.
- Fonts through `next/font`, self-hosted, subset, with `display: swap` (final font choice is a design-token decision).
- No third-party scripts in v1 (NFR-06).

**Layout stability**
- Every image and figure reserves its space through `width`, `height`, or an aspect ratio (CLS below 0.1 per the UX guidance).
- Font fallback metrics adjusted so swapping does not shift text.

**Budgets:** these are **proposed** and need your confirmation before B-052 locks them:
- Largest Contentful Paint under 2.5 s on a mid-range phone over a throttled connection.
- Cumulative Layout Shift under 0.1.
- Initial JavaScript for the homepage under 100 KB compressed, excluding the search dialog.

Measured on the first build, then adjusted if the proposals are unrealistic.

**Vercel performance guidance:** the installed `vercel-react-best-practices` skill (70 rules across 8 categories) applies during implementation. Priorities to watch: avoid waterfalls (parallel data loading in Server Components), keep client bundles small (import only what a component uses), and avoid re-render cost in the search and filter components.

---

## 10. Testing strategy

| Level | Tool (proposed) | Scope | Gate |
|---|---|---|---|
| Content validation | Script run in build (zod) | Every front matter field; disclosure rules; required headings; links; evidence references | Build fails |
| Static checks | ESLint, TypeScript (`strict`) | All code | Lint and build |
| Unit | Vitest | Schema validators, search index builder, URL filter parsing, disclosure rules | CI and local |
| Component | Vitest with React Testing Library | `FilterBar`, `SearchDialog` keyboard behavior, `MarginNote`, `OptionsComparison` rendering and stacking | CI and local |
| End-to-end | Playwright | Every route renders; navigation; search open and keyboard navigation; filter URLs; 404 | CI |
| Accessibility | `@axe-core/playwright` | Every route, at 360 and 1280 | CI (zero serious or critical violations) |
| Responsive | Playwright screenshots at 360, 768, 1024, 1280 | No horizontal scroll; layout checks on key pages | CI (checks), manual review (visual) |
| Visual regression | Deferred | Only after tokens are locked | Later |
| Performance | Lighthouse CI or equivalent on the built site | Budgets in §9 | Release gate after B-052 |
| Manual | Keyboard-only pass; screen reader pass (one platform) | Search, filters, TOC, case study reading | Before SHIP PREMIUM (B-054) |

**Test data:** tests use fixtures under `tests/fixtures/`, not the real content, so they do not depend on unfinished entries.

**Definition of done for a page:** build passes, all tests for that route pass, axe scan clean, responsive check at four widths passes, and the Vercel and frontend-design checklists have been applied.

---

## 11. Frontend-only vs backend features

**Decision: the first release has no backend.** Everything is static, built from repository content and deployed as static files.

| Feature | Backend needed? | Decision |
|---|---|---|
| All pages in PRODUCT_PLAN §3 | No | Static, prerendered |
| Projects index, filters | No | URL params, server-rendered |
| Case studies, journal, lab | No | MDX, static |
| Skills and evidence links | No | Build-time validation |
| Experience timeline | No | Typed data file |
| Résumé download | No | Static PDF in `public/` |
| Keyboard search | No | Index JSON generated at build |
| Lab replay (later) | No | Pre-recorded transcript as static JSON; no server execution |
| `/now` updates | No | Edited in the repository; rebuild publishes |
| Sitemap, robots, metadata | No | Generated at build |
| **Contact form** | **Yes** | **Deferred.** v1 uses a plain email and profile links. A form needs a submission endpoint, spam protection, and a privacy decision. |
| Analytics | Yes (usually) | **Deferred.** Privacy decision needed (NFR-06). |
| View counts, comments, reactions | Yes | Out of scope (PRODUCT_PLAN §11). |
| Newsletter or feed subscriptions | Yes | Out of scope for v1. A static RSS feed for Journal is possible later without a backend. |
| Live status from external systems | Yes | Out of scope. Would violate honest-signal rule (NFR-09). |

**If a contact form is approved later,** the smallest option is a single server-side route handler with rate limiting, a honeypot field, and no storage beyond forwarding the message. That would be the only backend code in the project, and it needs its own review.

---

## 12. Implementation milestones

Each milestone ends with a gate. Nothing moves forward until the gate passes.

| Milestone | Scope | Backlog items | Gate |
|---|---|---|---|
| **M0: Architecture review** | This document, `DESIGN_SYSTEM.md`, open decisions | — | Your review and approval (current step) |
| **M1: Foundations** | Design tokens (colors and fonts chosen here), global layout shell, skip link, MDX pipeline, content validation, test harness | B-002, B-003, B-004, B-005 | Build passes; validator rejects bad fixtures; shell passes axe |
| **M2: Core entry points** | Home (static content), Projects index with filters, case study template rendered from a fixture | B-010, B-011, B-012, B-013 | Routes pass e2e and axe; sample case study renders all sections |
| **M3: Reference pages** | Skills, About with timeline, Contact, Now, 404, résumé download | B-015, B-016, B-017, B-018, B-019, B-020 | Content validation passes; axe clean |
| **M4: Journal and Lab** | Journal index and entries with margin notes; Lab index and experiments | B-030, B-031, B-032, B-033, B-034, B-035 | Status filter works; abandoned items shown; margin notes keyboard operable |
| **M5: Interaction layer** | Search dialog, TOC tracker, entrance moment, shared-element view transition | B-040, B-041, B-042 | Keyboard-only pass; reduced-motion pass; no layout shift |
| **M6: Quality and performance** | Full a11y audit, responsive pass, performance measurement, budgets set | B-050, B-051, B-052 | Budgets met or revised with approval |
| **M7: Content and disclosure** | Real content entered, disclosure review | B-053 | Disclosure sign-off recorded |
| **M8: Premium acceptance** | Final review against the SHIP PREMIUM gate | B-054 | Passes review; deploy approved |
| *Later* | Lab replay, command palette, feed, contact form (if approved) | B-043, B-044 | Separate review |

**Note:** M1 starts only after you approve the design tokens direction, because colors and fonts are chosen there.

---

## 13. Asset organization

```
public/
├── resume/
│   └── pratik-sable-resume.pdf        Keep the filename stable; update the file, not the name
├── content/
│   ├── projects/<slug>/               Artifacts for one case study
│   │   ├── <name>.webp               Optimized output (preferred)
│   │   └── <name>.source.*           Originals are NOT committed here; see below
│   ├── journal/<slug>/
│   └── lab/<slug>/
├── icons/                             Favicons, app icons (later)
└── og/                                Default social preview image
```

**Rules**
- Only optimized assets live in `public/`. Source files (large PNG, PSD, Figma exports) stay out of the repository.
- File names are lowercase, kebab-case, and descriptive (`architecture-overview.webp`).
- Every artifact has an entry in its content file with `alt`, `kind`, `width`, and `height`.
- Confidential screenshots and diagrams are never placed in `public/` until disclosure review (B-053) clears them. Keep them out of git entirely.
- Remove the unused scaffold assets (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) during M1.
- Favicon and default metadata image replace the scaffold defaults in M1.

**Metadata:** the scaffold's `layout.tsx` title and description ("Create Next App") are replaced in M1.

---

## 14. Dependencies (proposed, not yet installed)

| Package | Purpose | Notes |
|---|---|---|
| `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx` | MDX | Required by the installed Next 16 docs |
| `remark-frontmatter`, `remark-mdx-frontmatter` | Front matter export | Versions confirmed at install |
| `zod` | Content and build validation | Single source of truth for types (`z.infer`) |
| `vitest`, `@testing-library/react`, `jsdom` | Unit and component tests | |
| `@playwright/test`, `@axe-core/playwright` | End-to-end and accessibility | Playwright is already a listed optional peer of Next |

Each addition needs a reason (CLAUDE.md, Dependencies). Nothing is added until you approve this list.

---

## 15. Open technical decisions

1. Confirm MDX as the long-form format (proposed) versus a headless CMS (not proposed for v1, because content is repository-owned).
2. Confirm zod for validation.
3. Confirm the performance budgets in §9.
4. Confirm whether the Journal gets an RSS feed in v1 (static, no backend).
5. Confirm the contact approach for v1: email and profile links (proposed) versus a form that needs a backend.
6. Confirm the disclosure tier rules before content entry (PRODUCT_PLAN §7).
