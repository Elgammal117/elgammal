import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { prefersReducedMotion } from "../../../lib/utils";

gsap.registerPlugin(ScrambleTextPlugin);

export function useEntranceAnimation(nameTarget: React.RefObject<HTMLElement | null>) {
  const played = useRef(false);

  useEffect(() => {
    if (played.current) return;
    played.current = true;

    const name = nameTarget.current;
    if (!name) return;

    if (prefersReducedMotion()) {
      gsap.set(name, { autoAlpha: 1 });
      gsap.set("[data-hero-reveal]", { autoAlpha: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.set(name, { autoAlpha: 1 })
      .from(
        name.querySelectorAll("span"),
        {
          y: 20,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.06,
        },
        0,
      )
      .from(
        name,
        {
          scrambleText: {
            text: name.textContent ?? "",
            chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            speed: 0.5,
            revealDelay: 0.1,
          },
          duration: 1.2,
        },
        0,
      )
      .from(
        "[data-hero-reveal]",
        {
          y: 14,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.08,
        },
        0.4,
      );
  }, [nameTarget]);
}
