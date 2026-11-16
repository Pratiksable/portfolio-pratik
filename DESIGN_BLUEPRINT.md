# DESIGN_BLUEPRINT.md

Portfolio of Pratik Sable. Design direction, information architecture, and wireframe descriptions.

**Status:** Recommended direction, awaiting approval. Concept B (Engineering Journal) is recommended as the spine.
**Sources:** `PORTFOLIO_SPEC.md`, `CLAUDE.md`. `PRODUCT_PLAN.md` was referenced but does not exist in the repository or on this machine. Requirements below come from the spec alone. Route names and page lists are proposals to confirm.

**Scope limits for this document:** no colors or fonts are locked. No production code. No professional achievements, metrics, or confidential details are invented. Every outcome or number is a placeholder until you supply and approve it.

---

## 0. Rules that apply to every concept

1. **Show reasoning, not logos.** A technology list is never the main content. Each claim about skill is tied to a decision, a trade-off, or a shipped artifact.
2. **Honest signals only.** Any "live" or status-like element (a status board, a telemetry readout, a "current focus" line) must reflect real, editable content. No fabricated telemetry or fake uptime numbers.
3. **Disclosure is designed, not footnoted.** Each project carries a visible disclosure tier (see §5). Confidential work is shown as engineering thinking with scope and identifiers removed, never as blank space.
4. **One memorable moment per page.** Everything else stays quiet. One entrance sequence on the homepage, one signature interaction per page at most.
5. **Quality floor everywhere:** AA contrast, visible keyboard focus, `prefers-reduced-motion` respected, phone width 360px with no horizontal scroll, full content available without hover.
6. **Real over decorative.** Diagrams, architecture sketches, and real interface captures are preferred to abstract illustration. No captions under purely decorative images.

---

## 1. Three creative concepts

### Concept A: Mission Control (Flight Deck)

**Central concept.** The site is a live operations console for a space-systems engineer. Panels show mission phases, subsystem status, and telemetry-style readouts. Visitors "fly" the site by monitoring subsystems.

- **Homepage storytelling.** Opens on a console-style status board: "Current focus," "Active subsystems" (frontend, Go services, gRPC, data), and "Recent anomalies" (resolved incidents from projects). Scrolling advances through mission phases: Launch (background), Systems (skills), Flight log (projects), Debrief (contact).
- **Navigation experience.** Left-hand mission phase rail with panel names. Keyboard shortcuts per panel. Breadcrumb reads like a mission log.
- **How projects are presented.** Each project is a "mission" card with a status badge (Completed, Sustained, Decommissioned), mission objectives, and subsystem tags.
- **How case studies work.** A mission debrief: objectives, constraints, systems involved, anomalies encountered, and the decisions taken to resolve them. Anomalies become the strongest storytelling unit.
- **How technical skills are explored.** A subsystem map: each skill is a subsystem with a health bar. Health reflects depth of evidence (linked projects), not self-rated proficiency.
- **How the Engineering Lab works.** A "test range": each experiment is a test run with a setup, a result, and a verdict. Runs are static and reproducible.
- **Signature interactions.** Panels that light up when the visitor's attention reaches them; a scan sweep on load; anomaly markers that expand into debriefs.
- **Recruiter experience.** Fast to read the status board, but finding a specific project or role requires navigating mission phases. Recruiters who want a résumé-like answer must work harder.
- **Mobile adaptation.** Panels stack into a vertical mission log. The phase rail becomes a bottom sheet. The scan sweep is removed.
- **Potential weaknesses.** Strong theme risk: it can read as cosplay of the space industry. The metaphor forces content into mission language, which hides plain facts. Fake-feeling "telemetry" conflicts with rule 2. The space-systems theme may also signal a narrow domain when the target roles span backend and distributed systems.

### Concept B: Engineering Journal (Logbook)

**Central concept.** The portfolio is a continuous, dated engineering logbook. Projects, experiments, and notes are entries. The reader sees how thinking changed over time: what was tried, what broke, what was decided and why.

- **Homepage storytelling.** An opening "Now" line in plain sentences, then a short "Current entries" list: the latest case study, the latest lab experiment, and the latest journal note. Scrolling is reading, not spectacle. One entrance moment: the first entry writes itself in, once.
- **Navigation experience.** A persistent top bar with four destinations: Projects, Journal, Lab, About. An index drawer lists every entry by year and tag. Search and filter live in the index.
- **How projects are presented.** Projects are entries in the Projects index: one line of problem, the role, the period, the disclosure tier, and the stack. Each card leads with the decision it contains, not the logo.
- **How case studies work.** A structured long-read: context, the problem, constraints, options considered (with the one rejected and why), the decision, how it was validated, and what was learned. Each section is a heading the visitor can link to. Diagrams and architecture sketches are inline.
- **How technical skills are explored.** A skills index organized by problem domain (rendering performance, real-time data, API contracts, state management, backend services) rather than by technology. Each domain lists the entries where it was used. Technologies appear as tags beneath.
- **How the Engineering Lab works.** A notebook of experiments: a question, a setup, a result, and a conclusion, each with a status (Open, Concluded, Abandoned). Abandoned experiments are kept, which shows judgment.
- **Signature interactions.** A "margin note" system: hovering or tapping a term in a case study reveals the decision behind it. A table of contents that tracks reading position. The "Now" line updates from the latest entry date.
- **Recruiter experience.** The Projects index gives a scannable table of role, period, stack, and decision headline. A single-page résumé download and a role-fit summary sit in About. Recruiters can answer "does this person think about X" in under two minutes.
- **Mobile adaptation.** Single column. The index becomes a filterable list. The margin-note system becomes an expandable inline note. Navigation collapses into a bottom bar with four items.
- **Potential weaknesses.** Text-heavy content risks feeling like a blog if the visuals are weak. The concept is quieter, so its distinctiveness has to come from the typography, the diagrams, and the quality of the writing. The "Developer OS" interactivity is intentionally limited, so it depends on supporting features (see Concept C) to deliver it.

### Concept C: Developer Workspace (OS)

**Central concept.** The portfolio is a small operating environment. Projects are files, labs are sandboxes, and skills are a package manifest. Visitors navigate with a command palette, windows, and a file tree.

- **Homepage storytelling.** Opens on a desktop-like workspace with a README-style intro, a file tree of projects, and an open "terminal" with a short welcome. Scrolling is replaced by opening windows.
- **Navigation experience.** Command palette (keyboard-first) plus a file tree. Every destination is a file or command. Multiple windows can be open and arranged.
- **How projects are presented.** Each project is a folder. Opening it reveals files: README (overview), DECISIONS.md, ARCHITECTURE, and CHANGELOG.
- **How case studies work.** A case study is a README plus a set of linked decision records. The reader can jump between decisions in the file tree.
- **How technical skills are explored.** A `package.json`-style manifest: dependencies are skills, with versions meaning experience level. Versions are a playful framing only, and must be backed by evidence.
- **How the Engineering Lab works.** A sandbox terminal. Visitors can run pre-recorded commands that demonstrate experiments (for example, a gRPC call sequence or a rendering benchmark replay). Nothing executes live on the server.
- **Signature interactions.** The command palette, window management, and a playable terminal replay. This is the most memorable concept.
- **Recruiter experience.** The highest friction. A recruiter must learn the interface before getting value. A visible "Quick view" fallback is required, which means maintaining two interfaces.
- **Mobile adaptation.** Desktop metaphors do not survive phone width. The fallback is a list-based view, and the OS feel is reduced to a single command entry point. Heavy effort for a small gain.
- **Potential weaknesses.** Highest build and maintenance cost. Heavy keyboard-first design conflicts with the quality floor for mouse-less and touch users unless every feature has a non-keyboard path. The metaphor is novel, so visitors may not know what to click. Risk of "gimmick" perception that overshadows the engineering content.

---

## 2. Recommendation

**Adopt Concept B (Engineering Journal) as the structural spine.** Borrow one moment from Concept A (the homepage status summary, written as plain content, no fake telemetry) and one feature from Concept C (a command palette as a keyboard accelerator for the index, never the only route).

| Criterion | A: Mission Control | B: Journal | C: Workspace |
|---|---|---|---|
| Shows engineering reasoning | Medium (anomalies are good, but language is forced) | High (decisions are the native unit) | Medium (decision records, but hidden in files) |
| Recruiter scanning speed | Medium | High | Low |
| Distinctiveness without kitsch | Low–medium (theme risk) | Medium–high (quiet, typographic, earned) | High |
| Mobile fit | Medium | High | Low |
| Accessibility risk | Medium | Low | High |
| Build and maintenance cost | Medium | Low–medium | High |
| Matches spec's "not a list of technologies" | Medium | High | Medium |

Why B wins: the spec asks the portfolio to demonstrate engineering thinking. A journal's native unit is a decision with context, which is exactly that. It also keeps recruiters productive, adapts to mobile without loss, and has the lowest accessibility risk. Its distinctiveness has to be earned through typography, diagrams, and writing quality. That is the main thing to validate in the first build.

The "combine three concepts" requirement in the spec is met like this: Journal is the structure, Mission Control contributes the homepage status moment, and Developer OS contributes the command palette and a Lab terminal replay, both optional and progressively enhanced.

---

## 3. Information architecture

### 3.1 Site map

```
/                       Home (Briefing)
/projects               Projects index
/projects/[slug]        Case study
/journal                Journal index
/journal/[slug]         Journal entry
/lab                    Engineering Lab index
/lab/[slug]             Experiment
/skills                 Skills by problem domain
/about                  About, experience, focus areas
/now                    What I am working on now (dated)
/contact                Contact and résumé download
/404                    Not found, with links back into the index
```

### 3.2 Global navigation

- **Primary:** Projects · Journal · Lab · About (four items, always visible).
- **Secondary (utility):** Skills · Now · Contact, shown in the footer and on About.
- **Keyboard accelerator:** `/` or `⌘K` opens an index search over all entries. It is never the only way to reach a page.
- **Phone:** four-item bottom bar. Secondary items live under About.

### 3.3 Page inventory

| Route | Purpose | Primary visitor | Required content | Status |
|---|---|---|---|---|
| `/` | Orient, establish identity and current focus | All | Opening statement, current focus, 3 latest entries | Proposed |
| `/projects` | Scannable evidence index | Recruiter, engineering manager | Entries with role, period, stack, decision headline, disclosure tier | Proposed |
| `/projects/[slug]` | Deep engineering reasoning | Engineering manager, peer engineer | Context, problem, constraints, options, decision, validation, learnings | Proposed |
| `/journal` | Writing about how I think | Peer engineer, curious visitor | Dated notes, tags | Proposed |
| `/journal/[slug]` | Single note | Peer engineer | Body, related entries | Proposed |
| `/lab` | Experiments index | Peer engineer | Experiments with status (Open, Concluded, Abandoned) | Proposed |
| `/lab/[slug]` | Experiment record | Peer engineer | Question, setup, result, conclusion | Proposed |
| `/skills` | Capability by problem domain | Recruiter, hiring manager | Domains, linked entries, tags | Proposed |
| `/about` | Background and fit | Recruiter | Summary, experience, focus areas, résumé link | Proposed |
| `/now` | Dated status | Returning visitor | Last-updated date, current work | Proposed |
| `/contact` | Contact | All | Channels, résumé download, availability | Proposed |
| `/404` | Recovery | Any | Index links | Proposed |

---

## 4. Wireframe descriptions

Wireframes are described as layout regions top to bottom. Widths assume desktop 1280px; mobile notes follow each page. No colors or fonts are specified.

### 4.1 Home (`/`)

```
+--------------------------------------------------------------+
| [Name]                    Projects  Journal  Lab  About  [⌘K] |
+--------------------------------------------------------------+
| OPENING STATEMENT (one to two sentences, plain)              |
| Who I am, what I build, where I am focused.                  |
| [Read latest case study]   [Résumé]                          |
+--------------------------------------------------------------+
| NOW (dated line, links to /now)                              |
+--------------------------------------------------------------+
| LATEST ENTRIES (three)                                       |
|  [Case study]   [Lab experiment]   [Journal note]            |
|  each: title, one-line decision headline, date, tags         |
+--------------------------------------------------------------+
| CAPABILITY MAP (teaser)                                      |
|  4–5 problem domains, each linking to /skills#domain         |
+--------------------------------------------------------------+
| FOOTER: contact, résumé, /now, /skills                       |
+--------------------------------------------------------------+
```

- **Signature moment:** the opening statement is set in a single, one-time entrance. It does not repeat on scroll.
- **Content rule:** no statistics or numbers unless approved and sourced.
- **Mobile:** stacked. Latest entries become a vertical list. Capability map becomes a list of domains.

### 4.2 Projects index (`/projects`)

```
+--------------------------------------------------------------+
| HEADER: "Projects" + one-line scope statement                |
| FILTERS: domain · stack · period · disclosure tier           |
+--------------------------------------------------------------+
| ENTRY ROW (repeating)                                        |
|  Title                     Period      Role                  |
|  Decision headline (one line: "Chose X over Y because Z")    |
|  Stack tags          Disclosure tier badge                   |
+--------------------------------------------------------------+
| EMPTY/FILTER-NO-RESULT: explains the filter, offers reset     |
+--------------------------------------------------------------+
```

- Rows, not tiles. Tiles hide the decision headline.
- Sorting: most recent first by default; by domain on request.
- **Mobile:** each row becomes a stacked card with the same fields in the same order.

### 4.3 Case study (`/projects/[slug]`)

```
+--------------------------------------------------------------+
| BREADCRUMB: Projects / [title]                               |
| TITLE + one-sentence problem statement                       |
| META STRIP: role · period · team size · stack                |
| DISCLOSURE NOTE (tier, what is withheld and why)             |
+--------------------------------------------------------------+
| SIDE TABLE OF CONTENTS (sticky, desktop only)                |
|  Context · Problem · Constraints · Options · Decision        |
|  Validation · Learnings · Artifacts                          |
+--------------------------------------------------------------+
| BODY (single reading column, ~70 characters measure)         |
|  Context: why this existed                                   |
|  Problem: the failure or gap, in concrete terms              |
|  Constraints: technical, business, and disclosure limits     |
|  Options considered: 2–3, each with the reason it lost       |
|  Decision: the choice, and the trade-off accepted            |
|  Validation: how it was checked (tests, measurements, review)|
|  Learnings: what I would change next time                    |
+--------------------------------------------------------------+
| ARTIFACTS: diagrams, sketches, real UI captures (with alt)   |
+--------------------------------------------------------------+
| RELATED: 2–3 entries sharing a domain                        |
+--------------------------------------------------------------+
```

- **Signature moment:** "Options considered" is a visual comparison block, showing each option and its rejection reason side by side on desktop; it stacks on mobile.
- **Reading progress** is shown in the table of contents only. No progress bars in the body.
- **Figures** use a caption only where the caption adds information.

### 4.4 Journal index (`/journal`)

```
+--------------------------------------------------------------+
| HEADER: "Journal" + one-line purpose                         |
| FILTER: tag · year                                           |
+--------------------------------------------------------------+
| DATED LIST (year-grouped)                                    |
|  date   Title                                                |
|         One-line summary          tags                       |
+--------------------------------------------------------------+
```

- A list, not a grid. Dates are the navigation.

### 4.5 Journal entry (`/journal/[slug]`)

```
+--------------------------------------------------------------+
| DATE · TITLE · TAGS                                          |
+--------------------------------------------------------------+
| BODY (reading column)                                        |
| Margin notes: terms with a linked decision or source appear  |
| as inline expandable notes (click or tap).                   |
+--------------------------------------------------------------+
| PREVIOUS / NEXT ENTRY                                        |
+--------------------------------------------------------------+
```

- Margin notes are the one signature interaction on this page. On desktop they sit in the margin; on mobile, they expand inline.

### 4.6 Engineering Lab index (`/lab`)

```
+--------------------------------------------------------------+
| HEADER: "Lab" + what the lab is (experiments, not products)  |
| STATUS FILTER: Open · Concluded · Abandoned                  |
+--------------------------------------------------------------+
| EXPERIMENT ROWS                                              |
|  Question (as a question)        Status badge    Date        |
|  One-line conclusion or "still open"                         |
+--------------------------------------------------------------+
```

- Abandoned experiments are listed with the same weight as concluded ones, with the reason they were abandoned.

### 4.7 Experiment (`/lab/[slug]`)

```
+--------------------------------------------------------------+
| TITLE (phrased as the question)  · STATUS · DATE             |
+--------------------------------------------------------------+
| QUESTION                                                     |
| SETUP: what was built or measured, and how                   |
| RESULT: data, diagram, or screenshot with alt text           |
| CONCLUSION: what was decided, and what remains uncertain     |
| REPRODUCE (optional): steps or a static replay of the run    |
+--------------------------------------------------------------+
```

- The Lab terminal replay (from Concept C) is an optional component on this page. It plays a pre-recorded run; it never executes code on the server.
- **Mobile:** replay becomes a static transcript with a "replay" control.

### 4.8 Skills (`/skills`)

```
+--------------------------------------------------------------+
| HEADER: "Skills, by problem" + note that each claim links    |
|         to evidence                                          |
+--------------------------------------------------------------+
| DOMAIN SECTION (repeating)                                   |
|  Domain name (a problem, e.g., "Rendering under load")       |
|  Two sentences: what I have done here and where it is weaker |
|  Evidence: links to entries in this domain                   |
|  Tags: technologies used in this domain                      |
+--------------------------------------------------------------+
| GAPS (optional): areas I am learning, labelled as such       |
+--------------------------------------------------------------+
```

- Honesty is the feature: a visible "learning" category with what is being built to learn it. This directly serves the spec's note about growing Go, gRPC, and distributed-systems experience.
- No self-rated skill bars. Proficiency is shown only through evidence links.

### 4.9 About (`/about`)

```
+--------------------------------------------------------------+
| SUMMARY: role, company context (as disclosed), focus areas   |
+--------------------------------------------------------------+
| EXPERIENCE: timeline of roles, each with 2–3 decision-level  |
|             highlights, linking to case studies              |
+--------------------------------------------------------------+
| FOCUS: what I am looking for next                            |
+--------------------------------------------------------------+
| RÉSUMÉ download · CONTACT                                    |
+--------------------------------------------------------------+
```

- The experience timeline is the recruiter's primary path, so it is the most scannable region on the site.
- Company details follow the disclosure rules in §5.

### 4.10 Now (`/now`)

```
+--------------------------------------------------------------+
| "Last updated: [date]"                                       |
| Current work (three items at most)                           |
| Recently finished (linked)                                   |
+--------------------------------------------------------------+
```

- Honest by design: the date is the signal. Stale pages are visibly stale, and the homepage shows the date.

### 4.11 Contact (`/contact`)

```
+--------------------------------------------------------------+
| One sentence on what kinds of conversations are welcome      |
| Channels (email, profile links)                              |
| RÉSUMÉ download                                              |
| Availability (only if the user provides it)                  |
+--------------------------------------------------------------+
```

### 4.12 404 (`/404`)

```
+--------------------------------------------------------------+
| "This page does not exist." (plain)                          |
| Links: Projects · Journal · Lab · Home                       |
+--------------------------------------------------------------+
```

---

## 5. Content model and disclosure tiers

Every case study, entry, and experiment uses these fields. Fields marked **(approve)** must be confirmed by the user before publication.

| Field | Notes |
|---|---|
| title, slug, period, role | Role and period as the user can disclose them |
| disclosure tier | See below |
| problem statement | One sentence |
| context, constraints, options, decision, validation, learnings | Sections of the case study |
| metrics | **(approve)**. None are included until the user supplies and approves them, with source. |
| artifacts | Diagrams, sketches, real UI captures. Only from work the user is permitted to show. |
| stack | Tags, shown in the index and on the case study |

**Disclosure tiers** (proposed; confirm the rules with the user and employer):

- **Public:** full detail, including names, artifacts, and metrics the user approves.
- **Sanitized:** full reasoning and decisions, with product names, customers, data, and identifiers removed. Says so in the disclosure note.
- **Summary only:** a short description of the problem and the engineering approach, with no artifacts. Used where even the sanitized form is not safe.
- **Withheld:** not listed. Not shown as a blank entry.

**Professional storytelling boundary:** the portfolio shows decisions and reasoning the user can describe. It does not claim outcomes, ownership, or scale that the user has not confirmed.

---

## 6. Features to design for, mapped to concepts

| Feature | Concept source | Where it appears | Priority |
|---|---|---|---|
| Decision-first project index | B | `/projects` | First release |
| Structured case study with options and rejected alternatives | B | `/projects/[slug]` | First release |
| Skills by problem domain with evidence links | B | `/skills` | First release |
| Opening statement and latest entries | B + A | `/` | First release |
| Dated Journal with margin notes | B | `/journal` | First release |
| Engineering Lab as experiment records | B | `/lab` | First release |
| Keyboard index search (⌘K) | C | Global | First release (basic) |
| Command palette beyond search | C | Global | Later |
| Lab terminal replay | C | `/lab/[slug]` | Later |
| Homepage entrance moment | A | `/` | First release |
| Scan sweep, anomaly debrief markers | A | — | Not planned |
| Full desktop window manager | C | — | Not planned |

---

## 7. Open questions for you

1. **PRODUCT_PLAN.md:** it is referenced but absent. If it exists elsewhere, point me to it. If not, I will treat `PORTFOLIO_SPEC.md` as the complete requirement source.
2. **Approve the direction:** Concept B as the spine, with the Concept A homepage moment and the Concept C search accelerator. Or pick a different concept.
3. **Projects to feature:** which work can be shown publicly, which only sanitized, and which only summarized? Confirm with your employer's disclosure rules.
4. **Metrics:** which numbers, if any, are approved for publication, and what is their source?
5. **Target roles:** frontend-leaning, backend/distributed-leaning, or both? This changes the Skills emphasis and the About focus.
6. **Lab content:** what experiments exist (even small ones) to seed the first release?
7. **Routes:** confirm the route names in §3.1, or suggest changes.

---

## 8. Next steps (after approval)

1. Confirm the direction and the open questions above.
2. Write the content model and the first case-study outline in `PRODUCT_PLAN.md` (if it is created, or in a new content brief).
3. Build the design system with the approved tokens: colors and fonts are chosen at that point, not before.
4. Build the homepage first, then the case study template, since it carries the heaviest reading load.
