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
  image,
}: ProjectCardProps) {
  return (
    <article
      data-card-reveal
      className={`${span} bg-paper p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden group`}
    >
      {/* Background Number */}
      <div
        aria-hidden
        className="absolute -right-4 -top-6 font-display font-semibold text-ink/[0.05] text-[10rem] leading-none select-none pointer-events-none"
      >
        {id}
      </div>

      {/* Project Image (Only if image exists) */}
      {image && (
        <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-paper-elevated aspect-[16/9]">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      {/* Header */}
      <div className="relative flex items-center justify-between font-mono text-[10px] tracking-[0.12em] uppercase">
        <div className="flex items-center gap-2 text-ink-muted">
          <span className="text-ink">CASE/{id}</span>
          <span className="h-px w-4 bg-ink/30" />
          <span>{classification}</span>
        </div>

        <span className="text-ink-muted">{version}</span>
      </div>

      {/* Title & Stack */}
      <div className="space-y-3">
        <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight tracking-[-0.02em]">
          {title}
        </h3>

        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-signal">
          {stack}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm md:text-base leading-relaxed text-ink-dim">
        {description}
      </p>

      {/* Footer */}
      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-4">
        <div className="max-w-md">
          <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted mb-2">
            Impact
          </span>

          <p className="text-sm text-ink leading-relaxed">{impact}</p>
        </div>

        {link && !link.startsWith("[TBD") ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink transition-all duration-300 hover:border-signal hover:text-signal hover:bg-signal/5"
          >
            View Project
            <span>↗</span>
          </a>
        ) : (
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
            Coming Soon
          </span>
        )}
      </div>

      {/* Hover Line */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-signal transition-all duration-500 group-hover:w-full"
      />
    </article>
  );
}