import SudokuTimer from "./SudokuTimer";
import "./SudokuInfo.css";
import { Flame, SkipForward } from "lucide-react";
import type { Difficulty } from "../../types/sudoku.ts";

type Props = {
  difficulty: Difficulty;
  isTimerRunning: boolean;
  timerResetKey: number;
  onNewPuzzle: () => void;
};

const getFlameCount = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case "Easy":
      return 1;
    case "Medium":
      return 2;
    case "Hard":
      return 3;
    default:
      return 1;
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
  isTimerRunning,
  timerResetKey,
  onNewPuzzle,
}: Props) {
  const flameCount = getFlameCount(difficulty);
  const flameColor = getFlameColor(difficulty);
  return (
    <div className="sudoku-info">
      <div className="difficulty-container">
        {[...Array(flameCount)].map((_, index) => (
          <Flame key={index} size={20} color={flameColor} />
        ))}
      </div>
      <div className="timer-container">
        <SudokuTimer isRunning={isTimerRunning} resetTrigger={timerResetKey} />
      </div>
      <div className="new-puzzle-container">
        <button className="icon-button" onClick={onNewPuzzle}>
          <SkipForward size={16} />
        </button>
      </div>
    </div>
  );
}
