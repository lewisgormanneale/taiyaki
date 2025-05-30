import { useEffect, useRef, useState } from "react";
import "./Timer.css";

interface TimerProps {
  isRunning: boolean;
  onComplete?: (elapsedSeconds: number) => void;
  resetTrigger?: number; // Use a key or state to force reset
}

export default function Timer({
  isRunning,
  onComplete,
  resetTrigger,
}: TimerProps) {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    setElapsedTime(0);
  }, [resetTrigger]);

  useEffect(() => {
    if (!isRunning && onComplete) {
      onComplete(elapsedTime);
    }
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return <div className="timer">{formatTime(elapsedTime)}</div>;
}
