import { useState, useEffect, useCallback } from "react";
import { storage } from "./storage";

export function usePersistentState(key, seed) {
  const [value, setValue] = useState(seed);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await storage.get(key);
        if (cancelled) return;
        if (result && result.value !== undefined) {
          setValue(JSON.parse(result.value));
        } else {
          setValue(seed);
        }
      } catch {
        if (!cancelled) setValue(seed);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const persist = useCallback(async (next) => {
    setValue(next);
    try {
      const result = await storage.set(key, JSON.stringify(next));
      if (!result) setError(true);
      else setError(false);
    } catch {
      setError(true);
    }
  }, [key]);

  return [value, persist, loaded, error];
}
