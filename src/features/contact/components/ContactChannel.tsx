import Icon from "../../../components/Icon";
import type { ContactChannelProps } from "../types";

export default function ContactChannel({ id, label, display, href, copyable, iconName, isCopied, onCopy }: ContactChannelProps) {
  return (
    <li className="bg-paper p-6 md:p-7 flex flex-col gap-3 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-ink">
          {iconName && <Icon name={iconName} size={14} strokeWidth={1.5} />}
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim">
            {label}
          </span>
        </div>
        {copyable && (
          <button
            type="button"
            onClick={() => onCopy(id, display)}
            className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted hover:text-signal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm px-1"
            aria-label={`Copy ${label}`}
          >
            {isCopied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
      <div className="font-sans text-lg md:text-xl text-ink break-all">
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="hover:text-signal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
          >
            {display}
          </a>
        ) : (
          <span className="text-ink-muted">{display}</span>
        )}
      </div>
    </li>
  );
}
