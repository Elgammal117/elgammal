import { useMessageCycler } from "../hooks/useMessageCycler";

export default function RotatingMessage() {
  const { current, index, total } = useMessageCycler();
  return (
    <div
      data-hero-reveal
      className="flex items-center gap-3 text-[11px] font-mono tracking-[0.1em] uppercase text-ink-dim"
    >
      <span className="text-ink-muted">
        {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </span>
      <span className="h-px w-8 bg-ink-muted/40" />
      <span className="text-ink" key={current}>
        {current}
      </span>
    </div>
  );
}
