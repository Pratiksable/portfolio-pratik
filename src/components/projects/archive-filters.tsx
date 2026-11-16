import Link from "next/link";
import type { PersonalStatus, ProjectCategory } from "@/types/content";
import { categoryLabels, personalStatusLabels } from "@/lib/projects";

export type ActiveFilters = {
  q: string;
  category: ProjectCategory | null;
  personalStatus: PersonalStatus | null;
};

// Builds an archive URL that carries only the filters that are set.
export function archiveHref(filters: Partial<ActiveFilters>): string {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.category) params.set("category", filters.category);
  if (filters.personalStatus) params.set("personalStatus", filters.personalStatus);
  const query = params.toString();
  return query ? `/projects?${query}` : "/projects";
}

const categoryKeys = Object.keys(categoryLabels) as ProjectCategory[];
const statusKeys = Object.keys(personalStatusLabels) as PersonalStatus[];

// A plain GET form. It works without JavaScript, and every filter state is
// a shareable URL.
export function ArchiveFilters({ active }: { active: ActiveFilters }) {
  return (
    <div className="space-y-6">
      <form action="/projects" method="get" role="search" className="grid gap-4 md:grid-cols-[1fr_14rem_auto] md:items-end">
        {active.category ? <input type="hidden" name="category" value={active.category} /> : null}
        <div>
          <label htmlFor="archive-q" className="block text-sm font-medium">
            Search projects
          </label>
          <input
            id="archive-q"
            name="q"
            type="search"
            defaultValue={active.q}
            placeholder="Title, decision, or technology"
            className="mt-2 min-h-11 w-full rounded-md border border-border bg-surface-raised px-3 text-text placeholder:text-text-muted"
          />
        </div>
        <div>
          <label htmlFor="archive-status" className="block text-sm font-medium">
            Personal work status
          </label>
          <select
            id="archive-status"
            name="personalStatus"
            defaultValue={active.personalStatus ?? ""}
            className="mt-2 min-h-11 w-full rounded-md border border-border bg-surface-raised px-3 text-text"
          >
            <option value="">Any status</option>
            {statusKeys.map((key) => (
              <option key={key} value={key}>
                {personalStatusLabels[key]}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="min-h-11 rounded-md bg-accent px-5 font-medium text-text-inverse hover:bg-accent-strong"
        >
          Apply
        </button>
      </form>

      <nav aria-label="Categories" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <Link
          href={archiveHref({ q: active.q, personalStatus: active.personalStatus })}
          aria-current={active.category === null ? "true" : undefined}
          className={`min-h-11 inline-flex items-center underline-offset-4 ${
            active.category === null ? "font-medium text-text underline" : "text-text-muted hover:text-text"
          }`}
        >
          All categories
        </Link>
        {categoryKeys.map((key) => {
          const isActive = active.category === key;
          return (
            <Link
              key={key}
              href={archiveHref({ q: active.q, category: key, personalStatus: active.personalStatus })}
              aria-current={isActive ? "true" : undefined}
              className={`min-h-11 inline-flex items-center underline-offset-4 ${
                isActive ? "font-medium text-text underline" : "text-text-muted hover:text-text"
              }`}
            >
              {categoryLabels[key]}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
