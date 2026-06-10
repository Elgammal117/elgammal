import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { prefersReducedMotion } from "../lib/utils";
import { logEvent } from "../lib/eventLog";

gsap.registerPlugin(ScrambleTextPlugin);

const variants = [
  "MOHAMMED HASAN ELGAMMAL",
  "محمد حسن الجمال",
  "mohammed.elgammal",
  "M.H. ELGAMMAL",
] as const;

const titleEl = (root: HTMLElement) => {
  const first = root.querySelector("span:nth-child(1)") as HTMLElement | null;
  const second = root.querySelector("span:nth-child(2)") as HTMLElement | null;
  return { first, second };
};

export function useNameScramble(
  target: React.RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const index = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const el = target.current;
    if (!el) return;

    const onClick = () => {
      const now = performance.now();
      // Triple-click detection: 3 clicks within 800ms
      const tripleWindow = 800;
      (el as HTMLElement & { _clicks?: number[] })._clicks =
        (el as HTMLElement & { _clicks?: number[] })._clicks ?? [];
      const arr = (el as HTMLElement & { _clicks?: number[] })._clicks!;
      arr.push(now);
      while (arr.length > 0 && now - arr[0] > tripleWindow) arr.shift();
      if (arr.length < 3) return;
      arr.length = 0;

      index.current = (index.current + 1) % variants.length;
      const next = variants[index.current];
      logEvent("EVT", `name → ${next}`);

      const { first, second } = titleEl(el);
      if (!first || !second) return;

      const split = next.split(" ");
      const left = split[0] ?? "";
      const right = split.slice(1).join(" ");

      if (prefersReducedMotion()) {
        first.textContent = left;
        second.textContent = right;
        return;
      }

      const tl = gsap.timeline();
      tl.to(first, {
        duration: 0.7,
        scrambleText: { text: left, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzابتثجحخدذرزسشصضطظعغفقكلمنهوي", speed: 0.6 },
      }).to(
        second,
        {
          duration: 0.7,
          scrambleText: { text: right, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzابتثجحخدذرزسشصضطظعغفقكلمنهوي", speed: 0.6 },
        },
        0.1,
      );
    };

    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, [target, enabled]);
}
