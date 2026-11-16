import { projects as allProjects } from "@/content/projects";
import type { PersonalStatus, ProjectCategory, ProjectEntry } from "@/types/content";

export const categoryLabels: Record<ProjectCategory, string> = {
  interfaces: "Interfaces",
  services: "Backend services",
  data: "Data",
  distributed: "Distributed systems",
  tooling: "Tooling",
};

export const personalStatusLabels: Record<PersonalStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  conceptual: "Conceptual",
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Build-time validation. A published entry that breaks a rule throws, which
// fails the build, so incomplete or unapproved work cannot ship.
export function validateProjects(entries: readonly ProjectEntry[]): void {
  const slugs = new Set<string>();

  for (const entry of entries) {
    const where = `Project "${entry.slug || "(no slug)"}"`;

    if (!slugPattern.test(entry.slug)) {
      throw new Error(`${where}: slug must be lowercase kebab-case.`);
    }
    if (slugs.has(entry.slug)) {
      throw new Error(`${where}: duplicate slug.`);
    }
    slugs.add(entry.slug);

    if (entry.status !== "published") {
      continue;
    }

    if (!entry.title.trim()) {
      throw new Error(`${where}: a published project needs a title.`);
    }
    if (!entry.summary) {
      throw new Error(`${where}: a published project needs a summary.`);
    }
    if (entry.kind === "professional" && !entry.detailsApproved) {
      throw new Error(`${where}: professional work needs approved public details.`);
    }
    if (entry.kind === "personal" && !entry.personalStatus) {
      throw new Error(`${where}: personal work must state completed, in-progress, or conceptual.`);
    }
    if (entry.disclosure !== "public" && !entry.disclosureNote.trim()) {
      throw new Error(`${where}: a ${entry.disclosure} project needs a disclosure note.`);
    }
    if (entry.disclosure === "summary-only") {
      if (entry.architecture || entry.options || entry.results) {
        throw new Error(
          `${where}: summary-only work cannot include architecture, options, or results.`,
        );
      }
    }
  }

  for (const entry of entries) {
    for (const relatedSlug of entry.related) {
      if (!slugs.has(relatedSlug)) {
        throw new Error(`Project "${entry.slug}" links to unknown project "${relatedSlug}".`);
      }
    }
  }
}

export function getPublishedProjects(): ProjectEntry[] {
  validateProjects(allProjects);
  return allProjects.filter((entry) => entry.status === "published");
}

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return getPublishedProjects().find((entry) => entry.slug === slug);
}

export type ProjectFilters = {
  q?: string;
  category?: ProjectCategory;
  personalStatus?: PersonalStatus;
};

function haystackOf(entry: ProjectEntry): string {
  return [
    entry.title,
    entry.summary ?? "",
    entry.decisionHeadline ?? "",
    entry.stack.join(" "),
    categoryLabels[entry.category],
    entry.kind,
    entry.personalStatus ? personalStatusLabels[entry.personalStatus] : "",
  ]
    .join(" ")
    .toLowerCase();
}

// Every search term must match somewhere in the entry (AND, not OR), so
// adding a word narrows results rather than widening them.
export function filterProjects(
  entries: readonly ProjectEntry[],
  filters: ProjectFilters,
): ProjectEntry[] {
  const terms = (filters.q ?? "")
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 0);

  return entries.filter((entry) => {
    if (filters.category && entry.category !== filters.category) {
      return false;
    }
    if (filters.personalStatus && entry.personalStatus !== filters.personalStatus) {
      return false;
    }
    const haystack = haystackOf(entry);
    return terms.every((term) => haystack.includes(term));
  });
}

export function getFeaturedProject(entries: readonly ProjectEntry[]): ProjectEntry | undefined {
  return entries.find((entry) => entry.featured);
}

// Explicitly linked projects first, then projects in the same category.
// Capped at three so the list stays a short, readable choice.
export function getRelatedProjects(
  current: ProjectEntry,
  entries: readonly ProjectEntry[],
): ProjectEntry[] {
  const published = entries.filter((entry) => entry.slug !== current.slug);
  const explicit = current.related
    .map((slug) => published.find((entry) => entry.slug === slug))
    .filter((entry): entry is ProjectEntry => entry !== undefined);
  const sameCategory = published.filter((entry) => entry.category === current.category);

  const seen = new Set<string>();
  const result: ProjectEntry[] = [];
  for (const entry of [...explicit, ...sameCategory]) {
    if (!seen.has(entry.slug)) {
      seen.add(entry.slug);
      result.push(entry);
    }
  }
  return result.slice(0, 3);
}
