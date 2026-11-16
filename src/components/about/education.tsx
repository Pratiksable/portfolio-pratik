import { education } from "@/content/education";

// Education and recognition, shown as the owner has supplied them. The layout
// spans the full width: identity on the left, details on the right.
export function Education() {
  return (
    <section aria-labelledby="education-title" className="w-full border-t border-border px-6 py-24 md:px-12 md:py-32 xl:px-16">
      <h2 id="education-title" className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
        Education and recognition
      </h2>

      <div className="mt-16 space-y-20">
        {education.map((entry) => (
          <div key={entry.id} className="grid w-full gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <p className="text-sm text-text-muted">{entry.period}</p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {entry.institution}
              </h3>
              <p className="mt-4 text-xl">{entry.degree}</p>
              {entry.grade ? <p className="mt-2 text-text-muted">Grade: {entry.grade}</p> : null}
            </div>

            <div className="space-y-10 md:col-span-7">
              <p className="text-lg leading-relaxed text-text-muted">{entry.summary}</p>
              {entry.recognition.length > 0 ? (
              <div>
                <h4 className="text-sm font-medium uppercase tracking-wide text-text-muted">Recognition</h4>
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {entry.recognition.map((item) => (
                    <li key={item} className="py-5 text-lg">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
