export type EducationEntry = {
  id: string;
  institution: string;
  degree: string;
  period: string;
  grade: string | null;
  summary: string;
  recognition: string[];
};

// From the owner's LinkedIn profile, most recent first.
export const education: EducationEntry[] = [
  {
    id: "bms",
    institution: "BMS Institute of Technology and Management",
    degree: "Bachelor of Engineering, Information Technology",
    period: "Dec 2021 to Jul 2025",
    grade: "8.0",
    summary:
      "Foundation in software development, frontend technologies, and data analytics. Coursework in Data Structures and Algorithms, Web Technologies, Database Management Systems, and Software Engineering.",
    recognition: [
      "1st prize, Code-Fiesta Hackathon (SJBIT, 2023).",
      "2nd prize, National Cyber Security Hackathon (IEEE BMSCE, 2023).",
    ],
  },
  {
    id: "new-tulip",
    institution: "The New Tulip International School",
    degree: "Science",
    period: "Jun 2013 to Jul 2021",
    grade: null,
    summary: "Activities and societies: Football, MUN, Cricket.",
    recognition: [],
  },
];
