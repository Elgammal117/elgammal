import { cv } from "../../../data/cv";
import { useCardReveal } from "../hooks/useCardReveal";
import { spanFor, classification, versionFor } from "../constants/layout";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const ref = useCardReveal<HTMLDivElement>();

  return (
    <section
      id="projects"
      className="py-24 md:py-32 border-t hairline"
      aria-label="Projects"
    >
      <div className="container-page">
        <div data-card-reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted mb-3">
              <span className="text-ink">§ 04</span>
              <span className="mx-2 text-ink-muted/60">/</span>
              Projects
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.05] tracking-[-0.02em]">
              The proof. Six case files.
            </h2>
          </div>
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-muted max-w-md">
            {cv.projects.length} projects · {cv.projects.filter((p) => p.id && p.id <= "03").length} shipped for clients
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-ink/10 border hairline"
        >
          {cv.projects.map((p) => (
            <ProjectCard
              key={p.id}
              {...p}
              span={spanFor(p.id)}
              classification={classification(p.id)}
              version={versionFor(p.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
