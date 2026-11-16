// A left-to-right flow of steps: a pipeline, request path, or state sequence.
// Built from HTML rather than SVG so the labels stay real text, wrap on
// phones, and read correctly with a screen reader.
export function FlowDiagram({
  title,
  description,
  steps,
}: {
  title: string;
  description: string;
  steps: string[];
}) {
  if (steps.length < 2 || steps.length > 6) {
    throw new Error(`FlowDiagram "${title}" needs between 2 and 6 steps.`);
  }

  return (
    <figure className="my-10">
      <ol className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-10">
        {steps.map((step, index) => (
          <li
            key={`${index}-${step}`}
            className={`relative flex-1 rounded-md border border-border bg-surface-raised p-4 text-sm font-medium ${
              index < steps.length - 1
                ? "after:absolute after:left-1/2 after:top-full after:h-8 after:w-px after:-translate-x-1/2 after:bg-border after:content-[''] md:after:left-full md:after:top-1/2 md:after:h-px md:after:w-10 md:after:translate-x-0 md:after:-translate-y-1/2"
                : ""
            }`}
          >
            <span className="sr-only">Step {index + 1}: </span>
            {step}
          </li>
        ))}
      </ol>
      <figcaption className="mt-6 max-w-prose text-sm text-text-muted">
        <span className="font-medium text-text">{title}.</span> {description}
      </figcaption>
    </figure>
  );
}
