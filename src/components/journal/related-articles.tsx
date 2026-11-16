import Link from "next/link";
import { formatArticleDate, journalCategories, type Article } from "@/lib/journal";

// Next reading after an article. Rendered only when there is a related
// article, so the page never shows an empty region.
export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-articles-title" className="border-t border-border py-14">
      <h2 id="related-articles-title" className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
        Related articles
      </h2>
      <ul className="mt-6 divide-y divide-border border-y border-border">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/blogs/${article.slug}`} className="group block py-5">
              <p className="font-display text-xl font-semibold tracking-tight group-hover:underline">
                {article.meta.title}
              </p>
              <p className="mt-1 text-sm text-text-muted">
                {journalCategories[article.meta.category]}
                {article.meta.publishedAt ? `. Published ${formatArticleDate(article.meta.publishedAt)}` : ""}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
