import { cv } from "../../data/cv";
import { useCardReveal } from "./hooks/useCardReveal";

const classification = (id: string) => {
  if (id === "01" || id === "02" || id === "03") return "Client · Deployed";
  if (id === "04") return "Realtime";
  if (id === "05") return "API Integration";
  return "Content";
};

const versionFor = (id: string) => {
  if (id === "01" || id === "02" || id === "03") return "v1.0 · live";
  if (id === "04") return "v0.9 · beta";
  if (id === "05") return "v1.0";
  return "v0.8 · wip";
};

const span = (id: string) => {
  switch (id) {
    case "01":
      return "lg:col-span-7";
    case "02":
      return "lg:col-span-5";
    case "03":
      return "lg:col-span-5";
    case "04":
      return "lg:col-span-7";
    case "05":
      return "lg:col-span-6";
    case "06":
      return "lg:col-span-6";
    default:
      return "lg:col-span-6";
  }
};

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
            <article
              key={p.id}
              data-card-reveal
              className={`${span(p.id)} bg-paper p-6 md:p-8 flex flex-col gap-5 relative overflow-hidden group`}
            >
              <div
                aria-hidden
                className="absolute -right-4 -top-6 font-display font-semibold text-ink/[0.05] text-[10rem] leading-none select-none pointer-events-none"
              >
                {p.id}
              </div>

              <div className="relative flex items-center justify-between font-mono text-[10px] tracking-[0.12em] uppercase">
                <div className="flex items-center gap-2 text-ink-muted">
                  <span className="text-ink">CASE/{p.id}</span>
                  <span className="h-px w-4 bg-ink/30" />
                  <span className="text-ink-dim">{classification(p.id)}</span>
                </div>
                <span className="text-ink-muted">{versionFor(p.id)}</span>
              </div>

              <div className="relative flex flex-col gap-3">
                <h3 className="font-display text-2xl md:text-3xl text-ink leading-[1.1] tracking-[-0.02em]">
                  {p.title}
                </h3>
                <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-signal">
                  {p.stack}
                </div>
              </div>

              <p className="relative font-sans text-ink-dim text-sm md:text-base leading-relaxed max-w-prose">
                {p.description}
              </p>

              <div className="relative mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
                <div className="font-sans text-sm text-ink leading-snug max-w-md">
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted block mb-1">
                    Impact
                  </span>
                  {p.impact}
                </div>
                {p.link && !p.link.startsWith("[TBD") ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink hover:text-signal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
                  >
                    View →
                  </a>
                ) : (
                  <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-muted">
                    Link TBD
                  </span>
                )}
              </div>

              <div
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-0 bg-signal transition-[width] duration-500 group-hover:w-full"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
