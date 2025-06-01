import "./SudokuInfo.css";
import { Flame, SkipForward } from "lucide-react";
import type { Difficulty } from "../../types/sudoku.ts";

interface Props {
  difficulty: Difficulty;
  onNewPuzzle: () => void;
  elapsedTime: number;
}

const getFlameCount = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case "Easy":
      return 1;
    case "Medium":
      return 2;
    case "Hard":
      return 3;
    default:
      return 0;
  }
};

const getFlameColor = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case "Easy":
      return "green";
    case "Medium":
      return "orange";
    case "Hard":
      return "red";
    default:
      return "gray";
  }
};

export default function SudokuInfo({
  difficulty,
  onNewPuzzle,
  elapsedTime,
}: Props) {
  const flameCount = getFlameCount(difficulty);
  const flameColor = getFlameColor(difficulty);
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };
  return (
    <div className="sudoku-info">
      <div className="difficulty-container">
        {[...Array(flameCount)].map((_, index) => (
          <Flame key={index} size={20} color={flameColor} />
        ))}
      </div>
      <div className="timer-container">
        <div className="timer" role="timer" aria-live="polite">
          {formatTime(elapsedTime)}
        </div>
      </div>
      <div className="new-puzzle-container">
        <button className="icon-button" onClick={onNewPuzzle}>
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  );
}
