// Builds one project entry per public, non-fork repository on GitHub, using only
// what GitHub and each repository's README say. Run before every build, so a new
// public repository becomes a project on the next deploy. If GitHub cannot be
// reached, the previously generated file is kept, so the build still succeeds.
import { writeFileSync, existsSync, readFileSync } from "node:fs";

const USER = "Pratiksable";
// Excluded: an employer-named repository until confirmed, and the GitHub profile repository (configuration, not a project).
const EXCLUDED = new Set(["Digantara", "Pratiksable"]);
const OUT = "src/content/projects/github.generated.ts";

const CACHE = "src/content/projects/github.cache.json";
const token = process.env.GITHUB_TOKEN;
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "portfolio-sync",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};
// Each repository's README is fetched only when the repository has changed since
// the last successful sync. This keeps repeated builds inside GitHub's rate limit.
const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, "utf8")) : {};

function slugOf(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// A screenshot is used only when one has been taken of the repository's live site
// and saved in public/projects. Its source is recorded beside it.
function screenshotFor(slug, repo) {
  if (!repo.homepage || !existsSync(`public/projects/${slug}.png`)) return null;
  const today = new Date().toISOString().slice(0, 10);
  return {
    src: `/projects/${slug}.png`,
    alt: `Screenshot of the live  site`,
    source: `Screenshot of , taken .`,
  };
}

function categoryOf(language) {
  if (language === "Go") return "services";
  if (language === "TypeScript" || language === "JavaScript") return "interfaces";
  if (language === "Python") return "data";
  return "tooling";
}

function parseReadme(text) {
  const lines = text.split("\n");
  const h1 = lines.findIndex((l) => /^#\s+/.test(l));
  let intro = "";
  for (let i = h1 + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (/^#{1,6}\s/.test(line)) break;
    if (!line || line.startsWith("[![") || line.startsWith("<") || line.startsWith("!")) continue;
    intro = line;
    break;
  }
  const sections = [];
  let current = null;
  for (const line of lines) {
    const heading = /^#{2,3}\s+(.*)$/.exec(line);
    if (heading) {
      current = { title: heading[1].trim(), body: [] };
      sections.push(current);
    } else if (current) {
      current.body.push(line);
    }
  }
  const bullets = (matcher) => {
    const section = sections.find((s) => matcher.test(s.title));
    if (!section) return null;
    const items = section.body
      .map((l) => /^\s*[-*]\s+(.*)$/.exec(l)?.[1]?.replace(/[`*]/g, "").trim())
      .filter(Boolean)
      .slice(0, 8);
    return items.length ? items : null;
  };
  const architecture = sections.find((s) => /architecture|structure|design/i.test(s.title));
  return {
    intro: intro.slice(0, 400) || null,
    features: bullets(/features|highlights/i),
    architecture: architecture
      ? architecture.body.join(" ").replace(/\s+/g, " ").trim().slice(0, 600) || null
      : null,
  };
}

async function main() {
  let repos;
  try {
    const response = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner&sort=updated`, { headers });
    if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
    repos = await response.json();
  } catch (error) {
    console.warn(`sync-github: ${error.message}. Keeping the existing generated file.`);
    if (!existsSync(OUT)) writeFileSync(OUT, "import type { ProjectEntry } from \"@/types/content\";\n\nexport const githubProjects: ProjectEntry[] = [];\n");
    return;
  }

  const entries = [];
  for (const repo of repos) {
    if (repo.fork || EXCLUDED.has(repo.name)) continue;

    let readme = null;
    const cached = cache[repo.name];
    if (cached && cached.updated_at === repo.updated_at) {
      readme = cached.readme;
    } else {
      try {
        const response = await fetch(`https://api.github.com/repos/${USER}/${repo.name}/readme`, {
          headers: { ...headers, Accept: "application/vnd.github.raw" },
        });
        if (response.ok) {
          readme = parseReadme(await response.text());
          cache[repo.name] = { updated_at: repo.updated_at, readme };
        } else if (cached) {
          readme = cached.readme;
        }
      } catch {
        readme = cached ? cached.readme : null;
      }
    }

    const updated = new Date(repo.updated_at);
    const ageDays = (Date.now() - updated.getTime()) / 86_400_000;
    const summary = repo.description || readme?.intro || "No description on GitHub yet.";

    entries.push({
      slug: slugOf(repo.name),
      title: repo.name,
      kind: "personal",
      // Inferred: updated within 90 days counts as in progress. Correct per project if wrong.
      personalStatus: ageDays <= 90 ? "in-progress" : "completed",
      category: categoryOf(repo.language),
      status: "published",
      featured: false,
      detailsApproved: true,
      disclosure: "public",
      disclosureNote: "A public repository on GitHub. Shown as its owner wrote it there.",
      image: screenshotFor(slugOf(repo.name), repo),
      period: `${new Date(repo.created_at).getFullYear()} to ${updated.getFullYear()}`,
      role: null,
      stack: repo.language ? [repo.language] : [],
      decisionHeadline: null,
      summary,
      context: readme?.intro ? [readme.intro] : null,
      architecture: readme?.architecture
        ? { overview: [readme.architecture], components: readme.features ?? [] }
        : readme?.features
          ? { overview: [], components: readme.features }
          : null,
      constraints: null,
      options: null,
      decision: null,
      challenges: null,
      lessons: null,
      results: null,
      futureImprovements: null,
      related: [],
    });
  }

  writeFileSync(CACHE, JSON.stringify(cache, null, 2));
  const body = JSON.stringify(entries, null, 2);
  writeFileSync(
    OUT,
    `// Generated by scripts/sync-github.mjs from the owner's public GitHub repositories.\n// Do not edit by hand: change the repository, or add an override in projects.ts.\nimport type { ProjectEntry } from "@/types/content";\n\nexport const githubProjects: ProjectEntry[] = ${body};\n`,
  );
  console.log(`sync-github: wrote ${entries.length} projects.`);
}

main();
