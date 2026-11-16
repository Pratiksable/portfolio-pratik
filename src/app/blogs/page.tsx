import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { JournalRow } from "@/components/journal/journal-row";
import {
  filterArticles,
  getPublishedArticles,
  journalCategories,
  type JournalCategory,
} from "@/lib/journal";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Long-form notes on the engineering decisions behind the work.",
};

type SearchParams = Promise<{ q?: string; category?: string }>;

const categoryKeys = Object.keys(journalCategories) as JournalCategory[];

function parseParams(params: { q?: string; category?: string }) {
  return {
    q: (params.q ?? "").trim().slice(0, 100),
    category: categoryKeys.find((key) => key === params.category) ?? null,
  };
}

function journalHref(q: string, category: JournalCategory | null): string {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  const query = params.toString();
  return query ? `/blogs?${query}` : "/blogs";
}

export default function JournalIndex({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      <header className="w-full px-6 md:px-12 xl:px-16 pb-10 pt-20 md:pt-28">
        <h1 className="font-display text-[clamp(2.75rem,8vw,5rem)] font-semibold leading-none tracking-[-0.03em]">
          Blogs
        </h1>
        <p className="mt-6 max-w-prose text-lg text-text-muted">
          Long-form notes on the engineering decisions behind the work: what was tried, what
          broke, and what the trade-offs turned out to be.
        </p>
      </header>

      <div className="w-full px-6 md:px-12 xl:px-16 pb-24">
        <Suspense fallback={<p className="py-16 text-text-muted">Loading articles.</p>}>
          <JournalContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function JournalContent({ searchParams }: { searchParams: SearchParams }) {
  const active = parseParams(await searchParams);
  const published = getPublishedArticles();
  const isFiltered = Boolean(active.q || active.category);
  const results = filterArticles(published, { q: active.q, category: active.category ?? undefined });

  return (
    <div className="space-y-10">
      <form action="/blogs" method="get" role="search" className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        {active.category ? <input type="hidden" name="category" value={active.category} /> : null}
        <div>
          <label htmlFor="journal-q" className="block text-sm font-medium">
            Search articles
          </label>
          <input
            id="journal-q"
            name="q"
            type="search"
            defaultValue={active.q}
            placeholder="Title, summary, or tag"
            className="mt-2 min-h-11 w-full rounded-md border border-border bg-surface-raised px-3 text-text placeholder:text-text-muted"
          />
        </div>
        <button
          type="submit"
          className="min-h-11 rounded-md bg-accent px-5 font-medium text-text-inverse hover:bg-accent-strong"
        >
          Apply
        </button>
      </form>

      <nav aria-label="Categories" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <Link
          href={journalHref(active.q, null)}
          aria-current={active.category === null ? "true" : undefined}
          className={`min-h-11 inline-flex items-center underline-offset-4 ${
            active.category === null ? "font-medium text-text underline" : "text-text-muted hover:text-text"
          }`}
        >
          All categories
        </Link>
        {categoryKeys.map((key) => {
          const isActive = active.category === key;
          return (
            <Link
              key={key}
              href={journalHref(active.q, key)}
              aria-current={isActive ? "true" : undefined}
              className={`min-h-11 inline-flex items-center underline-offset-4 ${
                isActive ? "font-medium text-text underline" : "text-text-muted hover:text-text"
              }`}
            >
              {journalCategories[key]}
            </Link>
          );
        })}
      </nav>

      <section aria-labelledby="articles-title">
        <h2 id="articles-title" className="font-display text-2xl font-semibold tracking-tight">
          {isFiltered ? "Matching articles" : "All articles"}
        </h2>
        <p role="status" aria-live="polite" className="mt-2 text-sm text-text-muted">
          {published.length === 0
            ? "No articles are published yet."
            : `${results.length} of ${published.length} shown.`}
        </p>

        {results.length > 0 ? (
          <ul className="mt-6 divide-y divide-border border-t border-border">
            {results.map((article) => (
              <JournalRow key={article.slug} article={article} />
            ))}
          </ul>
        ) : (
          <div className="mt-6 max-w-prose space-y-3 text-text-muted">
            <p>
              {published.length === 0
                ? "Articles appear here once they are written, reviewed, and given a publication date. Nothing is shown before then."
                : "No articles match these filters."}
            </p>
            {isFiltered ? (
              <p>
                <Link href="/blogs" className="text-accent underline underline-offset-4 hover:text-accent-strong">
                  Clear filters
                </Link>
              </p>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}
