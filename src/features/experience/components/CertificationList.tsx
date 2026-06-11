import type { CertificationListProps } from "../types";

export default function CertificationList({ certifications }: CertificationListProps) {
  if (certifications.length === 0) return null;

  return (
    <div data-reveal className="mt-16 pt-12 border-t hairline">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted">
          Certifications
        </span>
        <span className="h-px flex-1 bg-ink/10" aria-hidden />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((c) => (
          <li
            key={c}
            className="font-sans text-sm text-ink-dim flex items-baseline gap-3"
          >
            <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted shrink-0">
              CRT
            </span>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
