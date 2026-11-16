"use client";

import type { ReactNode } from "react";

// A section whose background lights up softly under the mouse. The light
// position is written straight to CSS variables, so it never causes a React
// re-render. Touch input and reduced motion get the plain section.
export function SpotlightSection({
  id,
  className,
  ariaLabelledBy,
  children,
}: {
  id: string;
  className: string;
  ariaLabelledBy: string;
  children: ReactNode;
}) {
  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`spotlight ${className}`}
      onPointerMove={onPointerMove}
    >
      {children}
    </section>
  );
}
