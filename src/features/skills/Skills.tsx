import { useSectionReveal } from "../hooks/useSectionReveal";
import { cv } from "../../data/cv";
import { iconFor } from "../../lib/icons";

const spanFor = (category: string) => {
  switch (category) {
    case "Mobile":
      return "lg:col-span-7";
    case "State & Architecture":
      return "lg:col-span-5";
    case "Backend & APIs":
      return "lg:col-span-5";
    case "Languages":
      return "lg:col-span-7";
    case "Tools":
      return "lg:col-span-6";
    case "Core":
      return "lg:col-span-6";
    default:
      return "lg:col-span-6";
  }
};

const accentDot = (category: string) => category === "Mobile" || category === "Backend & APIs";

export default function Skills() {
  const ref = useSectionReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="skills"
      className="py-24 md:py-32 border-t hairline"
      aria-label="Skills"
    >
      <div className="container-page">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted mb-3">
              <span className="text-ink">§ 02</span>
              <span className="mx-2 text-ink-muted/60">/</span>
              Skills
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.05] tracking-[-0.02em]">
              The toolkit, in plain view.
            </h2>
          </div>
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-muted max-w-md">
            {cv.skillGroups.length} groups · {cv.skillGroups.reduce((n, g) => n + g.skills.length, 0)} tools
          </p>
        </div>

        <div
          data-reveal
          className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-ink/10 border hairline"
        >
          {cv.skillGroups.map((group) => {
            const Icon = iconFor(group.icon);
            const span = spanFor(group.category);
            const isLead = accentDot(group.category);
            return (
              <div
                key={group.category}
                className={`${span} bg-paper p-6 md:p-7 flex flex-col gap-4`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-ink">
                    {Icon ? <Icon size={16} strokeWidth={1.5} /> : null}
                    <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink">
                      {group.category}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted tabular-nums">
                    {String(group.skills.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {group.skills.map((s) => (
                    <li
                      key={s}
                      className="font-sans text-sm text-ink-dim flex items-center gap-2"
                    >
                      <span
                        className={`w-1 h-1 rounded-full shrink-0 ${isLead ? "bg-signal" : "bg-ink/30"}`}
                        aria-hidden
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
