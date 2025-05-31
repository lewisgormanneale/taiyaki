import SudokuTimer from "./SudokuTimer";
import "./SudokuInfo.css";

type Props = {
  difficulty: string;
  isTimerRunning: boolean;
  timerResetKey: number;
  onNewPuzzle: () => void;
};

export default function SudokuInfo({
  difficulty,
  isTimerRunning,
  timerResetKey,
  onNewPuzzle,
}: Props) {
  return (
    <div className="sudoku-info">
      <div className="difficulty-container">
        <span className="difficulty">{difficulty}</span>
      </div>
      <div className="timer-container">
        <SudokuTimer isRunning={isTimerRunning} resetTrigger={timerResetKey} />
      </div>
      <div className="new-puzzle-container">
        <button onClick={onNewPuzzle}>New Puzzle</button>
      </div>
    </div>
  );
}
