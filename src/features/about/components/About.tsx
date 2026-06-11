import { useSectionReveal } from "../../hooks/useSectionReveal";
import { cv } from "../../../data/cv";
import ExpertiseCard from "./ExpertiseCard";

export default function About() {
  const ref = useSectionReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="about"
      className="py-24 md:py-32 border-t hairline"
      aria-label="About"
    >
      <div className="container-page grid grid-cols-12 gap-6">
        <div data-reveal className="col-span-12 lg:col-span-4">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted mb-3">
            <span className="text-ink">§ 01</span>
            <span className="mx-2 text-ink-muted/60">/</span>
            About
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.05] tracking-[-0.02em]">
            Engineer-grade craft, not designer-grade expression.
          </h2>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6 flex flex-col gap-5">
          {cv.bio.map((p, i) => (
            <p
              key={i}
              data-reveal
              className="font-sans text-ink-dim text-base md:text-lg leading-relaxed"
            >
              {p}
            </p>
          ))}

          <div
            data-reveal
            className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/10 mt-6 border hairline"
          >
            {cv.expertise.map((e) => (
              <ExpertiseCard
                key={e.label}
                label={e.label}
                description={e.description}
                icon={e.icon}
              />
            ))}
          </div>

          <div
            data-reveal
            className="flex flex-wrap items-center gap-3 mt-2 text-[11px] font-mono tracking-[0.1em] uppercase text-ink-muted"
          >
            <span>Available for</span>
            <span className="text-ink">Full-time</span>
            <span>·</span>
            <span className="text-ink">Contract</span>
            <span>·</span>
            <span className="text-ink">Freelance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
