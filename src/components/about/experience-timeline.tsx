"use client";

import Link from "next/link";
import { useState } from "react";
import { MissingNote } from "@/components/projects/missing-note";
import type { ExperienceEntry } from "@/types/content";
import type { ProjectLink } from "@/lib/portfolio-links";

export type TimelineEntry = ExperienceEntry & { connected: ProjectLink[] };

function periodOf(entry: TimelineEntry): string {
  if (!entry.startDate) {
    return "Dates to be confirmed";
  }
  const end = entry.current ? "present" : (entry.endDate ?? "to be confirmed");
  return `${entry.startDate} to ${end}`;
}

// A vertical timeline. Each role is a disclosure: the first is open by default,
// and any role can be opened or closed with the keyboard or a pointer.
export function ExperienceTimeline({ entries }: { entries: TimelineEntry[] }) {
  const [openId, setOpenId] = useState<string | null>(entries[0]?.id ?? null);

  return (
    <ol className="space-y-10 border-l border-border pl-8">
      {entries.map((entry) => {
        const isOpen = openId === entry.id;
        const panelId = `experience-${entry.id}`;

        return (
          <li key={entry.id} className="relative">
            <span
              aria-hidden="true"
              className={`absolute -left-[2.4rem] top-2 size-3 rounded-full ${
                entry.current ? "bg-status-practiced" : "border-2 border-text-muted"
              }`}
            />
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId(isOpen ? null : entry.id)}
              className="min-h-11 w-full text-left"
            >
              <span className="block text-sm text-text-muted">
                {periodOf(entry)}
                {entry.current ? " (current)" : ""}
              </span>
              <span className="mt-1 block font-display text-2xl font-semibold tracking-tight">
                {entry.role}
              </span>
              <span className="block text-text-muted">{entry.organization}</span>
            </button>

            <div id={panelId} hidden={!isOpen} className="mt-6 max-w-prose space-y-8">
              <p>{entry.summary}</p>

              <div>
                <h4 className="font-medium">Responsibilities</h4>
                {entry.responsibilities.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    {entry.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-3">
                    <MissingNote label="responsibilities for this role" />
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium">Engineering ownership</h4>
                <div className="mt-3">
                  {entry.ownership ? (
                    <p>{entry.ownership}</p>
                  ) : (
                    <MissingNote label="what you owned and decided in this role" />
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium">Connected case studies</h4>
                {entry.connected.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {entry.connected.map((project) => (
                      <li key={project.slug}>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex min-h-11 items-center text-accent underline underline-offset-4 hover:text-accent-strong"
                        >
                          {project.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-text-muted">
                    No approved case study is connected to this role yet.
                  </p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
