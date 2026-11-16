import { githubProjects } from "@/content/projects/github.generated";
import type { ProjectEntry } from "@/types/content";

// Hand-written case studies. An entry here with the same slug as a generated one
// replaces it, so the owner can add decisions and results to any repository.
const manual: ProjectEntry[] = [];

const manualSlugs = new Set(manual.map((entry) => entry.slug));
export const projects: ProjectEntry[] = [
  ...manual,
  ...githubProjects.filter((entry) => !manualSlugs.has(entry.slug)),
];
