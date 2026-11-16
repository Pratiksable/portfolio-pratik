import type { SystemNode, Technology, TechnologyGroup } from "@/types/content";

// Groups describe how a technology was used, never how strong the claim is.
// There are no percentage bars and no self-rated levels. Examples are the
// owner's own descriptions from their profile; empty lists are gaps to fill.
export const technologyGroups: TechnologyGroup[] = [
  {
    id: "professional",
    title: "Used professionally",
    description: "Work done in my roles at Digantara, DineDash, and Inilax.",
  },
  {
    id: "growing",
    title: "Growing experience",
    description: "Technologies I am actively building experience with.",
  },
  {
    id: "portfolio",
    title: "Used to build this site",
    description: "Tools in this repository, taken from its package.json.",
  },
];

const t = (technology: Technology) => technology;

export const technologies: Technology[] = [
  t({
    id: "space-interfaces",
    name: "Complex interfaces for space-related systems",
    group: "professional",
    summary: "Frontend engineering on complex, space-related interfaces at Digantara.",
    examples: [],
    projects: [],
  }),
  t({
    id: "react",
    name: "React",
    group: "professional",
    summary: "Used for component-based frontend work at Digantara and Inilax.",
    examples: [
      "Contributing to scalable frontend architecture using React, TypeScript, and modern UI libraries.",
      "Implemented reusable UI components using HTML, CSS, JavaScript, and React.",
    ],
    projects: [],
  }),
  t({
    id: "typescript",
    name: "TypeScript",
    group: "professional",
    summary: "Used alongside React on frontend architecture at Digantara.",
    examples: [
      "Contributing to scalable frontend architecture using React, TypeScript, and modern UI libraries.",
    ],
    projects: [],
  }),
  t({
    id: "javascript",
    name: "JavaScript",
    group: "professional",
    summary: "Used to build interactive interface components at Inilax.",
    examples: ["Implemented reusable UI components using HTML, CSS, JavaScript, and React."],
    projects: [],
  }),
  t({
    id: "react-native",
    name: "React Native",
    group: "professional",
    summary: "Used for the frontend architecture of the DineDash app.",
    examples: ["Designed and developed the frontend architecture using React Native and Firebase."],
    projects: [],
  }),
  t({
    id: "firebase",
    name: "Firebase",
    group: "professional",
    summary: "Used with React Native for the DineDash app.",
    examples: ["Designed and developed the frontend architecture using React Native and Firebase."],
    projects: [],
  }),
  t({
    id: "tailwind",
    name: "Tailwind CSS",
    group: "professional",
    summary: "Listed on my profile for the Digantara role and for this site.",
    examples: [],
    projects: [],
  }),
  t({
    id: "html-css",
    name: "HTML and CSS",
    group: "professional",
    summary: "Used to build responsive web pages at Inilax.",
    examples: ["Designed and coded responsive web pages for a Learning Management System (LMS)."],
    projects: [],
  }),
  t({
    id: "figma",
    name: "Figma",
    group: "professional",
    summary: "Used to turn designers' mockups into interfaces at Inilax.",
    examples: ["Collaborated with designers via Figma to translate mockups into production-ready interfaces."],
    projects: [],
  }),
  t({
    id: "git",
    name: "Git",
    group: "professional",
    summary: "Used for clean workflows and code reviews at Digantara.",
    examples: ["Assisting in code reviews, maintaining clean Git workflows, and ensuring deployment readiness."],
    projects: [],
  }),
  t({
    id: "python",
    name: "Python",
    group: "professional",
    summary: "Listed on my profile. Details of how I used it are still to be added.",
    examples: [],
    projects: [],
  }),
  t({
    id: "go",
    name: "Go",
    group: "growing",
    summary: "Growing experience with backend engineering in Go.",
    examples: [],
    projects: [],
  }),
  t({
    id: "grpc",
    name: "gRPC",
    group: "growing",
    summary: "Growing experience with gRPC.",
    examples: [],
    projects: [],
  }),
  t({
    id: "databases",
    name: "Databases",
    group: "growing",
    summary: "Growing experience with databases.",
    examples: [],
    projects: [],
  }),
  t({
    id: "distributed-systems",
    name: "Distributed systems",
    group: "growing",
    summary: "Growing experience with distributed systems.",
    examples: [],
    projects: [],
  }),
  t({
    id: "nextjs",
    name: "Next.js",
    group: "portfolio",
    summary: "The framework this site runs on (version 16, App Router).",
    examples: [],
    projects: [],
  }),
  t({
    id: "mdx",
    name: "MDX",
    group: "portfolio",
    summary: "Journal articles are written in MDX.",
    examples: [],
    projects: [],
  }),
];

// The layers of a system, from interface to distributed behavior. Summaries
// use only what the owner has said about each layer.
export const systemNodes: SystemNode[] = [
  {
    id: "interface",
    label: "Interface",
    summary: "Where my professional work sits: complex, space-related frontends.",
    status: "practiced",
  },
  {
    id: "contract",
    label: "Contract",
    summary: "The gRPC boundary between a client and a service. Growing experience with gRPC.",
    status: "growing",
  },
  {
    id: "service",
    label: "Service",
    summary: "Backend services. Growing experience with backend engineering in Go.",
    status: "growing",
  },
  {
    id: "data",
    label: "Data",
    summary: "Databases behind the services. Growing experience with databases.",
    status: "growing",
  },
  {
    id: "distributed",
    label: "Distributed behavior",
    summary: "Systems spread across machines. Growing experience with distributed systems.",
    status: "growing",
  },
];
