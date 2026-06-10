import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../../../lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Options = {
  stagger?: number;
  y?: number;
  start?: string;
};

export function useCardReveal<T extends HTMLElement = HTMLElement>(opts: Options = {}) {
  const { stagger = 0.08, y = 14, start = "top 85%" } = opts;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-card-reveal]"));
    if (items.length === 0) return;

    if (prefersReducedMotion()) {
      gsap.set(items, { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(items, {
        y,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: root,
          start,
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [stagger, y, start]);

  return ref;
}
