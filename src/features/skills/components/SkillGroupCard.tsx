import Icon from "../../../components/Icon";
import type { SkillGroupCardProps } from "../types";

export default function SkillGroupCard({ category, icon, skills, span, isAccent }: SkillGroupCardProps) {
  return (
    <div className={`${span} bg-paper p-6 md:p-7 flex flex-col gap-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-ink">
          <Icon name={icon} size={16} strokeWidth={1.5} />
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink">
            {category}
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-muted tabular-nums">
          {String(skills.length).padStart(2, "0")}
        </span>
      </div>
      <ul className="flex flex-col gap-1.5">
        {skills.map((s) => (
          <li
            key={s}
            className="font-sans text-sm text-ink-dim flex items-center gap-2"
          >
            <span
              className={`w-1 h-1 rounded-full shrink-0 ${isAccent ? "bg-signal" : "bg-ink/30"}`}
              aria-hidden
            />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
