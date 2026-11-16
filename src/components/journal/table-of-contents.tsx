"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/journal";

// Lists the article's sections. On wide screens it sits beside the article
// and tracks the section in view. On narrow screens it collapses into a
// disclosure above the text.
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const list = (
    <ol className="space-y-2 text-sm">
      {headings.map((heading) => {
        const isActive = activeId === heading.id;
        return (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : undefined}>
            <a
              href={`#${heading.id}`}
              aria-current={isActive ? "location" : undefined}
              className={`inline-flex min-h-8 items-center underline-offset-4 hover:text-text hover:underline ${
                isActive ? "font-medium text-text underline" : "text-text-muted"
              }`}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      <details className="mb-10 rounded-md border border-border p-4 lg:hidden">
        <summary className="min-h-11 cursor-pointer py-2 text-sm font-medium">On this page</summary>
        <div className="mt-3">{list}</div>
      </details>
      <nav aria-label="On this page" className="hidden lg:block">
        <p className="mb-4 text-sm font-medium">On this page</p>
        {list}
      </nav>
    </>
  );
}
