import Link from "next/link";
import { categoryLabels } from "@/lib/projects";
import type { ProjectEntry } from "@/types/content";

// Next steps through the archive. Rendered only when there is something to
// link to, so the page never shows an empty navigation region.
export function RelatedProjects({ projects }: { projects: ProjectEntry[] }) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-title" className="border-t border-border py-14">
      <h2 id="related-title" className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
        Related projects
      </h2>
      <ul className="mt-6 divide-y divide-border border-y border-border">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`} className="group block py-5">
              <p className="text-sm text-text-muted">{categoryLabels[project.category]}</p>
              <p className="mt-1 font-display text-xl font-semibold tracking-tight group-hover:underline">
                {project.title}
              </p>
              {project.decisionHeadline ? (
                <p className="mt-1 text-text-muted">{project.decisionHeadline}</p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
