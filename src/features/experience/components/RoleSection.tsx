import { range } from "../../../lib/dates";
import type { RoleSectionProps } from "../types";

export default function RoleSection({ role }: RoleSectionProps) {
  return (
    <div data-reveal className="mb-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="relative inline-flex w-2 h-2 rounded-full bg-arc">
          <span className="absolute inset-0 rounded-full bg-arc animate-ping opacity-50" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink tabular-nums">
          {range(role.startDate, "present")}
        </span>
        <span className="h-px flex-1 bg-ink/10" aria-hidden />
        <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted">
          {role.location}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted">
              {role.id}
            </span>
            <span className="h-px w-6 bg-ink/30" />
            <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink">
              Active
            </span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight mb-2">
            {role.title}
          </h3>
          <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-dim">
            {role.company}
          </div>
        </div>

        <div className="md:col-span-8">
          <ul className="flex flex-col gap-4">
            {role.highlights.map((h, i) => (
              <li
                key={i}
                className="font-sans text-sm md:text-base text-ink-dim leading-relaxed pl-6 relative"
              >
                <span
                  className="absolute left-0 top-[0.6em] font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted tabular-nums"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
