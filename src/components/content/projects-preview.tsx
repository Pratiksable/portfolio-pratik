import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { FeaturedProject } from "@/components/projects/featured-project";
import { CaseStudyStepper } from "@/components/projects/case-study-stepper";
import { getFeaturedProject, getPublishedProjects } from "@/lib/projects";

// Homepage preview of the archive. With no approved case studies it shows the
// structure every case study follows, so the section is useful without
// inventing any work.
export function ProjectsPreview() {
  const published = getPublishedProjects();
  const featured = getFeaturedProject(published);

  if (published.length === 0) {
    return (
      <div className="space-y-12">
        <p className="max-w-prose text-lg text-text-muted">
          No case studies are approved for publication yet. When they are, each one follows
          the same path, so you can see how the work was approached and why.
        </p>
        <CaseStudyStepper />
        <div>
          <ButtonLink href="/projects" variant="secondary">
            Open the project archive
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {featured ? <FeaturedProject project={featured} /> : null}
      <p>
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center font-medium text-accent underline underline-offset-4 hover:text-accent-strong"
        >
          See all {published.length} {published.length === 1 ? "project" : "projects"}
        </Link>
      </p>
    </div>
  );
}
