import { useEffect, useRef, useState } from "react";
import "./SudokuTimer.css";

interface Props {
  isRunning: boolean;
  onComplete?: (elapsedSeconds: number) => void;
  resetTrigger?: number;
}

export default function SudokuTimer({
  isRunning,
  onComplete,
  resetTrigger,
}: Props) {
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
  }, [isRunning, elapsedTime, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return <div className="timer">{formatTime(elapsedTime)}</div>;
}
