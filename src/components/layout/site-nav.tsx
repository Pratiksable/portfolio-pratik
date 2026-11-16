"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useActiveSection } from "./use-active-section";

// Hrefs are absolute so the navigation works from every route.
export const navItems = [
  { id: "about", label: "About", href: "/about" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "blogs", label: "Blogs", href: "/blogs" },
  { id: "journal", label: "Journal", href: "/journal" },
  { id: "lab", label: "Lab", href: "/lab" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

const sectionIds = ["about", "lab", "contact"];

// Which item is current. Routes map directly; on the homepage the item follows
// the section in view.
function useCurrentItem(): string | null {
  const pathname = usePathname();
  const sectionActive = useActiveSection(sectionIds);

  if (pathname === "/about" || pathname === "/skills") return "about";
  if (pathname === "/projects" || pathname.startsWith("/projects/")) return "projects";
  if (pathname === "/blogs" || pathname.startsWith("/blogs/")) return "blogs";
  if (pathname === "/journal") return "journal";
  if (pathname === "/lab" || pathname.startsWith("/lab/")) return "lab";
  if (pathname === "/contact") return "contact";
  if (pathname === "/") return sectionActive;
  return null;
}

// A small drawn mark: a planet, an orbit, and a satellite. Decorative only.
function OrbitMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="4.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-24 12 12)" />
      <circle cx="20.6" cy="8.6" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Compact once the page has scrolled. The state changes only when crossing the
// threshold, so scrolling does not re-render the navigation on every event.
function useCompactOnScroll(): boolean {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    let current = false;
    function onScroll() {
      const next = window.scrollY > 24;
      if (next !== current) {
        current = next;
        setCompact(next);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return compact;
}

// Thin line along the header's bottom edge that tracks how far the page has
// been read. It is written directly to the DOM, so it costs no re-renders.
function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (ref.current) {
        ref.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
}

export function SiteHeaderNav() {
  const activeId = useCurrentItem();
  const compact = useCompactOnScroll();
  const progress = useRef<HTMLDivElement>(null);
  useScrollProgress(progress);

  return (
    <>
      <nav
        aria-label="Primary"
        className={`hidden w-full items-center justify-between gap-6 px-6 transition-[padding] duration-300 md:flex md:px-12 xl:px-16 ${
          compact ? "py-2.5" : "py-5"
        }`}
      >
        <Link href="/" className="group flex items-center gap-3 text-text">
          <span className="text-accent transition-transform duration-500 group-hover:rotate-12">
            <OrbitMark />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">{site.name}</span>
        </Link>
        <ul className="flex items-center gap-8 text-sm">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className="relative">
                <Link
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`inline-flex min-h-9 items-center transition-colors ${
                    isActive ? "text-text" : "text-text-muted hover:text-text"
                  }`}
                >
                  {item.label}
                </Link>
                {isActive ? <span key={item.id} aria-hidden="true" className="nav-underline" /> : null}
              </li>
            );
          })}
        </ul>
        <ThemeToggle />
      </nav>

      <div className="flex items-center justify-between gap-3 px-4 py-3 md:hidden">
        <div className="flex items-center gap-3">
          <span className="text-accent">
            <OrbitMark />
          </span>
          <Link href="/" className="font-display text-base font-semibold tracking-tight">
            {site.name}
          </Link>
        </div>
        <ThemeToggle />
      </div>

      <div
        ref={progress}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent"
      />
    </>
  );
}

// Bottom bar for phones. Rendered outside the header: a fixed element inside a
// backdrop-filtered ancestor would be positioned against that ancestor.
export function MobileNav() {
  const activeId = useCurrentItem();

  return (
    <nav
      aria-label="Primary mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden"
    >
      <ul className="grid grid-cols-6 gap-1 p-2">
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={`flex min-h-12 items-center justify-center rounded-full px-1 text-center text-sm transition-colors ${
                  isActive ? "bg-surface-raised font-medium text-text" : "text-text-muted"
                }`}
              >
                {isActive ? (
                  <span key={item.id} className="nav-pill">
                    {item.label}
                  </span>
                ) : (
                  item.label
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
