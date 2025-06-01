import { useEffect, useRef, useState } from "react";

export function useTimer() {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (isRunning) {
      intervalRef.current = setInterval(
        () => setElapsedTime((prev) => prev + 1),
        1000,
      );
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  return { elapsedTime, isRunning, start, stop, reset };
}
