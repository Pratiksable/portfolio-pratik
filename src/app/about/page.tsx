import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceTimeline, type TimelineEntry } from "@/components/about/experience-timeline";
import { Portrait } from "@/components/about/portrait";
import { Education } from "@/components/about/education";
import { MissingNote } from "@/components/projects/missing-note";
import { ButtonLink } from "@/components/ui/button-link";
import { journey, unwrittenAccount } from "@/content/about";
import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { technologies, technologyGroups } from "@/content/skills";
import { resolveProjectLinks } from "@/lib/portfolio-links";

export const metadata: Metadata = {
  title: "About",
  description: "Background, experience, and how my work has grown from frontend into backend.",
};

const timeline: TimelineEntry[] = experience.map((entry) => ({
  ...entry,
  connected: resolveProjectLinks(entry.relatedProjects),
}));

// Full-width bands. Only verified content appears; anything the owner has not
// written is labelled, never filled in.
export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      <section aria-labelledby="about-intro" className="border-b border-border">
        <div className="grid w-full items-center gap-12 px-6 pb-20 pt-24 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:px-12 md:pb-28 md:pt-32 xl:px-16">
          <Portrait />
          <div>
            <h1
              id="about-intro"
              className="font-display text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.98] tracking-[-0.03em]"
            >
              About
            </h1>
            <p className="mt-10 font-display text-[clamp(1.75rem,3.2vw,2.8rem)] leading-[1.15] tracking-[-0.02em]">
              {site.introduction}
            </p>
            <p className="mt-8 max-w-prose text-lg text-text-muted">{site.focus}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="journey-title" className="w-full px-6 py-24 md:px-12 md:py-32 xl:px-16">
        <h2 id="journey-title" className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
          The journey so far
        </h2>
        <div className="mt-16 grid gap-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            {journey.map((paragraph) => (
              <p key={paragraph.id} className="mb-8 text-lg leading-relaxed text-text-muted">
                {paragraph.text}
              </p>
            ))}
          </div>
          <div className="md:col-span-8">
            <ExperienceTimeline entries={timeline} />
          </div>
        </div>
      </section>

      <Education />

      <section aria-labelledby="stack-title" className="w-full border-t border-border px-6 py-24 md:px-12 md:py-32 xl:px-16">
        <h2 id="stack-title" className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
          Technologies, by how I used them
        </h2>
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {technologyGroups.map((group) => (
            <div key={group.id}>
              <h3 className="font-display text-2xl font-semibold tracking-tight">{group.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{group.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {technologies
                  .filter((technology) => technology.group === group.id)
                  .map((technology) => (
                    <li
                      key={technology.id}
                      className="rounded-md border border-border px-3 py-2 text-sm"
                    >
                      {technology.name}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12">
          <Link
            href="/skills"
            className="inline-flex min-h-11 items-center font-medium text-accent underline underline-offset-4 hover:text-accent-strong"
          >
            Explore the skills and systems
          </Link>
        </p>
      </section>

      <section aria-labelledby="words-title" className="w-full border-t border-border px-6 py-24 md:px-12 md:py-32 xl:px-16">
        <h2 id="words-title" className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
          In my own words
        </h2>
        <p className="mt-6 max-w-prose text-lg text-text-muted">
          These parts of the story are waiting for the owner to write them. They are not filled in
          on the owner&rsquo;s behalf.
        </p>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {unwrittenAccount.map((item) => (
            <MissingNote key={item.id} label={item.prompt} />
          ))}
        </div>
      </section>

      <section aria-labelledby="next-title" className="w-full border-t border-border px-6 py-24 md:px-12 md:py-32 xl:px-16">
        <h2 id="next-title" className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          See the work, or get in touch.
        </h2>
        <div className="mt-12 flex flex-wrap gap-4">
          <ButtonLink href="/projects" variant="primary">
            Browse projects
          </ButtonLink>
          <ButtonLink href="/#contact" variant="secondary">
            Contact
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
