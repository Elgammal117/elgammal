import MagneticButton from "../../../components/MagneticButton";
import { cv } from "../../../data/cv";

export default function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-3">
   <MagneticButton
        as="button"
        onClick={() =>
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Get in touch
        <span aria-hidden>→</span>
      </MagneticButton>
      <a
        href="#projects"
        className="inline-flex items-center gap-2 h-11 px-4 text-ink-dim font-mono text-xs tracking-[0.1em] uppercase hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        See the work
        <span aria-hidden>↓</span>
      </a>
    </div>
  );
}
