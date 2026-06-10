import { useSectionReveal } from "../hooks/useSectionReveal";
import { cv } from "../../data/cv";
import { useCopy } from "./hooks/useCopy";
import VersionCycler from "../../components/VersionCycler";
import { iconFor } from "../../lib/icons";

type Channel = {
  id: string;
  label: string;
  value: string;
  display: string;
  href?: string;
  copyable: boolean;
  iconName?: string;
};

export default function Contact() {
  const ref = useSectionReveal();
  const { copied, copy } = useCopy();

  const channels: Channel[] = [
    {
      id: "email",
      label: "Email",
      value: cv.contact.email,
      display: cv.contact.email,
      href: `mailto:${cv.contact.email}`,
      copyable: true,
      iconName: "Mail",
    },
    {
      id: "phone",
      label: "Phone",
      value: cv.contact.phone ?? "",
      display: cv.contact.phone ?? "[TBD]",
      href: cv.contact.phone ? `tel:${cv.contact.phone.replace(/\s+/g, "")}` : undefined,
      copyable: !!cv.contact.phone,
      iconName: "Phone",
    },
    {
      id: "location",
      label: "Location",
      value: cv.person.location ?? "",
      display: cv.person.location ?? "[TBD]",
      copyable: false,
      iconName: "MapPin",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: cv.contact.linkedin ?? "",
      display: cv.contact.linkedin ?? "[TBD: add LinkedIn URL]",
      href: cv.contact.linkedin && !cv.contact.linkedin.startsWith("[TBD")
        ? cv.contact.linkedin
        : undefined,
      copyable: false,
      iconName: "Linkedin",
    },
    {
      id: "github",
      label: "GitHub",
      value: cv.contact.github ?? "",
      display: cv.contact.github ?? "[TBD: add GitHub URL]",
      href: cv.contact.github && !cv.contact.github.startsWith("[TBD")
        ? cv.contact.github
        : undefined,
      copyable: false,
      iconName: "Github",
    },
  ];

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
          {channels.map((c) => {
            const Icon = iconFor(c.iconName);
            const isCopied = copied === c.id;
            return (
              <li
                key={c.id}
                className="bg-paper p-6 md:p-7 flex flex-col gap-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-ink">
                    {Icon ? <Icon size={14} strokeWidth={1.5} /> : null}
                    <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim">
                      {c.label}
                    </span>
                  </div>
                  {c.copyable && (
                    <button
                      type="button"
                      onClick={() => copy(c.id, c.value)}
                      className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted hover:text-signal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm px-1"
                      aria-label={`Copy ${c.label}`}
                    >
                      {isCopied ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
                <div className="font-sans text-lg md:text-xl text-ink break-all">
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                      className="hover:text-signal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
                    >
                      {c.display}
                    </a>
                  ) : (
                    <span className="text-ink-muted">{c.display}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

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
      </div>
    </section>
  );
}
