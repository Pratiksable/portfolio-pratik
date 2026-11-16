import { ButtonLink } from "@/components/ui/button-link";
import { journey } from "@/content/about";
import { experience } from "@/content/experience";
import { systemNodes } from "@/content/skills";

// The homepage's About section. Everything here comes from content files that
// already hold verified statements; nothing is added for effect.
export function AboutPreview() {
  const current = experience[0];

  return (
    <div className="grid gap-16 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-5">
        <p className="font-display text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.15] tracking-[-0.02em]">
          {journey[0]?.text}
        </p>
        <p className="mt-8 text-lg text-text-muted">{journey[1]?.text}</p>

        {current ? (
          <p className="mt-10 text-sm text-text-muted">
            {current.role}, {current.organization}. {current.current ? "Current role." : ""}
          </p>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/about" variant="secondary">
            Background and experience
          </ButtonLink>
          <ButtonLink href="/skills" variant="secondary">
            Skills and systems
          </ButtonLink>
        </div>
      </div>

      <div className="md:col-span-7">
        <p className="text-sm text-text-muted">The layers I work in, from interface to distributed behavior.</p>
        <ol className="mt-6 divide-y divide-border border-y border-border">
          {systemNodes.map((node) => {
            const isPracticed = node.status === "practiced";
            return (
              <li
                key={node.id}
                className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 py-5 transition-colors hover:bg-surface-raised md:px-4"
              >
                <span
                  aria-hidden="true"
                  className={`mt-2 size-3 rounded-full ${
                    isPracticed ? "bg-status-practiced" : "border-2 border-status-growing"
                  }`}
                />
                <div>
                  <p className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-display text-xl font-semibold tracking-tight">{node.label}</span>
                    <span
                      className={`text-sm ${
                        isPracticed ? "text-status-practiced" : "text-status-growing"
                      }`}
                    >
                      {isPracticed ? "Practiced" : "Growing"}
                    </span>
                  </p>
                  <p className="mt-1 max-w-prose text-text-muted">{node.summary}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
