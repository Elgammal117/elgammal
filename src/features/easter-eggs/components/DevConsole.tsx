import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cv } from "../../../data/cv";
import { prefersReducedMotion } from "../../../lib/utils";
import { logEvent, subscribeLog, type LogEntry } from "../../../lib/eventLog";

const sections = ["hero", "about", "skills", "experience", "projects", "contact"];

export default function DevConsole() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [scrollPct, setScrollPct] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [uptime, setUptime] = useState("00:00:00");
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    return subscribeLog(setEntries);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        const target = e.target as HTMLElement | null;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
          return;
        }
        e.preventDefault();
        setOpen((v) => !v);
        logEvent("EVT", `console ${!open ? "opened" : "closed"}`);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
        logEvent("EVT", "console closed");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (startedAt.current === null) startedAt.current = Date.now();
    let lastY = window.scrollY;
    let lastT = performance.now();
    let raf = 0;
    let v = 0;
    const tick = (t: number) => {
      const dt = t - lastT;
      const dy = window.scrollY - lastY;
      if (dt > 0) v = (dy / dt) * 1000;
      lastY = window.scrollY;
      lastT = t;
      setVelocity(Math.abs(v));
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrollPct(max > 0 ? (window.scrollY / max) * 100 : 0);
      let current = "hero";
      for (const s of sections) {
        const el = document.getElementById(s);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.4) current = s;
      }
      setActive(current);
      if (startedAt.current !== null) {
        const s = Math.floor((Date.now() - startedAt.current) / 1000);
        const hh = String(Math.floor(s / 3600)).padStart(2, "0");
        const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
        const ss = String(s % 60).padStart(2, "0");
        setUptime(`${hh}:${mm}:${ss}`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (open) {
      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1, y: 0 });
      } else {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: -8 },
          { autoAlpha: 1, y: 0, duration: 0.3, ease: "power3.out" },
        );
      }
    } else if (!prefersReducedMotion()) {
      gsap.to(el, { autoAlpha: 0, y: -8, duration: 0.2, ease: "power2.in" });
    }
  }, [open]);

  return (
    <div
      ref={panelRef}
      role="region"
      aria-label="Developer console"
      aria-hidden={!open}
      className="fixed top-8 right-4 z-[60] w-[min(360px,calc(100vw-2rem))] invisible pointer-events-none data-[open=true]:pointer-events-auto"
      data-open={open || undefined}
    >
      <div className="bg-paper-elevated border hairline-strong rounded-md shadow-sm overflow-hidden font-mono text-[10px] tracking-[0.04em] text-ink-dim">
        <div className="flex items-center justify-between px-3 py-2 border-b hairline bg-paper-sunken">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-signal" />
            <span className="text-ink">~/dev/console</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              logEvent("EVT", "console closed");
            }}
            className="text-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
            aria-label="Close console"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-px bg-ink/10">
          <div className="bg-paper-elevated p-2.5">
            <div className="text-ink-muted uppercase text-[9px] mb-1">Uptime</div>
            <div className="text-ink tabular-nums">{uptime}</div>
          </div>
          <div className="bg-paper-elevated p-2.5">
            <div className="text-ink-muted uppercase text-[9px] mb-1">Section</div>
            <div className="text-ink">§ {active}</div>
          </div>
          <div className="bg-paper-elevated p-2.5">
            <div className="text-ink-muted uppercase text-[9px] mb-1">Scroll</div>
            <div className="text-ink tabular-nums">{scrollPct.toFixed(1)}%</div>
          </div>
          <div className="bg-paper-elevated p-2.5">
            <div className="text-ink-muted uppercase text-[9px] mb-1">Velocity</div>
            <div className="text-ink tabular-nums">{velocity.toFixed(0)} px/s</div>
          </div>
        </div>

        <div className="p-2.5 border-t hairline">
          <div className="text-ink-muted uppercase text-[9px] mb-1.5 flex items-center justify-between">
            <span>Event log</span>
            <span className="text-ink-muted/60">{entries.length}/20</span>
          </div>
          <ul className="max-h-32 overflow-y-auto flex flex-col gap-1">
            {entries.length === 0 ? (
              <li className="text-ink-muted italic">No events yet.</li>
            ) : (
              entries.map((e) => (
                <li key={e.id} className="flex gap-2 leading-relaxed">
                  <span className="text-ink-muted shrink-0">{e.time}</span>
                  <span
                    className={
                      e.level === "DBG"
                        ? "text-trace shrink-0"
                        : e.level === "EVT"
                          ? "text-arc shrink-0"
                          : "text-signal shrink-0"
                    }
                  >
                    {e.level}
                  </span>
                  <span className="text-ink-dim truncate">{e.message}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="px-3 py-1.5 border-t hairline flex items-center justify-between text-ink-muted text-[9px]">
          <span>{cv.contact.email}</span>
          <span>~ toggle</span>
        </div>
      </div>
    </div>
  );
}
