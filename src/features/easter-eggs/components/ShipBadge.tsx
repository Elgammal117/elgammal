import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "../../../lib/utils";
import { logEvent } from "../../../lib/eventLog";

const TARGET = "ship";

export default function ShipBadge() {
  const [armed, setArmed] = useState(false);
  const buf = useRef("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (e.key === "Backspace") {
        buf.current = buf.current.slice(0, -1);
        return;
      }
      if (e.key.length !== 1) return;
      buf.current = (buf.current + e.key.toLowerCase()).slice(-TARGET.length);
      if (buf.current === TARGET) {
        buf.current = "";
        setArmed(true);
        logEvent("EVT", "shipped");
        requestAnimationFrame(() => {
          const el = ref.current;
          if (!el) return;
          if (prefersReducedMotion()) {
            gsap.set(el, { autoAlpha: 1 });
            setTimeout(() => setArmed(false), 1600);
            return;
          }
          gsap.killTweensOf(el);
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: -6, scale: 0.98 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.35,
              ease: "power3.out",
              onComplete: () => {
                gsap.to(el, {
                  autoAlpha: 0,
                  y: -6,
                  duration: 0.4,
                  delay: 1.2,
                  ease: "power2.in",
                  onComplete: () => setArmed(false),
                });
              },
            },
          );
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className="fixed top-10 left-1/2 -translate-x-1/2 z-[70] invisible pointer-events-none"
      data-armed={armed || undefined}
    >
      <div className="bg-ink text-paper font-mono text-[11px] tracking-[0.18em] uppercase px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-arc" />
        <span>Shipped</span>
        <span className="text-ink-muted">·</span>
        <span className="text-paper-elevated">build {new Date().getFullYear()}.{new Date().getMonth() + 1}</span>
      </div>
    </div>
  );
}
