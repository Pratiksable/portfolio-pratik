import { formatArticleDate, journalCategories, type ArticleMeta } from "@/lib/journal";

// Publication and update metadata. Dates appear only when they exist in the
// article's front matter; nothing is filled in automatically.
export function ArticleMetaList({
  meta,
  readingMinutes,
}: {
  meta: ArticleMeta;
  readingMinutes: number;
}) {
  return (
    <dl className="mt-10 grid gap-6 text-sm sm:grid-cols-2 md:grid-cols-4">
      <div>
        <dt className="text-text-muted">Category</dt>
        <dd className="mt-1">{journalCategories[meta.category]}</dd>
      </div>
      <div>
        <dt className="text-text-muted">Reading time</dt>
        <dd className="mt-1">{readingMinutes} min</dd>
      </div>
      {meta.publishedAt ? (
        <div>
          <dt className="text-text-muted">Published</dt>
          <dd className="mt-1">
            <time dateTime={meta.publishedAt}>{formatArticleDate(meta.publishedAt)}</time>
          </dd>
        </div>
      ) : null}
      {meta.updatedAt ? (
        <div>
          <dt className="text-text-muted">Updated</dt>
          <dd className="mt-1">
            <time dateTime={meta.updatedAt}>{formatArticleDate(meta.updatedAt)}</time>
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
