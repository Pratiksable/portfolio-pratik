import Image from "next/image";
import Link from "next/link";
import { categoryLabels, personalStatusLabels } from "@/lib/projects";
import type { ProjectEntry } from "@/types/content";

// One project as a card. A real picture of the project is shown when one
// exists. Otherwise the card states that there is no picture, rather than
// showing an invented one.
export function ProjectCard({ project }: { project: ProjectEntry }) {
  const kindLabel =
    project.kind === "professional"
      ? "Professional"
      : project.personalStatus
        ? `Personal, ${personalStatusLabels[project.personalStatus].toLowerCase()}`
        : "Personal";

  return (
    <li className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface-raised transition-colors hover:border-text-muted">
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-surface-inset">
          {project.image ? (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full flex-col justify-between p-6">
              <p className="text-sm text-text-muted">{categoryLabels[project.category]}</p>
              <p className="text-xs text-text-muted">No picture yet. There is no live site to capture.</p>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <p className="text-sm text-text-muted">
            {kindLabel}. {categoryLabels[project.category]}.
          </p>
          <h3 className="font-display text-2xl font-semibold tracking-tight group-hover:underline">
            {project.title}
          </h3>
          <p className="text-text-muted">{project.decisionHeadline ?? project.summary}</p>
          {project.stack.length > 0 ? (
            <p className="mt-auto pt-3 text-sm text-text-muted">{project.stack.join(", ")}</p>
          ) : null}
        </div>
      </Link>
    </li>
  );
}
