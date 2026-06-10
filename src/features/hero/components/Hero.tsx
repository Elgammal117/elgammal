import HeroName from "./HeroName";
import HeroActions from "./HeroActions";
import CornerStatus from "./CornerStatus";
import RotatingMessage from "./RotatingMessage";
import { cv } from "../../../data/cv";

type Props = {
  preloaderDone: boolean;
};

export default function Hero({ preloaderDone }: Props) {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] pt-24 pb-16 flex flex-col"
      aria-label="Introduction"
    >
      <div className="container-page grid grid-cols-12 gap-6 flex-1">
        <div className="hidden lg:flex col-span-3 items-start pt-2">
          <CornerStatus />
        </div>

        <div className="col-span-12 lg:col-span-9 flex flex-col justify-center gap-10">
          <div
            data-hero-reveal
            className="flex items-center gap-3 text-[11px] font-mono tracking-[0.12em] uppercase text-ink-muted"
          >
            <span className="text-ink">§ 00</span>
            <span className="h-px w-10 bg-ink-muted/40" />
            <span>Index · {cv.person.role}</span>
          </div>

          <HeroName preloaderDone={preloaderDone} />

          <p
            data-hero-reveal
            className="font-sans text-ink-dim text-base md:text-lg max-w-2xl leading-relaxed"
          >
            {cv.bio[0]}
          </p>

          <div data-hero-reveal className="flex flex-col gap-4">
            <RotatingMessage />
            <HeroActions />
          </div>
        </div>
      </div>

      <div
        data-hero-reveal
        className="container-page mt-12 flex flex-wrap items-end justify-between gap-4 border-t hairline pt-6"
      >
        <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted">
          Portfolio · {new Date().getFullYear()}
        </div>
        <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted">
          Scroll for the work
          <span className="ml-2 inline-block w-6 h-px bg-ink-muted/50 align-middle" />
        </div>
      </div>
    </section>
  );
}
