# Pratik Sable: Portfolio

A personal engineering portfolio: projects, case studies, writing, a bookmark
shelf, and an interactive hero with a 3D Earth. Built with Next.js (App Router),
TypeScript, Tailwind CSS, and React Three Fiber.

## Getting started

Requirements: Node.js 20.9 or later, and npm.

```bash
npm install
npm run dev        # development server at http://localhost:3000
npm run build      # production build (runs the GitHub sync first)
npm run start      # serve the production build
npm run lint       # ESLint
```

## What the site contains

| Route | What it is |
| --- | --- |
| `/` | Homepage: hero with the 3D Earth, about, projects preview, lab preview, contact |
| `/about` | Background, experience timeline, education and recognition, technologies |
| `/skills` | Technologies grouped by how they were used, and the system-layer diagram |
| `/projects` | Project archive (cards) and individual case-study pages |
| `/blogs` | Articles written by the owner, with categories, search, and a table of contents |
| `/journal` | A shelf of bookmarked articles from elsewhere, each with a note |
| `/lab` | Engineering concepts shown running, such as a token-bucket rate limiter |
| `/contact` | Contact channels and what makes a reply useful |

The `/lab/hero-prototype` route is a development-only page. It returns 404 in
production builds.

## Editing content

Content lives in `src/content/`. Components and pages do not need to change to
add content.

- **Site facts and contact channels:** `src/content/site.ts`
- **Experience:** `src/content/experience.ts`
- **Education:** `src/content/education.ts`
- **Technologies and system layers:** `src/content/skills.ts`
- **Hand-written case studies:** `src/content/projects.ts`. An entry here with
  the same slug as a generated project replaces it.
- **Blog articles:** `src/content/blogs/`. Each file is MDX with front matter
  (title, summary, category, status, dates, tags). Files starting with `_` are
  never published.
- **Bookmarks:** `src/content/bookmarks.ts`. Each link must start with `https://`.
- **Lab experiments:** `src/content/lab.ts`

Publication rules are enforced at build time. A published article needs a
`publishedAt` date, and a bad link or date fails the build rather than shipping.

## Projects from GitHub

`scripts/sync-github.mjs` runs before every build (`prebuild`). It reads the
owner's public, non-fork repositories and writes one project per repository to
`src/content/projects/github.generated.ts`, using each repository's description
and README. Repositories listed in the script's `EXCLUDED` set are skipped.

- READMEs are cached in `src/content/projects/github.cache.json` and re-read
  only when a repository changes.
- Set a `GITHUB_TOKEN` environment variable to raise GitHub's rate limit.
- If GitHub cannot be reached, the existing generated file is kept, so the build
  still succeeds.
- A project's card image comes from a screenshot saved in `public/projects/`
  whose file name matches the project slug. The screenshot's source is shown
  on the case-study page.

Personal project status (in progress or completed) is inferred from the last
update date. It is not yet labelled as inferred on the site.

## Homepage and the 3D Earth

The hero's Earth is rendered with React Three Fiber in `src/components/hero-3d/`.
It loads only in the browser, after the page's text, and it has a flat image
fallback for devices without WebGL. The planet's orientation follows the real
sun position for the current UTC time: light mode shows the sunlit side, and
dark mode shows the side in darkness.

Earth imagery is in `public/textures/earth/`. Its source is recorded in
`CREDITS.md` there and has not been verified yet.

## Theme

Light ("Morning") and dark ("Night") modes follow the visitor's operating system
until they choose one. The choice is kept in local storage in that browser only.

## Accessibility and motion

- Visible focus states, keyboard-operable controls, and labelled regions.
- Reduced-motion preferences disable the Earth's animation, reveals, and
  transitions.
- Text is always outside the WebGL canvas, and the 3D scene is never the only way
  to reach content.

## Project structure

```
src/
  app/              Routes and layouts (App Router)
  components/       UI primitives, layout, content, and feature components
    hero-3d/        The 3D Earth and its fallback
  content/          Site content: text, data, and MDX articles
  lib/              Build-time logic: validation, filtering, GitHub sync data
  types/            Shared TypeScript types
public/             Static assets: textures, project screenshots, icons
scripts/            Build scripts (GitHub sync)
```

## Licence

No licence has been chosen yet. Until one is added, all rights are reserved.


