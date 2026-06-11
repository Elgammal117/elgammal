import { useSectionReveal } from "../../hooks/useSectionReveal";
import { cv } from "../../../data/cv";
import { spanFor, accentDot } from "../constants/layout";
import SkillGroupCard from "./SkillGroupCard";

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
          {cv.skillGroups.map((group) => (
            <SkillGroupCard
              key={group.category}
              category={group.category}
              icon={group.icon}
              skills={group.skills}
              span={spanFor(group.category)}
              isAccent={accentDot(group.category)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
