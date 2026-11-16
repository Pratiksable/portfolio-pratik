// Stands in for any case study section that has no content. It says why the
// section is empty: either the owner has not approved it yet, or the project's
// disclosure tier withholds it. It never hides the gap or invents text.
export function MissingNote({ label, withheld = false }: { label: string; withheld?: boolean }) {
  return (
    <p className="rounded-md border border-dashed border-text-muted p-4 text-sm text-text-muted">
      {withheld ? `Withheld at this disclosure level: ${label}.` : `Not yet approved: ${label}.`}
    </p>
  );
}
