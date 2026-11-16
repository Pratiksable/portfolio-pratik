import type { ReactNode } from "react";
import { MissingNote } from "./missing-note";
import type { ProjectEntry } from "@/types/content";

// Shared section shell for every case study. Headings are h2; the page title
// is the only h1. Labels are sentence case, with no eyebrows or numbering.
export function CaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-border py-14">
      <h2 id={`${id}-title`} className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      <div className="mt-6 max-w-prose space-y-4 text-lg leading-relaxed">{children}</div>
    </section>
  );
}

// A section whose content is paragraphs. Missing content is labelled.
export function TextSection({
  id,
  title,
  items,
  missing,
  withheld = false,
}: {
  id: string;
  title: string;
  items: string[] | null;
  missing: string;
  withheld?: boolean;
}) {
  return (
    <CaseSection id={id} title={title}>
      {items && items.length > 0 ? (
        items.map((item) => <p key={item}>{item}</p>)
      ) : (
        <MissingNote label={missing} withheld={withheld} />
      )}
    </CaseSection>
  );
}

// A section whose content is a list. Missing content is labelled.
export function ListSection({
  id,
  title,
  items,
  missing,
  withheld = false,
}: {
  id: string;
  title: string;
  items: string[] | null;
  missing: string;
  withheld?: boolean;
}) {
  return (
    <CaseSection id={id} title={title}>
      {items && items.length > 0 ? (
        <ul className="list-disc space-y-3 pl-5">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <MissingNote label={missing} withheld={withheld} />
      )}
    </CaseSection>
  );
}

// Architecture: an overview, then the components that make it up.
export function ArchitectureSection({
  project,
  withheld = false,
}: {
  project: ProjectEntry;
  withheld?: boolean;
}) {
  const architecture = project.architecture;
  return (
    <CaseSection id="architecture" title="Architecture">
      {architecture ? (
        <>
          {architecture.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {architecture.components.length > 0 ? (
            <ul className="mt-6 space-y-2 border-l border-border pl-5">
              {architecture.components.map((component) => (
                <li key={component}>{component}</li>
              ))}
            </ul>
          ) : null}
        </>
      ) : (
        <MissingNote label="architecture overview and components" withheld={withheld} />
      )}
    </CaseSection>
  );
}

// Options considered, each with the reason it was rejected. This is where the
// trade-off reasoning is most visible, so it is set as a definition list.
export function OptionsSection({
  project,
  withheld = false,
}: {
  project: ProjectEntry;
  withheld?: boolean;
}) {
  const options = project.options;
  return (
    <CaseSection id="options" title="Options and trade-offs">
      {options && options.length > 0 ? (
        <dl className="space-y-6">
          {options.map((option) => (
            <div key={option.name}>
              <dt className="font-medium">{option.name}</dt>
              <dd className="mt-1 text-text-muted">Rejected because {option.rejectedBecause}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <MissingNote label="options considered and reasons for rejecting them" withheld={withheld} />
      )}
    </CaseSection>
  );
}

// The decision and the trade-off accepted with it.
export function DecisionSection({
  project,
  withheld = false,
}: {
  project: ProjectEntry;
  withheld?: boolean;
}) {
  const decision = project.decision;
  return (
    <CaseSection id="decision" title="Decision">
      {decision ? (
        <>
          <p className="font-display text-2xl leading-snug tracking-tight">{decision.choice}</p>
          <p>
            <span className="font-medium">Trade-off accepted.</span> {decision.tradeoff}
          </p>
        </>
      ) : (
        <MissingNote label="the decision and the trade-off accepted" withheld={withheld} />
      )}
    </CaseSection>
  );
}
