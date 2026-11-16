import Link from "next/link";
import { categoryLabels, personalStatusLabels } from "@/lib/projects";
import type { ProjectEntry } from "@/types/content";

// The featured project gets the page's one deliberate moment: a larger
// headline. Its metadata follows the headline rather than leading it.
export function FeaturedProject({ project }: { project: ProjectEntry }) {
  const kind =
    project.kind === "professional"
      ? "Professional"
      : project.personalStatus
        ? `Personal, ${personalStatusLabels[project.personalStatus].toLowerCase()}`
        : "Personal";

  return (
    <section aria-labelledby="featured-title" className="border-b border-border pb-16">
      <h2 id="featured-title" className="sr-only">
        Featured project
      </h2>
      <p className="font-display text-3xl leading-tight tracking-tight md:text-5xl">
        {project.decisionHeadline}
      </p>
      <p className="mt-6 max-w-prose text-lg text-text-muted">{project.summary}</p>
      <p className="mt-4 text-sm text-text-muted">
        {kind}. {categoryLabels[project.category]}.
      </p>
      <p className="mt-8">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex min-h-11 items-center font-medium text-accent underline underline-offset-4 hover:text-accent-strong"
        >
          Read the case study: {project.title}
        </Link>
      </p>
    </section>
  );
}
