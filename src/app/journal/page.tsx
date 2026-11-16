import type { Metadata } from "next";
import { formatSavedDate, getBookmarks } from "@/lib/bookmarks";

export const metadata: Metadata = {
  title: "Journal",
  description: "Articles from around the web that are worth keeping, each with a note on why.",
};

// The bookmark shelf. Each entry links to the original article and carries
// the owner's note on why it matters. Nothing here is written by the owner.
export default function JournalPage() {
  const items = getBookmarks();

  return (
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      <header className="w-full px-6 pb-10 pt-20 md:px-12 md:pt-28 xl:px-16">
        <h1 className="font-display text-[clamp(2.75rem,8vw,5rem)] font-semibold leading-none tracking-[-0.03em]">
          Journal
        </h1>
        <p className="mt-6 max-w-prose text-lg text-text-muted">
          Articles from around the web that I read and kept. Each one links to the original, with a
          note on why it matters.
        </p>
      </header>

      <section aria-labelledby="bookmarks-title" className="w-full px-6 pb-24 md:px-12 xl:px-16">
        <h2 id="bookmarks-title" className="sr-only">
          Saved articles
        </h2>
        {items.length === 0 ? (
          <p className="max-w-prose text-text-muted">No articles saved yet.</p>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {items.map((item) => (
              <li key={item.id} className="grid gap-4 py-10 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-3">
                  <p className="text-sm text-text-muted">{item.source}</p>
                  <p className="mt-1 text-sm text-text-muted">Saved {formatSavedDate(item.savedOn)}</p>
                </div>
                <div className="md:col-span-9">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-2 font-display text-2xl font-semibold tracking-tight md:text-3xl"
                  >
                    <span className="group-hover:underline">{item.title}</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <p className="mt-4 max-w-prose text-lg text-text-muted">{item.note}</p>
                  {item.tags.length > 0 ? (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li key={tag} className="rounded-md border border-border px-2.5 py-1 text-sm text-text-muted">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
