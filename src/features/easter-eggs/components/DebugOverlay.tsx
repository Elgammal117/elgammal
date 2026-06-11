import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "../../../lib/utils";
import { logEvent } from "../../../lib/eventLog";

const stats = [
  { label: "name", value: "Mohamed" },
  { label: "experience", value: "3+ years" },
  { label: "caffeine_level", value: "95%" },
  { label: "bugs_fixed", value: "∞" },
] as const;

export default function DebugOverlay() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const tapBuffer = useRef<number[]>([]);

  useEffect(() => {
    const target = document.querySelector("#hero h1") as HTMLElement | null;
    if (!target) return;

    const onTap = (e: MouseEvent | TouchEvent) => {
      const now = performance.now();
      const tripleWindow = 600;
      tapBuffer.current.push(now);
      tapBuffer.current = tapBuffer.current.filter((t) => now - t < tripleWindow);
      if (tapBuffer.current.length < 3) return;
      tapBuffer.current.length = 0;

      e.preventDefault();
      setOpen(true);
      logEvent("EVT", "debug overlay opened");

      requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        if (prefersReducedMotion()) {
          gsap.set(el, { autoAlpha: 1 });
          return;
        }
        gsap.killTweensOf(el);
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: -6, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" },
        );
      });
    };

    target.addEventListener("mousedown", onTap);
    target.addEventListener("touchend", onTap);
    return () => {
      target.removeEventListener("mousedown", onTap);
      target.removeEventListener("touchend", onTap);
    };
  }, []);

  const close = () => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setOpen(false);
      return;
    }
    gsap.to(el, {
      autoAlpha: 0,
      y: -6,
      scale: 0.97,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setOpen(false),
    });
    logEvent("EVT", "debug overlay closed");
  };

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Debug overlay"
      className="fixed inset-0 z-[60] flex items-start justify-start p-8 invisible"
      onClick={close}
    >
      <div
        className="w-[min(300px,calc(100vw-2rem))]"
        onClick={(e) => e.stopPropagation()}
      >
      <div className="bg-ink text-paper font-mono text-[11px] tracking-[0.04em] rounded-md shadow-lg overflow-hidden border border-ink-muted/20">
        <div className="flex items-center justify-between px-3 py-2 border-b border-ink-muted/20 bg-ink/80">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-arc" />
            <span className="text-paper-elevated">debug_overlay.dart</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="text-ink-muted hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm"
            aria-label="Close debug overlay"
          >
            ×
          </button>
        </div>

        <div className="px-3 py-2.5 border-b border-ink-muted/20">
          <div className="text-arc text-[9px] uppercase mb-1">Developer Info</div>
          <div className="text-paper-elevated text-[10px] leading-relaxed">
            <span className="text-ink-muted">class</span>{" "}
            <span className="text-arc">Developer</span> {"{"}
          </div>
        </div>

        <div className="px-3 py-2">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2 leading-relaxed">
              <span className="text-ink-muted">{s.label}:</span>
              <span className="text-paper-elevated">{s.value}</span>
            </div>
          ))}
        </div>

        <div className="px-3 py-2 border-t border-ink-muted/20">
          <div className="text-paper-elevated text-[10px]">
            <span className="text-ink-muted">{"}"}</span>
          </div>
        </div>

        <div className="px-3 py-1.5 border-t border-ink-muted/20 text-[9px] text-ink-muted">
          Triple-tap name to toggle · tap anywhere to dismiss
        </div>
      </div>
      </div>
    </div>
  );
}
