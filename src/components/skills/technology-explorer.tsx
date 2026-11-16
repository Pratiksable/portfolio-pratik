"use client";

import Link from "next/link";
import { useState } from "react";
import { MissingNote } from "@/components/projects/missing-note";
import type { ProjectLink } from "@/lib/portfolio-links";
import type { Technology, TechnologyGroup, TechnologyGroupId } from "@/types/content";

export type ExplorerTechnology = Technology & { connected: ProjectLink[] };

type Filter = "all" | TechnologyGroupId;

// A technology explorer. Technologies are grouped by how they were used, and
// selecting one shows its summary, examples, and linked case studies. Every
// control is a button with a state, so it works from the keyboard.
export function TechnologyExplorer({
  groups,
  items,
}: {
  groups: TechnologyGroup[];
  items: ExplorerTechnology[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);

  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const visibleGroups = groups.filter((group) => filter === "all" || filter === group.id);

  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="space-y-10">
        <div role="group" aria-label="Show technologies by how they were used" className="flex flex-wrap gap-2">
          {(["all", ...groups.map((group) => group.id)] as Filter[]).map((value) => {
            const label = value === "all" ? "All" : (groups.find((group) => group.id === value)?.title ?? value);
            const isPressed = filter === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={isPressed}
                onClick={() => setFilter(value)}
                className={`min-h-11 rounded-md border px-4 text-sm ${
                  isPressed ? "border-accent text-text" : "border-border text-text-muted hover:text-text"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {visibleGroups.map((group) => {
          const groupItems = items.filter((item) => item.group === group.id);
          return (
            <section key={group.id} aria-labelledby={`group-${group.id}`}>
              <h3 id={`group-${group.id}`} className="font-display text-xl font-semibold tracking-tight">
                {group.title}
              </h3>
              <p className="mt-1 text-sm text-text-muted">{group.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {groupItems.map((item) => {
                  const isSelected = selected?.id === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedId(item.id)}
                        className={`min-h-11 rounded-md border px-3 text-left text-sm ${
                          isSelected ? "border-accent bg-surface-raised text-text" : "border-border text-text-muted hover:text-text"
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {selected ? (
        <div aria-live="polite" className="space-y-8 border-t border-border pt-8 md:border-t-0 md:pt-0">
          <div>
            <p className="text-sm text-text-muted">
              {groups.find((group) => group.id === selected.group)?.title}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{selected.name}</h3>
            <p className="mt-3 max-w-prose text-text-muted">{selected.summary}</p>
          </div>

          <div>
            <h4 className="font-medium">Technical examples</h4>
            <div className="mt-3">
              {selected.examples.length > 0 ? (
                <ul className="list-disc space-y-2 pl-5">
                  {selected.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              ) : (
                <MissingNote label="concrete technical examples from real work" />
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium">Case studies</h4>
            {selected.connected.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {selected.connected.map((project) => (
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
              <p className="mt-3 text-text-muted">No approved case study uses this yet.</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
