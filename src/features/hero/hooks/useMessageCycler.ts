import { useEffect, useState } from "react";
import { heroMessages } from "../constants/messages";

export function useMessageCycler(intervalMs = 3600) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % heroMessages.length), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return { current: heroMessages[i], index: i, total: heroMessages.length };
}
