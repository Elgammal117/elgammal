import type { ProjectCardProps } from "../types";

export default function ProjectCard({
  id,
  title,
  stack,
  description,
  impact,
  link,
  span,
  classification,
  version,
}: ProjectCardProps) {
  return (
    <article
      data-card-reveal
      className={`${span} bg-paper p-6 md:p-8 flex flex-col gap-5 relative overflow-hidden group`}
    >
      <div
        aria-hidden
        className="absolute -right-4 -top-6 font-display font-semibold text-ink/[0.05] text-[10rem] leading-none select-none pointer-events-none"
      >
        {id}
      </div>

      <div className="relative flex items-center justify-between font-mono text-[10px] tracking-[0.12em] uppercase">
        <div className="flex items-center gap-2 text-ink-muted">
          <span className="text-ink">CASE/{id}</span>
          <span className="h-px w-4 bg-ink/30" />
          <span className="text-ink-dim">{classification}</span>
        </div>
        <span className="text-ink-muted">{version}</span>
      </div>

      <div className="relative flex flex-col gap-3">
        <h3 className="font-display text-2xl md:text-3xl text-ink leading-[1.1] tracking-[-0.02em]">
          {title}
        </h3>
        <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-signal">
          {stack}
        </div>
      </div>

      <p className="relative font-sans text-ink-dim text-sm md:text-base leading-relaxed max-w-prose">
        {description}
      </p>

      <div className="relative mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
        <div className="font-sans text-sm text-ink leading-snug max-w-md">
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted block mb-1">
            Impact
          </span>
          {impact}
        </div>
        {link && !link.startsWith("[TBD") ? (
          <a
            href={link}
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
  );
}
