import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { prefersReducedMotion } from "../../../lib/utils";

gsap.registerPlugin(ScrambleTextPlugin);

export function useEntranceAnimation(
  nameTarget: React.RefObject<HTMLElement | null>,
  preloaderDone: boolean,
) {
  const played = useRef(false);

  useEffect(() => {
    if (played.current) return;
    if (!preloaderDone) return;
    played.current = true;

    const name = nameTarget.current;
    if (!name) return;

    if (prefersReducedMotion()) {
      gsap.set(name, { autoAlpha: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(name.querySelectorAll("span"), {
      y: 16,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.05,
    }).from(
      "[data-hero-reveal]",
      {
        y: 16,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.08,
      },
      "-=0.3",
    );
  }, [nameTarget, preloaderDone]);
}
