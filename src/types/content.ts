export type Disclosure = "public" | "sanitized" | "summary-only";

export type ContentStatus = "draft" | "published";

export type SkillStatus = "practiced" | "growing";

export type ProjectKind = "professional" | "personal";

// Personal projects must declare how far along they are.
export type PersonalStatus = "completed" | "in-progress" | "conceptual";

export type ProjectCategory = "interfaces" | "services" | "data" | "distributed" | "tooling";

export type SystemNode = {
  id: string;
  label: string;
  summary: string;
  status: SkillStatus;
};

export type TechnologyGroupId = "professional" | "growing" | "portfolio";

export type TechnologyGroup = {
  id: TechnologyGroupId;
  title: string;
  description: string;
};

// A technology is listed under the group that matches how it was used. Fields
// that the owner has not supplied are empty, and the UI says so.
export type Technology = {
  id: string;
  name: string;
  group: TechnologyGroupId;
  summary: string;
  // Concrete technical examples, written by the owner. Empty until approved.
  examples: string[];
  // Slugs of case studies that used this technology. Empty until approved.
  projects: string[];
};

export type ExperienceEntry = {
  id: string;
  role: string;
  organization: string;
  startDate: string | null;
  endDate: string | null;
  current: boolean;
  summary: string;
  responsibilities: string[];
  // What the owner decided or owned in this role. Null until written.
  ownership: string | null;
  // Slugs of case studies connected to this role. Empty until approved.
  relatedProjects: string[];
};

export type AboutParagraph = {
  id: string;
  text: string;
};

export type ProjectOption = {
  name: string;
  rejectedBecause: string;
};

// A case study. Any field set to null is shown on the page as a labelled
// "not yet approved" block, never silently omitted or invented.
export type ProjectEntry = {
  slug: string;
  title: string;
  kind: ProjectKind;
  personalStatus: PersonalStatus | null;
  category: ProjectCategory;
  status: ContentStatus;
  featured: boolean;
  // Professional work may be published only after the owner approves its
  // public details. Personal work sets this to true by its own choice.
  detailsApproved: boolean;
  // A real picture of the project, such as a screenshot of its live site. Null when none exists.
  image?: { src: string; alt: string; source: string } | null;
  disclosure: Disclosure;
  disclosureNote: string;
  period: string | null;
  role: string | null;
  stack: string[];
  decisionHeadline: string | null;
  summary: string | null;
  context: string[] | null;
  architecture: { overview: string[]; components: string[] } | null;
  constraints: string[] | null;
  options: ProjectOption[] | null;
  decision: { choice: string; tradeoff: string } | null;
  challenges: string[] | null;
  lessons: string[] | null;
  results: string[] | null;
  futureImprovements: string[] | null;
  related: string[];
};

export type ExperimentPreview = {
  slug: string;
  title: string;
  status: ContentStatus;
  summary: string;
};
