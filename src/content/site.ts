// Site-wide facts. Every statement here must come from approved sources
// (PORTFOLIO_SPEC.md) or be explicitly approved by the owner.

export const site = {
  name: "Pratik Sable",
  title: "Pratik Sable: Frontend Engineer",
  description:
    "Frontend engineer building complex interfaces for space-related systems, and growing into Go, gRPC, databases, and distributed systems.",
  role: "SDE1 Frontend Engineer",
  introduction:
    "I build frontend systems for complex, space-related interfaces. I am growing into the backend side of the same problems: Go services, gRPC, databases, and distributed systems.",
  focus:
    "I care most about the places where a system's behavior becomes hard to read: live data, shared contracts between services, and interfaces that have to stay correct under load.",
  // Contact channels are unset until the owner approves them.
  // The contact section only renders a link when a channel is provided.
  contact: {
    email: "pratiksable491@gmail.com" as string | null,
    linkedin: "https://www.linkedin.com/in/pratiksable2503/" as string | null,
    github: "https://github.com/Pratiksable" as string | null,
  },
} as const;
