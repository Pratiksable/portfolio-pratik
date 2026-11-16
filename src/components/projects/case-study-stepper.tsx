"use client";

import { useState } from "react";

const stages = [
  {
    id: "problem",
    label: "Problem",
    body: "What was failing or missing, stated in concrete terms, with the constraints that made it hard.",
  },
  {
    id: "options",
    label: "Options considered",
    body: "Two or three real alternatives, each with the specific reason it was rejected.",
  },
  {
    id: "decision",
    label: "Decision and trade-off",
    body: "The choice that was made, and the cost that was accepted with it.",
  },
  {
    id: "results",
    label: "Results",
    body: "Only outcomes the owner has approved for publication. Nothing is estimated or implied.",
  },
  {
    id: "lessons",
    label: "Lessons",
    body: "What would be done differently next time, and what carries over to other work.",
  },
] as const;

// An interactive walkthrough of a case study's structure. Each stage is a
// button, and the panel explains what that stage holds. It shows the template,
// not any project, so no work is claimed.
export function CaseStudyStepper() {
  const [activeId, setActiveId] = useState<(typeof stages)[number]["id"]>("problem");
  const active = stages.find((stage) => stage.id === activeId) ?? stages[0];

  return (
    <div>
      <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-5">
        {stages.map((stage, index) => {
          const isActive = stage.id === activeId;
          return (
            <li key={stage.id} className="bg-surface">
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveId(stage.id)}
                className={`flex min-h-24 w-full flex-col items-start justify-between gap-6 p-5 text-left transition-colors hover:bg-surface-raised ${
                  isActive ? "bg-surface-raised" : ""
                }`}
              >
                <span className="text-sm text-text-muted">{String(index + 1).padStart(2, "0")}</span>
                <span
                  className={`font-display text-xl font-semibold tracking-tight ${
                    isActive ? "text-text" : "text-text-muted"
                  }`}
                >
                  {stage.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-0.5 w-full ${isActive ? "bg-accent" : "bg-transparent"}`}
                />
              </button>
            </li>
          );
        })}
      </ol>

      <div aria-live="polite" className="mt-10 max-w-prose">
        <h3 className="font-display text-2xl font-semibold tracking-tight">{active.label}</h3>
        <p className="mt-3 text-lg text-text-muted">{active.body}</p>
      </div>
    </div>
  );
}
