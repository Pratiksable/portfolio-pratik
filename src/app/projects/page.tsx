import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArchiveFilters, type ActiveFilters } from "@/components/projects/archive-filters";
import { FeaturedProject } from "@/components/projects/featured-project";
import { ProjectCard } from "@/components/projects/project-row";
import {
  categoryLabels,
  filterProjects,
  getFeaturedProject,
  getPublishedProjects,
  personalStatusLabels,
} from "@/lib/projects";
import type { PersonalStatus, ProjectCategory } from "@/types/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies of engineering work: architecture, decisions, trade-offs, challenges, and lessons.",
};

type SearchParams = Promise<{ q?: string; category?: string; personalStatus?: string }>;

// Unknown or malformed parameters are ignored rather than reflected back.
function parseFilters(params: { q?: string; category?: string; personalStatus?: string }): ActiveFilters {
  const categoryKeys = Object.keys(categoryLabels) as ProjectCategory[];
  const statusKeys = Object.keys(personalStatusLabels) as PersonalStatus[];

  const category = categoryKeys.find((key) => key === params.category) ?? null;
  const personalStatus = statusKeys.find((key) => key === params.personalStatus) ?? null;
  const q = (params.q ?? "").trim().slice(0, 100);

  return { q, category, personalStatus };
}

export default function ProjectsArchive({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      <header className="w-full px-6 md:px-12 xl:px-16 pb-10 pt-20 md:pt-28">
        <h1 className="font-display text-[clamp(2.75rem,8vw,5rem)] font-semibold leading-none tracking-[-0.03em]">
          Projects
        </h1>
        <p className="mt-6 max-w-prose text-lg text-text-muted">
          Case studies of engineering work. Each one sets out the architecture, the options
          considered and rejected, the decision and its trade-off, and what was learned.
          Professional work appears only with approved public details. Personal work is marked
          completed, in progress, or conceptual.
        </p>
      </header>

      <div className="w-full px-6 md:px-12 xl:px-16">
        <Suspense fallback={<p className="py-16 text-text-muted">Loading projects.</p>}>
          <ArchiveContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function ArchiveContent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const active = parseFilters(params);
  const published = getPublishedProjects();
  const isFiltered = Boolean(active.q || active.category || active.personalStatus);

  const featured = isFiltered ? undefined : getFeaturedProject(published);
  const results = filterProjects(
    published.filter((entry) => entry.slug !== featured?.slug),
    {
      q: active.q,
      category: active.category ?? undefined,
      personalStatus: active.personalStatus ?? undefined,
    },
  );

  return (
    <div className="space-y-12 pb-24">
      <ArchiveFilters active={active} />

      {featured ? <FeaturedProject project={featured} /> : null}

      <section aria-labelledby="results-title">
        <h2 id="results-title" className="font-display text-2xl font-semibold tracking-tight">
          {isFiltered ? "Matching projects" : "All projects"}
        </h2>
        <p role="status" aria-live="polite" className="mt-2 text-sm text-text-muted">
          {published.length === 0
            ? "No projects are published yet."
            : `${results.length} of ${published.length} shown.`}
        </p>

        {results.length > 0 ? (
          <ul className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {results.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </ul>
        ) : (
          <div className="mt-6 max-w-prose space-y-3 text-text-muted">
            <p>
              {published.length === 0
                ? "Case studies appear here once their public details are approved. Nothing is shown before then."
                : "No projects match these filters."}
            </p>
            {isFiltered ? (
              <p>
                <Link href="/projects" className="text-accent underline underline-offset-4 hover:text-accent-strong">
                  Clear filters
                </Link>
              </p>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}
