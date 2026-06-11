import { useRef } from "react";
import { cv } from "../../../data/cv";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";
import { useNameScramble } from "../../../components/useNameScramble";

export default function HeroName() {
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  useEntranceAnimation(nameRef);
  useNameScramble(nameRef, true);

  return (
    <h1
      ref={nameRef}
      className="font-display font-semibold text-ink tracking-[-0.03em] leading-[0.92] text-[clamp(2.75rem,9vw,8.5rem)] cursor-pointer select-none"
      aria-label={cv.person.name}
      title="Triple-click to scramble"
    >
      <span className="block">{cv.person.preferredName ?? cv.person.name.split(" ")[0]}</span>
      <span className="block text-ink-dim italic font-light text-[clamp(2rem,6.5vw,6rem)]">
        {cv.person.name.split(" ").slice(1).join(" ")}
      </span>
    </h1>
  );
}
