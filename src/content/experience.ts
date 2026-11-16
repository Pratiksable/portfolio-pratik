import type { ExperienceEntry } from "@/types/content";

// Professional history. Taken from the owner's LinkedIn profile. Responsibilities
// are the owner's own descriptions. Entries left empty are gaps the owner can fill.
export const experience: ExperienceEntry[] = [
  {
    id: "digantara-sde1",
    role: "SDE-1",
    organization: "Digantara",
    startDate: "Nov 2025",
    endDate: null,
    current: true,
    summary: "Full-time, Bengaluru, Karnataka, India.",
    responsibilities: [],
    ownership: null,
    relatedProjects: [],
  },
  {
    id: "digantara-intern",
    role: "Software Intern",
    organization: "Digantara",
    startDate: "May 2025",
    endDate: "Nov 2025",
    current: false,
    summary: "Internship, on-site. Skills: Python, Tailwind CSS, and more.",
    responsibilities: [
      "Collaborating with the product and backend teams to develop responsive and data-driven web interfaces.",
      "Optimizing UI components and improving load times for enhanced user experience.",
      "Contributing to scalable frontend architecture using React, TypeScript, and modern UI libraries.",
      "Assisting in code reviews, maintaining clean Git workflows, and ensuring deployment readiness.",
    ],
    ownership: null,
    relatedProjects: [],
  },
  {
    id: "dinedash-founder",
    role: "Founder",
    organization: "DineDash (self-employed)",
    startDate: "Feb 2024",
    endDate: "Sep 2024",
    current: false,
    summary:
      "Hybrid, Bengaluru, Karnataka, India. Built a food-tech startup focused on simplifying restaurant discovery and digital ordering.",
    responsibilities: [
      "Designed and developed the frontend architecture using React Native and Firebase.",
      "Led a small cross-functional team handling UI/UX design, app performance, and feature releases.",
      "Conducted market research and user testing to validate product-market fit and improve usability.",
    ],
    ownership:
      "Designed and developed the frontend architecture, and led a small cross-functional team on UI/UX, app performance, and feature releases.",
    relatedProjects: [],
  },
  {
    id: "inilax-frontend",
    role: "Frontend Web Developer",
    organization: "Inilax",
    startDate: "Oct 2023",
    endDate: "Nov 2023",
    current: false,
    summary: "Internship, on-site, Bengaluru, Karnataka, India.",
    responsibilities: [
      "Designed and coded responsive web pages for a Learning Management System (LMS).",
      "Implemented reusable UI components using HTML, CSS, JavaScript, and React.",
      "Collaborated with designers via Figma to translate mockups into production-ready interfaces.",
      "Improved overall UI consistency and accessibility across the platform.",
    ],
    ownership: null,
    relatedProjects: [],
  },
];
