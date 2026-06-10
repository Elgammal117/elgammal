import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { cv } from "../data/cv";
import { prefersReducedMotion } from "../lib/utils";

gsap.registerPlugin(ScrambleTextPlugin);

type Props = {
  onDone: () => void;
};

const fullName = cv.person.name;

export default function Preloader({ onDone }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const percentRef = useRef<HTMLSpanElement | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const reduced = prefersReducedMotion();
    const root = rootRef.current;
    const name = nameRef.current;
    const fill = fillRef.current;
    const percent = percentRef.current;
    if (!root || !name || !fill || !percent) return;

    if (reduced) {
      gsap.set(name, { textContent: fullName });
      gsap.set(fill, { width: "100%" });
      if (percent) percent.textContent = "100";
      gsap.set(root, { autoAlpha: 0, onComplete: onDone });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.to(root, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => onDone(),
        });
      },
    });

    tl.set(root, { autoAlpha: 1 })
      .from(
        "[data-preloader-reveal]",
        {
          y: 8,
          autoAlpha: 0,
          duration: 0.4,
          stagger: 0.06,
        },
        0.1,
      )
      .to(
        name,
        {
          duration: 1.0,
          scrambleText: {
            text: fullName,
            chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            speed: 0.6,
            revealDelay: 0.15,
          },
        },
        0.3,
      )
      .to(
        fill,
        {
          width: "100%",
          duration: 1.2,
          ease: "power1.inOut",
          onUpdate: function () {
            const p = Math.round(this.progress() * 100);
            if (percent) percent.textContent = String(p).padStart(3, "0");
          },
        },
        0.4,
      )
      .to(
        "[data-preloader-exit]",
        {
          y: -6,
          autoAlpha: 0,
          duration: 0.3,
          stagger: 0.04,
        },
        1.4,
      );
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading portfolio"
      aria-live="polite"
      className="fixed inset-0 z-[100] bg-paper flex items-center justify-center invisible"
    >
      <div className="container-page">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <div
            data-preloader-reveal
            data-preloader-exit
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted"
          >
            <span className="relative inline-flex w-2 h-2 rounded-full bg-signal">
              <span className="absolute inset-0 rounded-full bg-signal animate-ping opacity-50" />
            </span>
            <span className="text-ink">Initializing</span>
            <span className="h-px w-10 bg-ink-muted/40" />
            <span>{cv.person.role}</span>
          </div>

          <h1
            ref={nameRef}
            data-preloader-exit
            className="font-display font-semibold text-ink tracking-[-0.03em] leading-[0.95] text-[clamp(2rem,7vw,5.5rem)]"
            aria-label={fullName}
          >
            {fullName}
          </h1>

          <div
            data-preloader-reveal
            data-preloader-exit
            className="flex flex-col gap-2"
          >
            <div className="h-px w-full bg-ink/10 relative overflow-hidden">
              <div
                ref={fillRef}
                className="absolute inset-y-0 left-0 w-0 bg-signal"
                aria-hidden
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted">
              <span>Loading modules</span>
              <span className="text-ink tabular-nums">
                <span ref={percentRef}>000</span>%
              </span>
            </div>
          </div>

          <div
            data-preloader-reveal
            data-preloader-exit
            className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted pt-2 border-t hairline"
          >
            <span>{cv.person.location}</span>
            <span>{cv.person.timezone ?? "UTC+2"}</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
