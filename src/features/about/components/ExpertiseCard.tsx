import Icon from "../../../components/Icon";
import type { ExpertiseCardProps } from "../types";

export default function ExpertiseCard({ label, description, icon }: ExpertiseCardProps) {
  return (
    <div className="bg-paper-elevated p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-ink">
        <Icon name={icon} size={16} strokeWidth={1.5} />
        <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-dim">
          {label}
        </span>
      </div>
      <p className="font-sans text-sm text-ink-dim leading-relaxed">
        {description}
      </p>
    </div>
  );
}
