import { bookmarks as all, type Bookmark } from "@/content/bookmarks";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Build-time validation. A malformed bookmark fails the build instead of
// shipping a broken or non-https link.
export function validateBookmarks(entries: readonly Bookmark[]): void {
  const ids = new Set<string>();
  for (const entry of entries) {
    const where = `Bookmark "${entry.id || "(no id)"}"`;
    if (!idPattern.test(entry.id)) throw new Error(`${where}: id must be lowercase kebab-case.`);
    if (ids.has(entry.id)) throw new Error(`${where}: duplicate id.`);
    ids.add(entry.id);
    if (!entry.title.trim()) throw new Error(`${where}: a title is required.`);
    if (!entry.source.trim()) throw new Error(`${where}: a source is required.`);
    if (!entry.url.startsWith("https://")) throw new Error(`${where}: url must start with https://.`);
    if (!datePattern.test(entry.savedOn)) throw new Error(`${where}: savedOn must be YYYY-MM-DD.`);
  }
}

export function getBookmarks(): Bookmark[] {
  validateBookmarks(all);
  const visible = all.filter((entry) => process.env.NODE_ENV !== "production" || !entry.id.startsWith("sample-"));
  return [...visible].sort((a, b) => b.savedOn.localeCompare(a.savedOn));
}

export function formatSavedDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}
