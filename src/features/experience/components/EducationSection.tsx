import { yearRange } from "../../../lib/dates";
import type { EducationSectionProps } from "../types";

export default function EducationSection({ educations, location }: EducationSectionProps) {
  return (
    <div data-reveal>
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted">
          Education
        </span>
        <span className="h-px flex-1 bg-ink/10" aria-hidden />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-4">
          {educations.map((ed, i) => (
            <div key={`edu-${i}`} className={i > 0 ? "mt-8" : ""}>
              <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink tabular-nums mb-1">
                {yearRange(ed.startYear, ed.endYear)}
              </div>
              <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted">
                {location}
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-8">
          {educations.map((ed, i) => (
            <div key={`edu-${i}`} className={i > 0 ? "mt-8" : ""}>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted">
                  EDU/{String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-6 bg-ink/30" />
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-dim">
                  Degree
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl text-ink leading-tight mb-1">
                {ed.degree} {ed.field}
              </h3>
              <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-dim">
                {ed.institution}
              </div>
              {ed.gpa && (
                <div className="font-mono text-xs text-ink-dim tabular-nums mt-2">
                  GPA · <span className="text-ink">{ed.gpa}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
