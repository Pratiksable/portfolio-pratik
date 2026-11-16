# DESIGN_SYSTEM.md

Design system rules for Pratik Sable's portfolio. Based on the approved direction in `DESIGN_BLUEPRINT.md` (Engineering Journal spine, Mission Control homepage moment, Developer OS search accelerator).

**Status:** Proposed for review. This document defines roles, rules, and patterns. **It does not choose colors or fonts.** Those are chosen when design tokens are built (milestone M1, backlog B-002), after this document is approved.

**Related:** `ARCHITECTURE.md` (components, routes, animation layers), `PRODUCT_PLAN.md` (requirements), `CLAUDE.md` (engineering standards).

---

## 1. Design principles

1. **Reasoning first.** Visual hierarchy favors decisions, trade-offs, and evidence over decoration. If a visual element does not help someone understand the work, it is cut.
2. **Quiet surroundings, one memorable thing per page.** Each page has one deliberate moment (the homepage entrance, a comparison block, a replay). Everything else stays disciplined.
3. **Honest visuals.** No fabricated data, live-looking telemetry, or decorative statistics. Status shown is status that exists in the content.
4. **Text is the primary medium.** The reading experience is the core product. Typography, measure, and rhythm get the most care.
5. **Structure carries information.** Borders, dividers, numbering, and labels encode meaning, or they are removed. Numbering appears only where content is a true sequence (for example, a timeline).
6. **Accessible by default.** The quality floor (contrast, focus, reduced motion, touch targets, reflow) is part of every component, not a later pass.

---

## 2. Token architecture

Tokens are defined once, in CSS custom properties exposed through Tailwind v4's `@theme`. Components reference **semantic** tokens only. Raw values live in the primitive layer and are never used in components (CLAUDE.md, Styling).

```
primitive   raw values (palette steps, font families, scale steps)   — values chosen in M1
   ↓
semantic    roles used by components (surface, text, accent, ...)    — roles defined here
   ↓
component   optional component-level tokens (rare; only when needed)
```

### 2.1 Color roles (values not chosen)

| Role | Purpose | Minimum contrast |
|---|---|---|
| `surface` | Page background | — |
| `surface-raised` | Cards, search dialog, filter panel | Text on it meets 4.5:1 |
| `surface-inset` | Code blocks, figure backgrounds | Text on it meets 4.5:1 |
| `text` | Body and headings | 4.5:1 on `surface` |
| `text-muted` | Metadata: dates, periods, roles | 4.5:1 on `surface` (no lighter) |
| `text-inverse` | Text on accent fills | 4.5:1 on the accent fill |
| `border` | Dividers, card edges | 3:1 where it is the only cue for an element |
| `accent` | Links, primary action, focus emphasis | 4.5:1 for link text on `surface` |
| `accent-strong` | Hover and pressed accent | 4.5:1 |
| `focus` | Focus ring | 3:1 against adjacent colors (WCAG 2.4.11 and 2.4.13) |
| `status-open` | Lab: open experiment | Never the only signal; always paired with a text label |
| `status-concluded` | Lab: concluded experiment | Same rule |
| `status-abandoned` | Lab: abandoned experiment | Same rule |
| `tier-public` | Disclosure: public | Same rule |
| `tier-sanitized` | Disclosure: sanitized | Same rule |
| `tier-summary` | Disclosure: summary only | Same rule |
| `learning` | Skills: learning areas | Same rule |

**Rules**
- Every role has a light and a dark value. Dark mode is a separate value set, not inverted colors.
- A palette must produce distinct status and tier roles that remain distinguishable in grayscale.
- No pure `#000` or `#fff` for body text on large surfaces without a check; tinted neutrals are preferred.
- Accent color is used for interaction (links, focus, primary action), not for decoration.

### 2.2 Typography roles (families not chosen)

The system uses **one or two families**, clearly distinct from each other if two are used (frontend-design guidance).

| Role | Use | Notes |
|---|---|---|
| `font-display` | Homepage opening statement, page titles | The one place typographic character is pushed |
| `font-heading` | Section headings (`h2`–`h4`) | |
| `font-body` | Reading text in case studies, journal, lab | Optimized for long reading; slightly larger line height if serif |
| `font-ui` | Navigation, buttons, badges, labels, form fields | May equal `font-body` if one family is chosen |
| `font-mono` | Code blocks and inline code only | Never used for labels, metadata, or decoration |

**Type scale.** A single modular scale with named steps. Steps are roles, not sizes:

| Step | Role |
|---|---|
| `display` | Homepage opening statement only |
| `title` | Page `h1` |
| `heading-lg` | Section `h2` |
| `heading-md` | Subsection `h3` |
| `heading-sm` | `h4` and card titles |
| `body-lg` | Lead paragraph (case-study summary, entry summary) |
| `body` | Default reading text. Minimum 16px. |
| `body-sm` | Metadata, captions, badges. Minimum 14px. |
| `code` | Inline and block code |

**Reading measure:** 65–75 characters (under 80). Line height for body text is at least 1.5 (serif text slightly more).

**Weight rules:** use a small number of weights (for example regular, medium, semibold). Weight is not used alone to signal status.

### 2.3 Spacing scale

A 4px base with named steps. Step values are proposed here and confirmed in M1.

| Step | Proposed value | Typical use |
|---|---|---|
| `space-1` | 4px | Icon-to-label gap |
| `space-2` | 8px | Tag spacing, minimum gap between touch targets |
| `space-3` | 12px | Compact stacks |
| `space-4` | 16px | Default stack, card padding (mobile) |
| `space-6` | 24px | Section sub-blocks |
| `space-8` | 32px | Between major blocks |
| `space-12` | 48px | Section separation |
| `space-16` | 64px | Page section rhythm on desktop |
| `space-24` | 96px | Homepage opening breathing room (desktop only) |

### 2.4 Layout tokens

| Token | Purpose | Proposed |
|---|---|---|
| `measure-reading` | Reading column max width | 70ch |
| `measure-page` | Overall content max width | 1120px |
| `gutter` | Side padding | 16px (mobile), 24px (md), 32px (lg) |
| `radius-sm`, `radius-md` | Corners | Two radii only. Used by hierarchy, not applied uniformly to everything. |
| `elevation-1` | Raised surfaces (dialog, dropdown) | One shadow level only |

**Rules**
- Left edge of text is shared by header, page title, and body. Body and title share one left edge.
- Left and right content edges are equal on every page.
- Corner radius varies with hierarchy: containers and dialogs use one value; small controls use another. Nothing uses a radius as a generic style.

### 2.5 Iconography

- Real icons from a single set, in one style (stroke weight consistent), with an `aria-hidden` attribute when decorative.
- Icons are never the only label for an action; icon-only buttons require `aria-label`.
- Icons are not used as emoji substitutes, and emoji are not used in UI or content chrome.
- Target icon set to be selected in M1 (proposed: one open-licensed set, inline SVG).

---

## 3. Visual rules

### 3.1 Structure

- **Dividers:** used to separate sections of a reading page, not to outline every element. No boxes around everything.
- **Cards:** used only for items that are compared or scanned side by side (project rows on desktop, skill domains on the Skills page). A case study body is not carded.
- **Numbering:** only for true sequences (experience timeline, a process described step by step). Never on the homepage capability map or project lists.
- **Labels and eyebrows:** no tracked all-caps eyebrow labels above headings. No "WORD — fragment" constructions. No middle-dot strings ("A · B · C") as metadata; use a list or a separate line.

### 3.2 Hierarchy

- Decision headlines are the most prominent text in a project row, above the title's metadata.
- In a case study, the problem statement is set as `body-lg` directly under the title. It is not styled as a callout.
- Metadata (period, role, stack) is `body-sm` in `text-muted`. It never competes with the decision.

### 3.3 Imagery

- Real artifacts (diagrams, sketches, real interface captures) are preferred to illustration or stock imagery.
- Images have no caption unless the caption adds information that is not already in the text or alt. Credit or disclosure lines go in the footnote, not beside the image.
- Every image reserves its space. Alt text is required (ARCHITECTURE §8).
- No photography of people is planned for v1. If added, it needs a separate decision.

### 3.4 Dark mode

- Respects the system preference by default, with a visible control to switch (client-side, persisted in local storage; no server state).
- Dark values are tuned separately (ARCHITECTURE §8 contrast rules apply to both modes).
- Images and diagrams are checked on both backgrounds; transparent PNG artwork gets a background where needed.

---

## 4. Component rules

Each component has a purpose, explicit variants, required states, accessibility rules, and things it must not do.

Variants are named values (`tone="learning"`), never stacks of booleans. Compound components are used for multi-part patterns (ARCHITECTURE §3).

### 4.1 Primitives

**Button**
- Variants: `primary` (one per view, the main action), `secondary`, `ghost` (in toolbars and the header).
- Sizes: default (44px minimum touch target), `compact` only for dense toolbars and only where 44px cannot fit; the touch-target rule still applies through padding.
- States: default, hover, focus-visible, active, disabled, loading (when an action is pending).
- Rules: labels are verbs or specific nouns ("Download résumé", "Clear filters"), never "Click here" or "Submit" when a more specific label exists. Icon-only buttons require `aria-label`.
- Must not: be used for navigation (use `Link`), or have a label that changes meaning on hover.

**Link**
- Always underlined in body text. Underline may be offset or thinned but never removed from body links (users must identify links without color).
- External links indicate the new-tab or external status in text, not only with an icon.
- Must not: use "→" as decoration in link text (frontend-design guidance).

**Badge**
- Used for disclosure tier, status, and tags.
- Every badge has a text label. Color and shape are reinforcements, never the only signal.
- Variants: `tier` (public, sanitized, summary-only), `status` (open, concluded, abandoned), `tag` (technology), `learning`.
- Rules: tags are plain text chips; they are not links unless they filter a list (then they are buttons with `aria-pressed`).

**Figure**
- Required `alt` (build-time enforced). Optional caption only when it adds information.
- Responsive `sizes`. Reserved aspect ratio.
- Must not: hold a decorative image with informative alt text, or an informative image with empty alt.

**Disclosure** (native `<details>`)
- Used for the margin-note fallback, long options, and the disclosure note on case studies.
- Works without JavaScript. Summary text describes the content ("Why not a managed queue?"), not "Show more".

**Container, Stack, Prose**
- Containers set the page measure. Stacks set vertical rhythm from the spacing scale. Prose styles MDX output and must not contain its own inline styles.

### 4.2 Layout components

**SiteHeader**
- Contains the name (link to home), four primary links, search trigger.
- Current page: `aria-current="page"` on its link and a visible indicator that is not color alone (for example, an underline weight change).
- Collapses to the mobile navigation below 768px.

**MobileNav (bottom bar)**
- Four items with icon and text label. Each item at least 44px tall.
- Must stay within the safe area on devices with a home indicator.
- Hidden at 768px and above; the header navigation takes over.

**SiteFooter**
- Secondary navigation (Skills, Now, Contact), résumé link, copyright line. No social icons unless the user asks for them.

**Breadcrumb**
- Shown on case studies and experiments only. Ends with the current page as text, not a link.

**SkipLink**
- Visually hidden until focused. Targets `main`. Appears first in the DOM.

### 4.3 Content components

**ProjectRow** (projects index)
- Fields in fixed order: decision headline, title, period, role, stack tags, disclosure badge.
- The decision headline is the link target for the row (one link per row, not one per field).
- Shared-element view transition: title moves to the case-study heading (ARCHITECTURE §6).
- Mobile: same fields, stacked, same order.

**FilterBar** (projects, lab)
- Uses URL search params. Every filter change is a navigation that updates the list.
- Shows the active filters as text ("Showing 4 of 12 projects, domain: rendering").
- Results count is announced through a live region (`aria-live="polite"`).
- Empty result: explains which filter caused it and offers a single "Clear filters" button.
- Must not: hide filters behind a menu on desktop.

**DecisionHeadline**
- Renders the "Chose X over Y because Z" line as one sentence. It is not split into styled fragments.

**OptionsComparison** (case studies)
- Compound component: `OptionsComparison.Option` (name and summary) and `OptionsComparison.Reason` (why it lost).
- Desktop: options laid out side by side with the decision marked by text ("Chosen"), not only by a highlight color.
- Mobile: stacked; order is the same as desktop, and the chosen option comes first.
- Must not: make the chosen option look like an error or a warning, or hide the rejected options.

**MarginNote** (MDX)
- A term in the text, activated by click, tap, or focus, shows a note.
- Desktop: note placed in the margin beside the term. Mobile: note expands inline below the paragraph.
- Keyboard: term is a `button` with `aria-expanded` and `aria-controls`. Escape closes the note.
- Must not: rely on hover alone; must not hide essential content (every note's content also appears in the text or in a list at the end of the entry).

**TOC** (case studies)
- Lists the section headings. Desktop: sticky side column. Mobile: a collapsed `<details>` at the top of the article.
- Current section marked with `aria-current="location"` (position indicator), not color alone.

**DomainSection** (skills)
- Heading is the domain's problem title. Status badge says "Practiced" or "Learning" as text.
- Evidence list links to entries; if there is no evidence, the domain cannot be rendered as "Practiced" (build rule).

**ExperienceTimeline**
- Ordered list, most recent first. The one place numbering or ordinal structure is appropriate, because it is a sequence in time. Dates are shown as text.

**EntryList** (journal, lab)
- Year-grouped for journal; status-grouped or date-sorted for lab. Each row has date, title, one-line summary, and tags.
- Abandoned experiments appear with the same visual weight as concluded ones.

**DisclosureNote**
- Shown on every case study. States the tier and what is withheld, in plain sentences.
- Must not look like a legal warning (no alert styling). It is information, set in `body-sm`.

**StatusBadge**
- Maps a content status to a badge variant. The mapping lives in one place; components do not map status themselves.

### 4.4 Feature components

**SearchDialog** (keyboard search)
- Native `<dialog>`, labelled, focus trapped while open. Opens with `/` or `⌘K` / `Ctrl+K`.
- Input is the first focusable element. Results are a list with arrow-key navigation.
- Escape closes and returns focus to the trigger. Enter opens the selected result.
- Shows a clear message for no results and suggests checking spelling or clearing filters.
- Loads the index only on first open.

**HomeEntrance**
- One CSS-driven entrance on the homepage opening statement. Plays once per page load.
- Reduced motion: no motion; content is visible immediately.
- No entrance on any other page.

**ReplayPlayer** (later)
- Play, pause, step, and restart controls with text labels. Duration and current step shown as text.
- Reduced motion: shows the static transcript and a step control, no automatic playback.
- Must not: autoplay, or start without a user action.

---

## 5. Content and voice rules

These apply to all visible text: headings, labels, buttons, errors, metadata, and body copy. They follow the writing guidance in the frontend-design skill.

- Sentence case for headings and labels. No all-caps labels.
- Active voice. Buttons say what happens ("Download résumé", "Clear filters", "Open case study").
- Plain words. Name things by what a reader understands ("Decision", "Options considered"), not by internal system names.
- Errors and empty states explain what happened and what to do. They do not apologize and are never vague.
- One accent per headline at most, and never a single highlighted word for effect. Frontend-design guidance flags this as a common generated-page tell.
- No superlatives or unsupported claims ("best", "world-class", "seamless"). Claims are backed by the case study.
- Measure: body paragraphs stay within the reading column; headlines are short enough to read in one line on desktop.

---

## 6. Interaction patterns and motion

### 6.1 Motion tokens

Motion is referenced by name. Durations and easings are chosen in M1 and documented here by role.

| Token | Role | Used for |
|---|---|---|
| `motion-instant` | No visible transition | Reduced-motion fallback for everything |
| `motion-fast` | Hover and press feedback | Buttons, links, rows |
| `motion-base` | State changes that show what changed | Margin note open, disclosure open, filter result update |
| `motion-slow` | One-time moments | Homepage entrance only |
| `ease-standard` | Most transitions | Default easing |
| `ease-exit` | Things leaving the screen | Dialog close, note collapse |

**Rules**
- Only `transform` and `opacity` are animated. Layout properties are never animated.
- Exit motion is shorter than enter motion.
- Every motion token has an instant variant under `prefers-reduced-motion: reduce`.
- No scroll-triggered reveals, parallax, or looping decorative animation.

### 6.2 Interaction states

Every interactive component defines these states:

| State | Visual rule | Non-visual rule |
|---|---|---|
| Default | Standard color and weight | — |
| Hover | Small color or underline change; no layout shift | Hover is never the only way to reveal content |
| Focus-visible | Visible focus ring at 3:1 contrast, offset from the element | Focus order follows reading order |
| Active (pressed) | Small scale or color step (≤ 2%) | — |
| Disabled | Reduced contrast, but still readable | `disabled` attribute; reason shown in text where useful |
| Selected or current | Visible without color alone (weight, underline, or a text marker) | `aria-current` or `aria-pressed` |
| Expanded | Visible change in content | `aria-expanded` |

### 6.3 Interaction patterns

| Pattern | Behavior |
|---|---|
| **Filter** | Changing a filter updates the URL and the list. The count is announced. Browser back restores the previous filter. |
| **Margin note** | Click, tap, or Enter/Space opens. Escape closes. Focus stays on the term. |
| **Search** | `/` or `⌘K` opens. Arrow keys move through results. Enter opens. Escape closes and returns focus. |
| **Table of contents** | Desktop: sticky, marks the current section. Mobile: collapsed at the top of the page; expanding does not move the reading position. |
| **Shared element** | Project title becomes the case-study heading during navigation, when supported. Otherwise, a plain navigation. |
| **Homepage moment** | Plays once on the homepage opening statement. Never repeats on scroll. Skipped under reduced motion. |
| **Options comparison** | Static. No animation. Stacks on mobile. |

### 6.4 Keyboard shortcuts

| Key | Action | Condition |
|---|---|---|
| `/` | Open search | Not while typing in a field |
| `⌘K` / `Ctrl+K` | Open search | Always |
| `Esc` | Close the open dialog, note, or menu | When one is open |
| `↑` / `↓` | Move through search results or filter options | Inside search or listbox controls |
| `Enter` | Open selected result | Inside search |

Shortcuts are listed in the search dialog. They never replace a visible control.

---

## 7. Responsive rules

| Breakpoint | Name | Component changes |
|---|---|---|
| 360px | base | Bottom nav. Single column. Stacked options and project rows. Inline margin notes. TOC collapsed. |
| 768px | `md` | Header navigation. Two-column layouts for index lists where content fits. Options comparison in a grid. |
| 1024px | `lg` | Sticky TOC. Margin notes in the margin. Filter bar on one line. |
| 1280px | `xl` | Wider gutters only. No new structure. |

- Test at 360, 768, 1024, and 1280 for every component that changes at a breakpoint.
- Touch targets stay at least 44 × 44 px across breakpoints.
- Long strings (URLs, stack names, code) wrap or scroll inside their container, never push the page wider.

---

## 8. Accessibility checklist for components

Applies to every component. A component is not done until all items pass.

- [ ] Semantic element used (button, link, list, table, heading) before ARIA.
- [ ] Accessible name for every control, including icon-only controls.
- [ ] Keyboard operable; focus order matches reading order.
- [ ] Focus visible at 3:1 against adjacent colors.
- [ ] Text contrast meets 4.5:1 (body) or 3:1 (large text, UI components), in both light and dark modes.
- [ ] Status and tier shown with text, not color alone.
- [ ] Reduced-motion variant defined and checked.
- [ ] Touch targets at least 44 × 44 px with 8 px spacing.
- [ ] Reflows at 320 CSS px and 200% zoom with no loss of content.
- [ ] Live regions used for results that change without a page load.
- [ ] No content hidden behind hover alone.

---

## 9. Anti-patterns (not used)

The following are common generated-page tells, drawn from the frontend-design guidance and the Taste house rules. None appear in this system.

| Anti-pattern | Why not |
|---|---|
| Tracked all-caps eyebrow labels above headings | Template chrome; adds noise |
| "WORD — fragment" labels and middle-dot metadata strings | Template chrome |
| One highlighted word in a headline (italic, bold, or colored) | Accent for effect, not meaning |
| Identical rounded cards for all content | Flattens hierarchy; cards are reserved for compared items |
| Gradient washes as decoration | Decoration without information |
| Soft grey drop shadows on every card | One elevation level only |
| Stock photography or abstract illustration | Not evidence of work |
| Emoji in UI or content chrome | Not an icon set; inconsistent rendering |
| `→` in link or button text | Decorative arrow; replaced by a plain verb |
| Animated counters, fake telemetry, live-looking data | Violates honest-visuals principle |
| Fade-and-slide on every section | Generic motion; only the homepage moment is planned |
| Skill bars and self-rated proficiency | Unverifiable; evidence links replace them |
| Hidden navigation behind hover only | Not keyboard or touch accessible |

---

## 10. Things this system deliberately does not decide yet

These are chosen in milestone M1 and recorded here afterward:

- Color values (light and dark) for every semantic role in §2.1.
- Font families and the final type scale values for §2.2.
- Final spacing values in §2.3 (proposed, not confirmed).
- Motion durations and easing curves for §6.1.
- Icon set.
- Logo or wordmark treatment, if any.

Once chosen, each value is added to the token source and this document is updated with the chosen values and the reason for each.

---

## 11. Review checklist before M1 starts

- [ ] Concept B direction and the component rules in §4 are approved.
- [ ] The no-backend decision in `ARCHITECTURE.md` §11 is approved.
- [ ] Interaction and motion rules in §6 are approved, including the single homepage moment.
- [ ] Voice and content rules in §5 are approved.
- [ ] Open items in `ARCHITECTURE.md` §15 are answered.
