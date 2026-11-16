// Articles from around the web that the owner has read and kept, each with a
// note on why it matters. Add an entry here; the page updates on its own.
// Every url must be https. Dates are YYYY-MM-DD, the day the article was saved.
export type Bookmark = {
  id: string;
  title: string;
  url: string;
  source: string;
  note: string;
  tags: string[];
  savedOn: string;
};

export const bookmarks: Bookmark[] = [
  {
    id: "sample-token-bucket-article",
    title: "SAMPLE: A dummy bookmark about rate limiting",
    url: "https://example.com/sample-rate-limiting",
    source: "Sample source",
    note: "Dummy note so you can see how a bookmark looks. It explains why the article is worth keeping.",
    tags: ["sample", "backend"],
    savedOn: "2000-02-01",
  },
  {
    id: "sample-react-article",
    title: "SAMPLE: A dummy bookmark about React components",
    url: "https://example.com/sample-react-components",
    source: "Sample source",
    note: "Second dummy bookmark, shown only on the local development server.",
    tags: ["sample", "frontend"],
    savedOn: "2000-02-10",
  },
];
