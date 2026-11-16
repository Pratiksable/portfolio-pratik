import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { ArticleMetaList } from "@/components/journal/article-meta";
import { ReadingProgress } from "@/components/journal/reading-progress";
import { RelatedArticles } from "@/components/journal/related-articles";
import { TableOfContents } from "@/components/journal/table-of-contents";
import { getPublishedArticle, getPublishedArticles, getRelatedArticles } from "@/lib/journal";

// Only published articles are prerendered. Cache Components rejects an empty
// generateStaticParams, so the export is omitted while nothing is published.
const publishedForStaticParams = getPublishedArticles();

export const generateStaticParams =
  publishedForStaticParams.length > 0
    ? () => publishedForStaticParams.map((article) => ({ slug: article.slug }))
    : undefined;

// While nothing is published the route is blocking, so an unknown slug gets
// a real 404 status rather than a streamed shell.
export const instant = false;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedArticle(slug);
  if (!article) {
    return { title: "Article not found", robots: { index: false, follow: false } };
  }
  return {
    title: article.meta.title,
    description: article.meta.summary,
  };
}

export default async function JournalArticle({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getPublishedArticle(slug);
  if (!article) {
    notFound();
  }

  // The slug has already been checked against the published list, so the
  // import path cannot leave the journal folder.
  const { default: Body } = (await import(`@/content/blogs/${article.slug}.mdx`)) as {
    default: ComponentType;
  };

  const related = getRelatedArticles(article, getPublishedArticles());

  return (
    <>
      <ReadingProgress />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <article className="w-full px-6 md:px-12 xl:px-16 pb-24 pt-16 md:pt-24">
          <nav aria-label="Breadcrumb" className="text-sm text-text-muted">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/blogs" className="underline underline-offset-4 hover:text-text">
                  Blogs
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-text">
                {article.meta.title}
              </li>
            </ol>
          </nav>

          <header className="mt-10">
            <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              {article.meta.title}
            </h1>
            <p className="mt-6 text-lg text-text-muted md:text-xl">{article.meta.summary}</p>
            <ArticleMetaList meta={article.meta} readingMinutes={article.readingMinutes} />
          </header>

          <div className="mt-14 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <TableOfContents headings={article.headings} />
            </aside>
            <div className="journal-body min-w-0 max-w-[70ch]">
              <Body />
            </div>
          </div>

          <RelatedArticles articles={related} />
        </article>
      </main>
    </>
  );
}
