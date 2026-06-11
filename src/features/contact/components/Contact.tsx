import { useSectionReveal } from "../../hooks/useSectionReveal";
import { useCopy } from "../hooks/useCopy";
import { channels } from "../constants/channels";
import ContactChannel from "./ContactChannel";
import ContactFooter from "./ContactFooter";

export default function Contact() {
  const ref = useSectionReveal();
  const { copied, copy } = useCopy();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contact"
      className="py-24 md:py-32 border-t hairline"
      aria-label="Contact"
    >
      <div className="container-page">
        <div data-reveal className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted mb-3">
              <span className="text-ink">§ 05</span>
              <span className="mx-2 text-ink-muted/60">/</span>
              Contact
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-ink leading-[0.95] tracking-[-0.03em]">
              Open for the next build.
            </h2>
            <p className="mt-6 font-sans text-ink-dim text-base md:text-lg leading-relaxed max-w-xl">
              The fastest path is email. The number is below if a call is better. Recruiters: full CV on request.
            </p>
          </div>
        </div>

        <ul
          data-reveal
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10 border hairline"
        >
          {channels.map((c) => (
            <ContactChannel
              key={c.id}
              {...c}
              isCopied={copied === c.id}
              onCopy={copy}
            />
          ))}
        </ul>

        <ContactFooter />
      </div>
    </section>
  );
}
