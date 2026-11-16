import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RelatedProjects } from "@/components/projects/related-projects";
import {
  ArchitectureSection,
  DecisionSection,
  ListSection,
  OptionsSection,
  TextSection,
} from "@/components/projects/case-study-sections";
import {
  categoryLabels,
  getProjectBySlug,
  getPublishedProjects,
  getRelatedProjects,
  personalStatusLabels,
} from "@/lib/projects";
import type { ProjectEntry } from "@/types/content";

// Only published projects are prerendered. Cache Components rejects a
// generateStaticParams that returns nothing, so the export is omitted while
// the archive is empty; every slug then resolves to notFound() below.
const publishedForStaticParams = getPublishedProjects();

export const generateStaticParams =
  publishedForStaticParams.length > 0
    ? () => publishedForStaticParams.map((project) => ({ slug: project.slug }))
    : undefined;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    // Unknown slugs can be served with a 200 status under Cache Components,
    // so they are kept out of search indexes explicitly.
    return { title: "Project not found", robots: { index: false, follow: false } };
  }
  return {
    title: project.title,
    description: project.summary ?? undefined,
  };
}

const disclosureText: Record<ProjectEntry["disclosure"], string> = {
  public: "Shown in full, with approved details.",
  sanitized: "Shown with names, data, and identifiers removed.",
  "summary-only": "Summarised only. Architecture, options, and results are withheld.",
};

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-sm text-text-muted">{label}</dt>
      <dd className="mt-1">{value ?? <span className="text-text-muted">Not yet approved</span>}</dd>
    </div>
  );
}

// While the archive is empty there are no static params, so this route is
// blocking: it resolves the slug before responding. That is what lets an
// unknown slug return a real 404 instead of a streamed 200 with a not-found body.
export const instant = false;

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const summaryOnly = project.disclosure === "summary-only";
  const related = getRelatedProjects(project, getPublishedProjects());
  const kind =
    project.kind === "professional"
      ? "Professional"
      : project.personalStatus
        ? `Personal, ${personalStatusLabels[project.personalStatus].toLowerCase()}`
        : "Personal";

  return (
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      <article className="w-full px-6 md:px-12 xl:px-16 pb-24 pt-16 md:pt-24">
        <nav aria-label="Breadcrumb" className="text-sm text-text-muted">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/projects" className="underline underline-offset-4 hover:text-text">
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-text">
              {project.title}
            </li>
          </ol>
        </nav>

        {project.image ? (
          <figure className="mt-10">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface-inset">
              <Image src={project.image.src} alt={project.image.alt} fill sizes="(min-width: 1024px) 60rem, 100vw" className="object-cover object-top" priority />
            </div>
            <figcaption className="mt-3 text-sm text-text-muted">{project.image.source}</figcaption>
          </figure>
        ) : null}

        <header className="mt-10 border-b border-border pb-12">
          <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            {project.title}
          </h1>
          {project.decisionHeadline ? (
            <p className="mt-6 font-display text-2xl leading-snug tracking-tight md:text-3xl">
              {project.decisionHeadline}
            </p>
          ) : null}
          {project.summary ? (
            <p className="mt-6 max-w-prose text-lg text-text-muted">{project.summary}</p>
          ) : null}

          <dl className="mt-10 grid gap-6 text-sm sm:grid-cols-2 md:grid-cols-4">
            <Field label="Type" value={kind} />
            <Field label="Category" value={categoryLabels[project.category]} />
            <Field label="Role" value={project.role} />
            <Field label="Period" value={project.period} />
          </dl>

          <div className="mt-10 max-w-prose rounded-md bg-surface-inset p-5">
            <p className="font-medium">Disclosure: {project.disclosure.replace("-", " ")}</p>
            <p className="mt-1 text-text-muted">{disclosureText[project.disclosure]}</p>
            {project.disclosureNote ? (
              <p className="mt-2 text-text-muted">{project.disclosureNote}</p>
            ) : null}
          </div>

          {project.stack.length > 0 ? (
            <p className="mt-8 text-sm text-text-muted">Stack: {project.stack.join(", ")}</p>
          ) : null}
        </header>

        <TextSection
          id="context"
          title="Context and problem"
          items={project.context}
          missing="context and the problem being solved"
          withheld={summaryOnly}
        />
        <ArchitectureSection project={project} withheld={summaryOnly} />
        <ListSection
          id="constraints"
          title="Constraints"
          items={project.constraints}
          missing="technical, business, and disclosure constraints"
          withheld={summaryOnly}
        />
        <OptionsSection project={project} withheld={summaryOnly} />
        <DecisionSection project={project} withheld={summaryOnly} />
        <ListSection
          id="challenges"
          title="Challenges"
          items={project.challenges}
          missing="challenges encountered"
          withheld={summaryOnly}
        />
        <ListSection
          id="lessons"
          title="Lessons learned"
          items={project.lessons}
          missing="lessons learned"
          withheld={summaryOnly}
        />
        <ListSection
          id="results"
          title="Results"
          items={project.results}
          missing="approved results (only outcomes the owner has cleared for publication)"
          withheld={summaryOnly}
        />
        <ListSection
          id="future"
          title="Future improvements"
          items={project.futureImprovements}
          missing="future improvements"
          withheld={summaryOnly}
        />

        <RelatedProjects projects={related} />
      </article>
    </main>
  );
}
