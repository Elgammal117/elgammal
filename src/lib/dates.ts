const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatMonthYear(date: string): string {
  const [y, m] = date.split("-");
  return `${months[Number(m) - 1]} ${y}`;
}

export function range(start: string, end: string | "present", presentLabel = "Present"): string {
  const s = formatMonthYear(start);
  const e = end === "present" ? presentLabel : formatMonthYear(end);
  return `${s} – ${e}`;
}

export function yearRange(start?: number, end?: number, presentLabel = "Present"): string {
  if (!start && !end) return "";
  return `${start ?? "?"} – ${end ?? presentLabel}`;
}
