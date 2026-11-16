# PRODUCT_PLAN.md

Personal engineering portfolio of Pratik Sable.

**Status:** Approved requirements (per your instruction) with an initial feature backlog.
**Sources:** `PORTFOLIO_SPEC.md` (requirements), `DESIGN_BLUEPRINT.md` (direction and information architecture, recommended, awaiting your confirmation).
**Constraints:** no colors or fonts are locked here. No professional achievements, metrics, or confidential details are invented. Anything marked **TBD** needs your input before publication.

---

## 1. Product vision

A portfolio that demonstrates engineering thinking, not a list of technologies. It combines three ideas:

1. **Mission Control:** a clear, honest status view of current focus and active work.
2. **Engineering Journal:** a record of decisions, trade-offs, and what was learned. This is the structural spine.
3. **Developer Operating System:** meaningful interactions (keyboard search, a replayable lab run) that reward exploration without being required to use the site.

**Positioning:** a frontend engineer (SDE1, Digantara) with professional experience in complex space-related interfaces and growing experience in Go, backend engineering, gRPC, databases, and distributed systems.

**Success looks like:** a visitor can understand how Pratik thinks about a problem within a few minutes, and a recruiter can answer "does this person reason well about X" without reading everything.

---

## 2. Target visitor personas

| Persona | Goal | Needs from the site | Primary path |
|---|---|---|---|
| **Recruiter / talent partner** | Screen fit for a role quickly | Role, period, stack, résumé, clear focus areas | Home → Projects index → About → Résumé |
| **Engineering manager / hiring lead** | Judge depth of thinking | Case studies with options, rejected alternatives, validation | Projects → case study → Skills |
| **Peer engineer** | Learn from or critique the work | Journal entries, lab experiments, technical detail | Journal / Lab → experiment or entry |
| **Returning visitor** | See what changed | Dated updates, recent work | Home (latest entries) → Now |
| **Curious visitor** | Explore | Interactions, the lab replay, search | Any entry point → ⌘K search |

**Priority:** recruiter and engineering manager are the primary personas for the first release. Peer and curious visitors are supported but not optimized for.

---

## 3. Required pages

Routes follow `DESIGN_BLUEPRINT.md` §3.1.

| Route | Purpose | Release |
|---|---|---|
| `/` Home | Opening statement, current focus, latest entries, capability teaser | 1 |
| `/projects` | Decision-first index with filters | 1 |
| `/projects/[slug]` | Structured case study | 1 |
| `/skills` | Capability by problem domain, with evidence links and a "learning" category | 1 |
| `/about` | Summary, experience timeline, focus areas, résumé link | 1 |
| `/contact` | Contact channels, résumé download | 1 |
| `/journal` | Dated journal index | 1 |
| `/journal/[slug]` | Journal entry with margin notes | 1 |
| `/lab` | Experiments index with status | 1 |
| `/lab/[slug]` | Experiment record | 1 |
| `/now` | Dated current-work page | 1 |
| `/404` | Not-found page with links into the index | 1 |

---

## 4. Functional requirements

Numbered for traceability. "Must" items are required for the first release.

**Content and navigation**

- **FR-01 (Must):** Global navigation with four primary destinations: Projects, Journal, Lab, About.
- **FR-02 (Must):** Secondary navigation (Skills, Now, Contact) available from the footer and About.
- **FR-03 (Must):** The Projects index lists each entry with title, period, role, stack, a one-line decision headline, and a disclosure tier.
- **FR-04 (Must):** Filters on the Projects index: domain, stack, period, disclosure tier. Filter state is reflected in the URL.
- **FR-05 (Must):** Each case study has the sections: context, problem, constraints, options considered (with the reason each rejected option lost), decision, validation, learnings, artifacts, related entries.
- **FR-06 (Must):** Each case study displays its disclosure tier and a note on what is withheld and why.
- **FR-07 (Must):** Skills are organized by problem domain. Every claimed skill links to at least one evidence entry. No self-rated skill bars.
- **FR-08 (Must):** A "learning" category on the Skills page shows areas in progress, labelled as such.
- **FR-09 (Must):** About includes an experience timeline with decision-level highlights linked to case studies.
- **FR-10 (Must):** A résumé download is available from the header or footer, the About page, and the Contact page.
- **FR-11 (Must):** Journal index is a dated, year-grouped list with tag filters.
- **FR-12 (Must):** Lab index lists experiments with status (Open, Concluded, Abandoned). Abandoned experiments are listed with their reason.
- **FR-13 (Must):** Each experiment shows question, setup, result, conclusion, and an optional reproduction section.
- **FR-14 (Must):** `/now` displays a visible last-updated date. The homepage shows the same date.
- **FR-15 (Must):** Entries can be linked to each other (related entries, previous/next).

**Interaction**

- **FR-16 (Must):** Keyboard index search (`/` or `⌘K`) over all entries. Search is never the only route to a page.
- **FR-17 (Should):** Margin notes in journal entries and case studies: terms expand to show the linked decision or source. Works on desktop (side margin) and mobile (inline expansion).
- **FR-18 (Should):** Table of contents on case studies tracks reading position on desktop.
- **FR-19 (Could):** Lab terminal replay: a pre-recorded run of an experiment, played back as a static transcript with playback controls. Never executes code on the server.
- **FR-20 (Could):** Command palette beyond search (navigation commands, theme, reading mode).
- **FR-21 (Could):** Homepage entrance moment (one-time, respects reduced motion).

**Content operations**

- **FR-22 (Must):** Content is authored in structured files in the repository, one file per entry, with typed front matter (see §6).
- **FR-23 (Must):** Build fails if a required field is missing or a disclosure tier is invalid.
- **FR-24 (Should):** A draft state keeps unpublished entries out of production builds.

---

## 5. Non-functional requirements

- **NFR-01 Accessibility:** WCAG 2.2 AA. Visible keyboard focus everywhere. Every interactive element reachable without a pointer. Content available without hover.
- **NFR-02 Reduced motion:** all motion respects `prefers-reduced-motion`. The homepage moment and any replay become static.
- **NFR-03 Responsive:** supported from 360px width upward. No horizontal scroll at 360, 768, 1024, 1280.
- **NFR-04 Performance:** images use modern formats and reserved space (no layout shift). Initial JavaScript kept lean; the search index and replay load only when needed. Targets to be set after the first build is measured. **TBD:** numeric budgets.
- **NFR-05 SEO and sharing:** each page has a unique title, description, and social preview. Case studies have structured metadata.
- **NFR-06 Privacy:** no third-party tracking scripts in the first release. Analytics, if added later, is a separate decision.
- **NFR-07 Maintainability:** content and presentation separated. Components are small and reusable. Lint and build pass before any change is considered done.
- **NFR-08 Hosting:** static-first. Pages prerender where content is static.
- **NFR-09 Honesty of state:** no fabricated live data, uptime figures, or telemetry. Status-like elements reflect content in the repository.
- **NFR-10 Browser support:** current versions of major evergreen browsers, with graceful degradation for search and replay.

---

## 6. Content requirements

### 6.1 Content model (per entry)

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | |
| `slug` | Yes | Unique within its collection |
| `type` | Yes | `project`, `journal`, `experiment` |
| `status` | Yes | `draft` or `published`. Experiments add `open`, `concluded`, `abandoned` |
| `period` | Yes for projects | As disclosable |
| `role` | Yes for projects | As disclosable |
| `disclosure` | Yes for projects | `public`, `sanitized`, `summary-only` (see §7) |
| `domains` | Yes | Problem domains, used by Skills and filters |
| `stack` | Yes | Technology tags |
| `decision_headline` | Yes for projects | One line: "Chose X over Y because Z" |
| `metrics` | No | Only with approval and a stated source (see §7) |
| `artifacts` | No | Diagrams, sketches, real UI captures, with alt text |
| `related` | No | Slugs of related entries |
| `updated` | Yes | Date of last substantive change |

### 6.2 Case study sections

Context · Problem · Constraints · Options considered (with the rejection reason for each losing option) · Decision (with the trade-off accepted) · Validation · Learnings · Artifacts.

### 6.3 Other content

- **Opening statement** (Home): one to two sentences, plain language.
- **Focus areas** (About and Now): up to three, updated with the date.
- **Résumé:** a current PDF, linked from the header, About, and Contact.
- **Contact:** channels the user chooses. **TBD.**

---

## 7. Confidentiality and disclosure constraints

These are binding requirements, not guidance.

1. **Employer confidentiality:** no proprietary data, customer names, internal system names, architecture diagrams, screenshots, or metrics that the user's employer has not cleared for publication. **TBD:** the employer's disclosure policy and who approves.
2. **Disclosure tiers:**
   - `public`: full detail, with artifacts and any approved metrics.
   - `sanitized`: full reasoning and decisions, with identifying names, data, and proprietary details removed. The page states this.
   - `summary-only`: a short problem and approach description, no artifacts.
3. **No invented content:** no achievements, metrics, ownership claims, or scale figures without user confirmation and a source.
4. **Withheld work is not shown as a blank entry.** Confidential work either appears at an allowed tier or is omitted.
5. **Metrics require approval:** each metric is listed with its source and the user's sign-off before publication.
6. **Personal data:** no home address, personal phone number, or identifiers beyond the chosen contact channels.
7. **Images:** every image is checked for confidential content before publication. Decorative images carry no caption.

---

## 8. Professional storytelling strategy

- **Lead with decisions, not technologies.** Every project's first line is the decision it contains.
- **Show the rejected options.** Options considered, with the reason each lost, are the strongest evidence of judgment. Presented as a visual comparison on desktop.
- **Honest about growth.** The Skills page has a visible learning category. Go, gRPC, databases, and distributed systems are presented as growing areas, backed by what is being built to learn them.
- **Frontend strength shown through systems thinking.** Space-related interface work is presented through constraints (real-time data, safety-relevant displays, performance under load) rather than screenshots alone, subject to §7.
- **Consistent voice:** plain sentences, active voice, no superlatives, no unsupported claims.
- **Narrative arc on Home:** who I am → what I am focused on now → proof (latest entries) → capability map → contact.

---

## 9. Interactive engineering features

| Feature | Purpose | Requirement |
|---|---|---|
| Decision-first index | Recruiter scanning | FR-03, FR-04 |
| Options comparison | Show reasoning | FR-05 |
| Margin notes | Deeper context without leaving the page | FR-17 |
| Reading-position TOC | Orientation in long case studies | FR-18 |
| Keyboard search | Fast navigation for power users | FR-16 |
| Lab replay | Demonstrate an experiment run | FR-19 |
| Homepage moment | One memorable entrance | FR-21 |

All interactive features degrade to a static, fully readable equivalent.

---

## 10. Initial feature backlog

Priorities: **P0** blocks launch, **P1** needed for a complete first release, **P2** later.
Estimates are relative sizes (S, M, L), not time commitments.

### Epic 1: Foundation

| ID | Item | Priority | Size | Depends on | Acceptance |
|---|---|---|---|---|---|
| B-001 | Project scaffold (Next.js, TypeScript, Tailwind, ESLint, App Router) | P0 | Done | — | Dev server starts, lint and build pass |
| B-002 | Approved design tokens (colors, type, spacing) | P0 | M | Design approval | Tokens defined once; components use tokens only |
| B-003 | Global layout: header, four-item nav, footer, skip link | P0 | M | B-002 | Keyboard and screen-reader navigable at 360px |
| B-004 | Content pipeline: typed front matter, validation at build | P0 | M | — | Build fails on a missing field or invalid disclosure tier |
| B-005 | Draft/published filtering | P1 | S | B-004 | Drafts absent from production build |
| B-006 | SEO and social metadata per route | P1 | S | B-003 | Unique title and description on every page |

### Epic 2: Core pages (first release)

| ID | Item | Priority | Size | Depends on | Acceptance |
|---|---|---|---|---|---|
| B-010 | Home: opening statement, current focus, latest entries, capability teaser | P0 | M | B-003, B-004 | FR-14 date shown; no unapproved metrics |
| B-011 | Projects index with decision headlines and disclosure badges | P0 | M | B-004 | FR-03 met; readable without hover |
| B-012 | Filters on Projects index, reflected in URL | P1 | M | B-011 | FR-04 met; back button restores filters |
| B-013 | Case study template with all sections | P0 | L | B-004 | FR-05, FR-06 met; TOC on desktop |
| B-014 | Options-considered comparison block | P1 | M | B-013 | Stacks on mobile; no information lost |
| B-015 | Skills by problem domain with evidence links | P0 | M | B-004 | FR-07, FR-08 met |
| B-016 | About page with experience timeline | P0 | M | B-004 | FR-09 met; résumé link present |
| B-017 | Résumé download in header, About, Contact | P0 | S | B-016 | FR-10 met |
| B-018 | Contact page | P1 | S | B-003 | Channels as configured by the user |
| B-019 | Now page with dated updates | P1 | S | B-004 | FR-14 met |
| B-020 | 404 page with index links | P1 | S | B-003 | Links reach each primary section |

### Epic 3: Journal and Lab

| ID | Item | Priority | Size | Depends on | Acceptance |
|---|---|---|---|---|---|
| B-030 | Journal index (dated, year-grouped) with tag filter | P0 | M | B-004 | FR-11 met |
| B-031 | Journal entry page with previous/next | P0 | S | B-030 | FR-15 met |
| B-032 | Margin notes (desktop side, mobile inline) | P1 | M | B-031 | FR-17 met; keyboard operable |
| B-033 | Lab index with status filter, abandoned experiments shown | P0 | M | B-004 | FR-12 met |
| B-034 | Experiment page: question, setup, result, conclusion | P0 | M | B-033 | FR-13 met |
| B-035 | Related-entries component (shared across types) | P1 | S | B-031, B-034 | FR-15 met |

### Epic 4: Interaction

| ID | Item | Priority | Size | Depends on | Acceptance |
|---|---|---|---|---|---|
| B-040 | Keyboard index search (`/`, `⌘K`) | P0 | M | B-004 | FR-16 met; search not the only route |
| B-041 | Homepage entrance moment with reduced-motion fallback | P1 | S | B-010 | FR-21 met; static under reduced motion |
| B-042 | Reading-position TOC on case studies | P1 | S | B-013 | FR-18 met |
| B-043 | Lab replay (static transcript with playback) | P2 | L | B-034 | FR-19 met; no server execution |
| B-044 | Command palette beyond search | P2 | M | B-040 | FR-20 met |

### Epic 5: Quality and launch

| ID | Item | Priority | Size | Depends on | Acceptance |
|---|---|---|---|---|---|
| B-050 | Accessibility audit (WCAG 2.2 AA) on every page | P0 | M | All pages | NFR-01, NFR-02 met |
| B-051 | Responsive checks at 360, 768, 1024, 1280 | P0 | S | All pages | NFR-03 met |
| B-052 | Performance measurement and budgets | P1 | M | All pages | NFR-04 numeric budgets set and met |
| B-053 | Disclosure review of all content | P0 | S | Content | §7 items checked; sign-off recorded |
| B-054 | Final production-quality acceptance review | P0 | M | All | Passes the workflow's SHIP PREMIUM gate |

---

## 11. First release scope

**In scope (P0 and P1 items in Epics 1–3, and B-040 to B-042):** all 12 pages in §3, the content pipeline, the Projects index with decision headlines, the case study template, Skills by domain, About with résumé, Journal, Lab, search, and quality gates.

**Out of scope for the first release:** lab replay (B-043), command palette (B-044), analytics, comments, a blog engine, internationalization, and any feature requiring a backend.

---

## 12. Missing information (needed before publication)

Nothing below is invented. Each item blocks the content that depends on it.

1. **Projects to feature and their disclosure tiers** (§7). Blocks Projects index and case studies.
2. **Employer disclosure policy and approver.** Blocks any case study naming Digantara's work.
3. **Approved metrics, with sources** (if any). Blocks any number on the site.
4. **Target roles:** frontend-leaning, backend/distributed-leaning, or both. Affects Skills emphasis and the About focus.
5. **Experience details:** roles, periods, and decision-level highlights the user can share.
6. **Contact channels and availability.** Blocks B-018.
7. **Résumé PDF.** Blocks B-017.
8. **Lab seed experiments:** at least one to make the Lab meaningful at launch.
9. **Journal seed entries:** at least two, to make the Journal meaningful at launch.
10. **Performance budgets** (NFR-04). Blocks B-052 numeric targets.
11. **Design approval:** Concept B as the spine, with the Concept A homepage moment and the Concept C search accelerator. Blocks B-002.

---

## 13. Decisions recorded

| Decision | Choice | Reason |
|---|---|---|
| Structural spine | Engineering Journal | Native unit is a decision with context; best recruiter scanning; lowest accessibility risk |
| Homepage moment | Mission Control, as honest content | Adds a memorable entrance without fake data |
| Search | Developer OS command palette, as accelerator | Keyboard efficiency without making it required |
| Colors and fonts | Not locked | Chosen during design-token work (B-002) |
| Framework | Next.js App Router, TypeScript, Tailwind CSS | Already scaffolded and verified |
| Hosting | Static-first | No backend requirement in the first release |
