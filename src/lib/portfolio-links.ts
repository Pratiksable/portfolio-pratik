import { getPublishedProjects } from "@/lib/projects";

export type ProjectLink = { slug: string; title: string };

// Turns project slugs from experience and skills data into links. A slug
// that does not name a published case study fails the build, so no link can
// point at a missing or unapproved page.
export function resolveProjectLinks(slugs: readonly string[]): ProjectLink[] {
  const published = getPublishedProjects();
  return slugs.map((slug) => {
    const project = published.find((entry) => entry.slug === slug);
    if (!project) {
      throw new Error(`Link to "${slug}" does not match a published case study.`);
    }
    return { slug, title: project.title };
  });
}
