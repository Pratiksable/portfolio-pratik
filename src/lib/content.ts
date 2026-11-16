// Only published entries reach the UI. Drafts stay in the repository.
export function publishedOnly<T extends { status: "draft" | "published" }>(
  items: readonly T[],
): T[] {
  return items.filter((item) => item.status === "published");
}
