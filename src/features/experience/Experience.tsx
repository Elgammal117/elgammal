import { useSectionReveal } from "../hooks/useSectionReveal";
import { cv } from "../../data/cv";
import { range, yearRange } from "../../lib/dates";

export default function Experience() {
  const ref = useSectionReveal();
  const role = cv.experience[0];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="experience"
      className="py-24 md:py-32 border-t hairline"
      aria-label="Experience"
    >
      <div className="container-page">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted mb-3">
              <span className="text-ink">§ 03</span>
              <span className="mx-2 text-ink-muted/60">/</span>
              Experience
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.05] tracking-[-0.02em]">
              The work, where it counts.
            </h2>
          </div>
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-muted max-w-md">
            {cv.experience.length} role · {cv.experience.reduce((n, r) => n + r.highlights.length, 0)} operational notes
          </p>
        </div>

        <ol data-reveal className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          <div
            className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-ink/15"
            aria-hidden
          />

          {role && (
            <li className="md:col-span-12 relative">
              <div className="md:grid md:grid-cols-2 md:gap-10">
                <div className="md:text-right md:pr-10 flex flex-col gap-2 mb-4 md:mb-0">
                  <div className="flex md:justify-end items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-ink-muted">
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-arc">
                      <span className="absolute inset-0 rounded-full bg-arc animate-ping opacity-50" />
                    </span>
                    <span className="text-ink tabular-nums">{range(role.startDate, "present")}</span>
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted">
                    {role.location}
                  </div>
                </div>

                <div className="md:pl-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted">
                      {role.id}
                    </span>
                    <span className="h-px w-6 bg-ink/30" />
                    <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink">
                      Active
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                    {role.title}
                  </h3>
                  <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-dim">
                    {role.company}
                  </div>
                  <ul className="mt-2 flex flex-col gap-3">
                    {role.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="font-sans text-sm md:text-base text-ink-dim leading-relaxed flex items-baseline gap-3"
                      >
                        <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted tabular-nums shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px flex-1 bg-ink/10 mt-2.5" aria-hidden />
                        <span className="flex-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          )}

          {cv.education.map((ed, i) => (
            <li key={`edu-${i}`} className="md:col-span-12 relative">
              <div className="md:grid md:grid-cols-2 md:gap-10">
                <div className="md:text-right md:pr-10 flex flex-col gap-2 mb-4 md:mb-0">
                  <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink tabular-nums">
                    {yearRange(ed.startYear, ed.endYear)}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted">
                    {cv.person.location}
                  </div>
                </div>
                <div className="md:pl-10 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted">
                      EDU/{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 bg-ink/30" />
                    <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-dim">
                      Degree
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-ink leading-tight">
                    {ed.degree} {ed.field}
                  </h3>
                  <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-dim">
                    {ed.institution}
                  </div>
                  {ed.gpa && (
                    <div className="font-mono text-xs text-ink-dim tabular-nums">
                      GPA · <span className="text-ink">{ed.gpa}</span>
                    </div>
                  )}
                  {cv.certifications.length > 0 && (
                    <ul className="mt-1 flex flex-col gap-1.5">
                      {cv.certifications.map((c) => (
                        <li
                          key={c}
                          className="font-sans text-sm text-ink-dim flex items-baseline gap-2"
                        >
                          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted shrink-0">
                            CRT
                          </span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
