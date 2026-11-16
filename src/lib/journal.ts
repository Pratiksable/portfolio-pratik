import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";

// Journal articles are MDX files in src/content/journal. Adding an article
// means adding a file there; no UI code changes. Files whose names start with
// "_" are documentation and are never published.

export const journalCategories = {
  architecture: "Architecture",
  frontend: "Frontend",
  backend: "Backend",
  data: "Data",
  tooling: "Tooling",
} as const;

export type JournalCategory = keyof typeof journalCategories;
export type ArticleStatus = "draft" | "published";

export type ArticleMeta = {
  title: string;
  summary: string;
  category: JournalCategory;
  status: ArticleStatus;
  tags: string[];
  publishedAt: string | null;
  updatedAt: string | null;
  // Sample content is for layout testing only. It may never be published.
  sample: boolean;
  related: string[];
};

export type Heading = { id: string; text: string; level: 2 | 3 };

export type Article = {
  slug: string;
  meta: ArticleMeta;
  readingMinutes: number;
  headings: Heading[];
};

const contentDir = path.join(process.cwd(), "src", "content", "blogs");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

// gray-matter turns unquoted YAML dates into Date objects. Normalise them to
// YYYY-MM-DD strings so they behave the same whether quoted or not.
function asDateString(value: unknown): string | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return typeof value === "string" ? value.trim() : null;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function headingText(raw: string): string {
  return raw.replace(/[`*_]/g, "").trim();
}

// Headings are read from the markdown source, outside code fences. Ids come
// from github-slugger, the same algorithm rehype-slug uses, so table of
// contents links always match the rendered heading ids.
function extractHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of body.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      continue;
    }
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) {
      continue;
    }
    const text = headingText(match[2] ?? "");
    headings.push({
      id: slugger.slug(text),
      text,
      level: (match[1]?.length ?? 2) as 2 | 3,
    });
  }
  return headings;
}

function readingMinutesOf(body: string): number {
  const words = body
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  return Math.max(1, Math.round(words / 220));
}

function fail(slug: string, message: string): never {
  throw new Error(`Journal article "${slug}": ${message}`);
}

function validateMeta(slug: string, meta: ArticleMeta): void {
  if (!slugPattern.test(slug)) {
    fail(slug, "the file name must be lowercase kebab-case.");
  }
  if (!meta.title) {
    fail(slug, "a title is required.");
  }
  if (!meta.summary) {
    fail(slug, "a summary is required.");
  }
  if (!(meta.category in journalCategories)) {
    fail(slug, `category must be one of: ${Object.keys(journalCategories).join(", ")}.`);
  }
  if (meta.status !== "draft" && meta.status !== "published") {
    fail(slug, 'status must be "draft" or "published".');
  }
  if (meta.publishedAt && !datePattern.test(meta.publishedAt)) {
    fail(slug, "publishedAt must be a date in YYYY-MM-DD form.");
  }
  if (meta.updatedAt && !datePattern.test(meta.updatedAt)) {
    fail(slug, "updatedAt must be a date in YYYY-MM-DD form.");
  }
  if (meta.status === "published") {
    if (!meta.publishedAt) {
      fail(slug, "a published article needs a publishedAt date. Do not invent one.");
    }
    if (meta.sample && process.env.NODE_ENV === "production") {
      fail(slug, "sample content cannot be published.");
    }
    if (meta.updatedAt && meta.updatedAt < (meta.publishedAt ?? "")) {
      fail(slug, "updatedAt cannot be earlier than publishedAt.");
    }
  }
}

function readArticle(slug: string): Article {
  const source = fs.readFileSync(path.join(contentDir, `${slug}.mdx`), "utf8");
  const parsed = matter(source);
  const data = parsed.data as Record<string, unknown>;

  const meta: ArticleMeta = {
    title: typeof data.title === "string" ? data.title.trim() : "",
    summary: typeof data.summary === "string" ? data.summary.trim() : "",
    category: (typeof data.category === "string" ? data.category : "") as JournalCategory,
    status: (typeof data.status === "string" ? data.status : "draft") as ArticleStatus,
    tags: asStringArray(data.tags),
    publishedAt: asDateString(data.publishedAt),
    updatedAt: asDateString(data.updatedAt),
    sample: data.sample === true,
    related: asStringArray(data.related),
  };

  validateMeta(slug, meta);

  return {
    slug,
    meta,
    readingMinutes: readingMinutesOf(parsed.content),
    headings: extractHeadings(parsed.content),
  };
}

export function listArticleSlugs(): string[] {
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .filter((file) => process.env.NODE_ENV !== "production" || !file.startsWith("sample-"))
    .map((file) => file.slice(0, -".mdx".length))
    .sort();
}

// Reads and validates every article, then checks that each related link
// points at a real article. A problem anywhere fails the build.
export function getAllArticles(): Article[] {
  const articles = listArticleSlugs().map(readArticle);
  const slugs = new Set(articles.map((article) => article.slug));

  for (const article of articles) {
    for (const related of article.meta.related) {
      if (!slugs.has(related)) {
        fail(article.slug, `links to unknown article "${related}".`);
      }
    }
  }
  return articles;
}

// Newest first. Articles without a date never appear as published.
export function getPublishedArticles(): Article[] {
  return getAllArticles()
    .filter((article) => article.meta.status === "published")
    .sort((a, b) => (b.meta.publishedAt ?? "").localeCompare(a.meta.publishedAt ?? ""));
}

export function getPublishedArticle(slug: string): Article | undefined {
  if (!slugPattern.test(slug)) {
    return undefined;
  }
  return getPublishedArticles().find((article) => article.slug === slug);
}

export type ArticleFilters = { q?: string; category?: JournalCategory };

// Every search term must match (AND), so adding a word narrows the results.
export function filterArticles(articles: readonly Article[], filters: ArticleFilters): Article[] {
  const terms = (filters.q ?? "")
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 0);

  return articles.filter((article) => {
    if (filters.category && article.meta.category !== filters.category) {
      return false;
    }
    const haystack = [
      article.meta.title,
      article.meta.summary,
      article.meta.tags.join(" "),
      journalCategories[article.meta.category],
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

// Explicit links first, then the same category, then shared tags. Capped at
// three so the list stays short.
export function getRelatedArticles(current: Article, published: readonly Article[]): Article[] {
  const others = published.filter((article) => article.slug !== current.slug);
  const explicit = current.meta.related
    .map((slug) => others.find((article) => article.slug === slug))
    .filter((article): article is Article => article !== undefined);
  const sameCategory = others.filter((article) => article.meta.category === current.meta.category);
  const sharedTags = others.filter((article) =>
    article.meta.tags.some((tag) => current.meta.tags.includes(tag)),
  );

  const seen = new Set<string>();
  const result: Article[] = [];
  for (const article of [...explicit, ...sameCategory, ...sharedTags]) {
    if (!seen.has(article.slug)) {
      seen.add(article.slug);
      result.push(article);
    }
  }
  return result.slice(0, 3);
}

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
