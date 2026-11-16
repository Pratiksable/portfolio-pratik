import type { AboutParagraph } from "@/types/content";

// Statements in the journey come from the owner's spec and LinkedIn profile.
// Personal motivation is not in either, so it is listed as "not yet written"
// for the owner to answer in their own words.
export const journey: AboutParagraph[] = [
  {
    id: "current-work",
    text: "My professional work is frontend engineering on complex, space-related interfaces, as an SDE-1 at Digantara.",
  },
  {
    id: "growing-into-backend",
    text: "I am growing into the backend side of those systems: Go, backend engineering, gRPC, databases, and distributed systems.",
  },
  {
    id: "founding",
    text: "Before that I built DineDash, a food-tech startup focused on simplifying restaurant discovery and digital ordering, and I led its frontend and a small team through design, performance, and releases.",
  },
];

export const unwrittenAccount: { id: string; prompt: string }[] = [
  {
    id: "space-and-systems",
    prompt: "your own account of why space technology and complex systems interest you",
  },
  {
    id: "backend-move",
    prompt: "your own account of how your work moved from frontend into backend and full-stack engineering",
  },
  {
    id: "what-dinedash-taught",
    prompt: "your own account of what building DineDash taught you",
  },
];
