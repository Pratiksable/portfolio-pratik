import Link from "next/link";
import { formatArticleDate, journalCategories, type Article } from "@/lib/journal";

// One index entry. Title and summary lead; metadata follows below them.
export function JournalRow({ article }: { article: Article }) {
  const { meta } = article;
  const parts = [
    journalCategories[meta.category],
    `${article.readingMinutes} min read`,
    meta.publishedAt ? `Published ${formatArticleDate(meta.publishedAt)}` : null,
    meta.updatedAt ? `updated ${formatArticleDate(meta.updatedAt)}` : null,
  ].filter((part): part is string => part !== null);

  return (
    <li className="py-8">
      <Link href={`/blogs/${article.slug}`} className="group block">
        <h3 className="font-display text-2xl font-semibold tracking-tight group-hover:underline">
          {meta.title}
        </h3>
        <p className="mt-2 max-w-prose text-text-muted">{meta.summary}</p>
        <p className="mt-3 text-sm text-text-muted">{parts.join(". ")}.</p>
      </Link>
    </li>
  );
}
