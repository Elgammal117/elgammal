export type LogLevel = "INFO" | "EVT" | "DBG";

export type LogEntry = {
  id: number;
  time: string;
  level: LogLevel;
  message: string;
};

const log: LogEntry[] = [];
const listeners = new Set<(entries: LogEntry[]) => void>();
let logId = 0;

export function logEvent(level: LogLevel, message: string) {
  const now = new Date();
  const t = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  const entry: LogEntry = { id: ++logId, time: t, level, message };
  log.unshift(entry);
  if (log.length > 20) log.length = 20;
  for (const fn of listeners) fn(log);
}

export function subscribeLog(fn: (entries: LogEntry[]) => void) {
  listeners.add(fn);
  fn(log);
  return () => {
    listeners.delete(fn);
  };
}
