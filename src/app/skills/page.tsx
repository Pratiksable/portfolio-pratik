import type { Metadata } from "next";
import { MissingNote } from "@/components/projects/missing-note";
import { SystemMap } from "@/components/features/system-map";
import { TechnologyExplorer, type ExplorerTechnology } from "@/components/skills/technology-explorer";
import { technologies, technologyGroups } from "@/content/skills";
import { resolveProjectLinks } from "@/lib/portfolio-links";

export const metadata: Metadata = {
  title: "Skills",
  description: "The technologies I have used, grouped by how I used them.",
};

const items: ExplorerTechnology[] = technologies.map((technology) => ({
  ...technology,
  connected: resolveProjectLinks(technology.projects),
}));

export default function SkillsPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      <header className="w-full px-6 md:px-12 xl:px-16 pb-10 pt-20 md:pt-28">
        <h1 className="font-display text-[clamp(2.75rem,8vw,5rem)] font-semibold leading-none tracking-[-0.03em]">
          Skills
        </h1>
        <p className="mt-6 max-w-prose text-lg text-text-muted">
          Technologies grouped by how I have used them. There are no percentage scores here.
          Each technology links to the case studies that used it, once those are approved.
        </p>
      </header>

      <div className="w-full space-y-24 px-6 md:px-12 xl:px-16 pb-24">
        <section aria-labelledby="explorer-title" className="border-t border-border pt-16">
          <h2 id="explorer-title" className="font-display text-3xl font-semibold tracking-tight">
            Technology explorer
          </h2>
          <div className="mt-10">
            <TechnologyExplorer groups={technologyGroups} items={items} />
          </div>
          <div className="mt-12 max-w-prose">
            <MissingNote label="the frontend technologies used at Digantara, so they can be listed under professional use" />
          </div>
        </section>

        <section aria-labelledby="layers-title">
          <h2 id="layers-title" className="font-display text-3xl font-semibold tracking-tight">
            How the layers connect
          </h2>
          <p className="mt-4 max-w-prose text-text-muted">
            A system runs from the interface down to the services, data, and the distributed
            behavior between them. Select a layer to see where my experience sits.
          </p>
          <div className="mt-10">
            <SystemMap />
          </div>
        </section>
      </div>
    </main>
  );
}
