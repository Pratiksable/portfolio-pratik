"use client";

import { useState } from "react";
import { systemNodes } from "@/content/skills";
import type { SystemNode } from "@/types/content";

// The signature visual: a schematic of the layers I work in, from interface
// to distributed behavior. Each node is a real control that reveals its
// description. Status is shown as text and shape, never color alone.
export function SystemMap() {
  const [selectedId, setSelectedId] = useState<string>(systemNodes[0]?.id ?? "");
  const selected: SystemNode | undefined =
    systemNodes.find((node) => node.id === selectedId) ?? systemNodes[0];

  if (!selected) {
    return null;
  }

  return (
    <figure className="blueprint-grid rounded-lg border border-border bg-surface-raised p-5 md:p-8">
      <ol className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-6">
        {systemNodes.map((node) => {
          const isSelected = node.id === selected.id;
          const isPracticed = node.status === "practiced";

          return (
            <li
              key={node.id}
              className="relative after:absolute after:left-1/2 after:top-full after:h-8 after:w-px after:-translate-x-1/2 after:bg-border after:content-[''] last:after:hidden md:after:left-full md:after:top-1/2 md:after:h-px md:after:w-6 md:after:translate-x-0 md:after:-translate-y-1/2"
            >
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedId(node.id)}
                className={`flex min-h-14 w-full flex-col items-start gap-3 rounded-md border bg-surface p-4 text-left transition-colors ${
                  isSelected ? "border-accent" : "border-border hover:border-text-muted"
                }`}
              >
                <span className="flex items-center gap-2 text-sm text-text-muted">
                  <span
                    aria-hidden="true"
                    className={
                      isPracticed
                        ? "size-3 rounded-full bg-status-practiced"
                        : "size-3 rounded-full border-2 border-status-growing"
                    }
                  />
                  {isPracticed ? "Practiced" : "Growing"}
                </span>
                <span className="font-medium text-text">{node.label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <figcaption className="mt-8 border-t border-border pt-6">
        <div aria-live="polite">
          <h4 className="font-display text-xl font-semibold tracking-tight">
            {selected.label}
          </h4>
          <p className="mt-2 max-w-prose text-text-muted">{selected.summary}</p>
        </div>
      </figcaption>
    </figure>
  );
}
