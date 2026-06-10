import { useEffect, useRef, type ReactNode } from "react";
import { cn, prefersReducedMotion } from "../lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

export default function MagneticButton({
  children,
  className,
  strength = 0.25,
  as = "button",
  href,
  onClick,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const offset = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      offset.current = { x: x * strength, y: y * strength };
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        el.style.transform = `translate(${offset.current.x}px, ${offset.current.y}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        el.style.transform = "translate(0, 0)";
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  const base = cn(
    "inline-flex items-center gap-2 px-5 h-11 rounded-full bg-ink text-paper",
    "font-mono text-xs tracking-[0.1em] uppercase",
    "transition-colors hover:bg-signal",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
    className,
  );

  if (as === "a") {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={base}
        onClick={onClick}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      className={base}
      onClick={onClick}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
