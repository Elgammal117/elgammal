import { useRef, useState } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "../lib/utils";
import { logEvent } from "../lib/eventLog";

const versions = [
  {
    v: "v1.0",
    label: "Initial release",
    notes: ["Hero, About, Skills, Experience, Projects, Contact", "Calm + deliberate + aesthetic positioning", "Preloader with signature entrance"],
  },
  {
    v: "v1.1",
    label: "Easter eggs",
    notes: ["Dev console (`)", "Version cycler (you are here)", "Triple-click name scrambler", "'ship' keypress badge"],
  },
  {
    v: "v1.2",
    label: "Motion pass",
    notes: ["Scroll-triggered reveals", "Magnetic CTAs", "Horizontal parallax on projects"],
  },
  {
    v: "v2.0",
    label: "Next role",
    notes: ["Awaiting your deployment.", "Click again to reset."],
  },
] as const;

export default function VersionCycler() {
  const [i, setI] = useState(0);
  const notesRef = useRef<HTMLUListElement | null>(null);
  const current = versions[i];

  const cycle = () => {
    const next = (i + 1) % versions.length;
    setI(next);
    logEvent("EVT", `version cycled → ${versions[next].v}`);

    if (notesRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        notesRef.current.querySelectorAll("li"),
        { autoAlpha: 0, x: -4 },
        { autoAlpha: 1, x: 0, duration: 0.3, ease: "power3.out", stagger: 0.04 },
      );
    }
  };

  return (
    <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted">
      <div className="flex flex-wrap items-start gap-3">
        <button
          type="button"
          onClick={cycle}
          className="inline-flex items-center gap-2 text-ink hover:text-signal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
          aria-label={`Cycle version. Current: ${current.v}`}
        >
          <span>{current.v}</span>
          <span className="text-ink-muted">·</span>
          <span className="text-ink-dim normal-case tracking-normal">{current.label}</span>
        </button>
      </div>
      {current.notes.length > 0 && (
        <ul ref={notesRef} className="mt-2 flex flex-col gap-1 text-ink-muted/80 normal-case tracking-normal">
          {current.notes.map((n) => (
            <li key={n} className="flex items-baseline gap-2">
              <span className="text-ink-muted/50">›</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
