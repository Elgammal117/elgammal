import { cv } from "../../../data/cv";
import { useEffect, useState } from "react";

const formatTime = () => {
  const d = new Date();
  const hh = String(d.getUTCHours() + 2).padStart(2, "0").slice(-2);
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm} UTC+2`;
};

export default function CornerStatus() {
  const [time, setTime] = useState(formatTime);
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 text-[10px] font-mono tracking-[0.1em] uppercase text-ink-dim">
      <div className="flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-arc" />
        <span>System</span>
        <span className="text-ink">Online</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-ink-muted">Lat</span>
        <span>30.0444° N</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-ink-muted">Lon</span>
        <span>31.2357° E</span>
      </div>
      <div className="flex items-center gap-2 text-ink-muted">
        <span>{cv.person.timezone ?? "Africa/Cairo"}</span>
        <span>·</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
