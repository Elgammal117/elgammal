import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "../../../lib/utils";
import { logEvent } from "../../../lib/eventLog";

const TARGET = "hotreload";

export default function HotReloadBadge() {
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
        logEvent("EVT", "hot reload triggered");
        requestAnimationFrame(() => {
          const el = ref.current;
          if (!el) return;
          if (prefersReducedMotion()) {
            gsap.set(el, { autoAlpha: 1 });
            setTimeout(() => setArmed(false), 2000);
            return;
          }
          gsap.killTweensOf(el);
          const flash = el.querySelector("[data-flash]") as HTMLElement | null;
          const icon = el.querySelector("[data-icon]") as HTMLElement | null;

          const tl = gsap.timeline({
            onComplete: () => setArmed(false),
          });

          tl.fromTo(
            el,
            { autoAlpha: 0, y: -8, scale: 0.96 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" },
          );

          if (flash) {
            tl.fromTo(
              flash,
              { opacity: 0.6 },
              { opacity: 0, duration: 0.8, ease: "power2.out" },
              0,
            );
          }

          if (icon) {
            tl.fromTo(
              icon,
              { rotation: -20, scale: 0.8 },
              { rotation: 0, scale: 1, duration: 0.5, ease: "back.out(2)" },
              0.1,
            );
          }

          tl.to(
            el,
            { autoAlpha: 0, y: -8, duration: 0.4, delay: 1.6, ease: "power2.in" },
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
      <div className="relative overflow-hidden bg-ink text-paper font-mono text-[11px] tracking-[0.18em] uppercase px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
        <div
          data-flash
          className="absolute inset-0 bg-signal/30 pointer-events-none"
          aria-hidden
        />
        <span data-icon className="inline-block">
          ⚡
        </span>
        <span>Hot reload</span>
        <span className="text-ink-muted">·</span>
        <span className="text-paper-elevated">~60ms</span>
      </div>
    </div>
  );
}
