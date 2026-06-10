import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "../lib/utils";

const navItems = [
  { id: "about", code: "01", label: "About" },
  { id: "skills", code: "02", label: "Skills" },
  { id: "experience", code: "03", label: "Experience" },
  { id: "projects", code: "04", label: "Projects" },
  { id: "contact", code: "05", label: "Contact" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const items = itemsRef.current;
    if (!overlay || !items) return;

    if (prefersReducedMotion()) {
      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(items.querySelectorAll("button"), { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.25, ease: "power2.out" },
      );
      gsap.fromTo(
        items.querySelectorAll("button"),
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.06,
          delay: 0.12,
        },
      );
    }, overlay);

    return () => ctx.revert();
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 lg:hidden h-12 w-12 rounded-full bg-paper-elevated border hairline-strong shadow-sm flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span className="font-mono text-[10px] tracking-[0.1em] text-ink-dim">
          {open ? "×" : "MENU"}
        </span>
      </button>

      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 lg:hidden bg-paper/95 backdrop-blur-md flex flex-col items-center justify-center invisible"
          role="dialog"
          aria-modal="true"
        >
          <div ref={itemsRef} className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className="font-display text-3xl text-ink hover:text-signal transition-colors invisible focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
              >
                <span className="font-mono text-xs text-ink-muted mr-3 align-middle">
                  {item.code}
                </span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
