import { useEffect, useState } from "react";
import { cv } from "../data/cv";

const sections = [
  { id: "hero", code: "00", label: "Index" },
  { id: "about", code: "01", label: "About" },
  { id: "skills", code: "02", label: "Skills" },
  { id: "experience", code: "03", label: "Experience" },
  { id: "projects", code: "04", label: "Projects" },
  { id: "contact", code: "05", label: "Contact" },
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? (h.scrollTop / max) * 100 : 0;
      setProgress(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return progress;
}

function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      let current = "hero";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          current = s.id;
        }
      }
      setActive((prev) => (prev !== current ? current : prev));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return active;
}

function useUptime() {
  const [uptime, setUptime] = useState("00:00:00");
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      const h = String(Math.floor(s / 3600)).padStart(2, "0");
      const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const sec = String(s % 60).padStart(2, "0");
      setUptime(`${h}:${m}:${sec}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return uptime;
}

export default function StatusBar() {
  const progress = useScrollProgress();
  const active = useActiveSection();
  const uptime = useUptime();
  const activeSection = sections.find((s) => s.id === active) ?? sections[0];
  const initials = cv.person.preferredName?.slice(0, 2).toUpperCase() ?? "ME";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-6 backdrop-blur-md bg-paper/70 border-b hairline"
      role="banner"
    >
      <div className="container-page h-full flex items-center justify-between text-[10px] font-mono tracking-[0.08em] uppercase text-ink-dim">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="relative inline-block w-1.5 h-1.5 rounded-full bg-trace">
              <span className="absolute inset-0 rounded-full bg-trace animate-ping opacity-60" />
            </span>
            <span className="text-ink">Live</span>
          </span>
          <span className="text-ink-muted">/</span>
          <span className="text-ink-muted hidden sm:inline">
            {initials} · {cv.person.location}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-ink-muted hidden md:inline">
            § {activeSection.code}
          </span>
          <span className="text-ink">{activeSection.label}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-ink-muted hidden sm:inline">{uptime}</span>
          <span className="text-ink-muted hidden sm:inline">·</span>
          <span className="text-ink tabular-nums w-10 text-right">
            {progress.toFixed(0)}%
          </span>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-px bg-signal transition-[width] duration-100"
        style={{ width: `${progress}%` }}
        aria-hidden
      />
    </header>
  );
}
