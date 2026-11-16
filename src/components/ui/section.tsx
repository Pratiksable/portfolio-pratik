import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

type SectionProps = {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

// A homepage section. Headings carry the section; there are no eyebrow labels
// or numbering above them.
export function Section({ id, title, intro, children }: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-20 border-t border-border"
    >
      <div className="w-full px-6 py-20 md:px-12 md:py-28 xl:px-16">
        <h2
          id={headingId}
          className="font-display text-3xl font-semibold tracking-tight md:text-4xl"
        >
          {title}
        </h2>
        {intro ? <p className="mt-4 max-w-prose text-text-muted">{intro}</p> : null}
        <div className="mt-12">
          <Reveal>{children}</Reveal>
        </div>
      </div>
    </section>
  );
}
