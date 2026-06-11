import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "../../../lib/utils";
import { logEvent } from "../../../lib/eventLog";

const TARGET = "crash";

export default function CrashScreen() {
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
        logEvent("EVT", "crash screen triggered");

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
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.3, ease: "power2.out" },
          );
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const recover = () => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setArmed(false);
      return;
    }
    gsap.to(el, {
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setArmed(false),
    });
    logEvent("EVT", "application recovered");
  };

  if (!armed) return null;

  return (
    <div
      ref={ref}
      role="alertdialog"
      aria-label="Application error"
      className="fixed inset-0 z-[200] bg-[#1a1a2e] flex items-center justify-center p-6"
    >
      <div className="max-w-lg w-full font-mono text-sm">
        <div className="flex items-center gap-2 mb-6 text-[#e94560]">
          <span className="text-lg">══════════</span>
          <span className="text-xs uppercase tracking-widest">Exception Caught</span>
          <span className="text-lg">══════════</span>
        </div>

        <div className="space-y-3 mb-8">
          <div className="text-[#e94560] font-semibold">
            PortfolioException:
          </div>
          <div className="text-[#c4c4c4] pl-4">
            Visitor was too curious.
          </div>
        </div>

        <div className="text-[#535353] text-xs mb-6 leading-relaxed">
          <div>When: Building Portfolio → Hero</div>
          <div>Widget: CornerStatus</div>
          <div>Element: DebugOverlay</div>
        </div>

        <button
          type="button"
          onClick={recover}
          className="w-full py-3 px-4 bg-[#0f3460] hover:bg-[#16213e] text-[#e94560] font-mono text-sm tracking-wider uppercase rounded border border-[#e94560]/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e94560] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a2e]"
        >
          Recover Application
        </button>

        <div className="mt-4 text-center text-[#535353] text-[10px]">
          Type "crash" to trigger · "Recover" to dismiss
        </div>
      </div>
    </div>
  );
}
