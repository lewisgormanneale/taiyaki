import "./SudokuInfo.css";
import { Flame, SkipForward } from "lucide-react";
import type { Difficulty } from "../../types/sudoku.ts";
import { getDifficultyConfig } from "../../utils/sudoku-utils.ts";
import { formatTime } from "../../utils/utils.ts";

interface Props {
  difficulty: Difficulty;
  onNewPuzzle: () => void;
  elapsedTime: number;
}

export default function SudokuInfo({
  difficulty,
  onNewPuzzle,
  elapsedTime,
}: Props) {
  const { flameCount, flameColor } = getDifficultyConfig(difficulty);
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
