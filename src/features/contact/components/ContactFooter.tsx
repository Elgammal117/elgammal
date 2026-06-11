import { cv } from "../../../data/cv";
import VersionCycler from "../../../components/VersionCycler";

export default function ContactFooter() {
  return (
    <footer
      data-reveal
      className="mt-20 pt-8 border-t hairline grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <div className="flex items-center gap-3">
        <span className="font-display text-2xl text-ink">⌘</span>
        <div>
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted">
            End of File
          </div>
          <div className="font-sans text-sm text-ink-dim">
            © {new Date().getFullYear()} {cv.person.name}
          </div>
        </div>
      </div>
      <div>
        <VersionCycler />
      </div>
      <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted md:text-right">
        Built with React · Tailwind · GSAP · Lenis
      </div>
    </footer>
  );
}
