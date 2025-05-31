import { useState } from "react";
import { usePuzzle } from "../../hooks/usePuzzle";
import { usePuzzleNavigation } from "../../hooks/usePuzzleNavigation";
import SudokuGrid from "./SudokuGrid";
import "./Sudoku.css";
import SudokuInfo from "./SudokuInfo.tsx";

export default function Sudoku() {
  const {
    board,
    setBoard,
    difficulty,
    isComplete,
    isTimerRunning,
    timerResetKey,
    fetchPuzzle,
  } = usePuzzle();

  const [focusedCell, setFocusedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  usePuzzleNavigation(focusedCell, setFocusedCell);

  const handleChange = (row: number, col: number, value: string) => {
    const intVal = parseInt(value);
    setBoard((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = {
        ...next[row][col],
        value:
          value === ""
            ? null
            : !isNaN(intVal) && intVal >= 1 && intVal <= 9
              ? intVal
              : next[row][col].value,
      };
      return next;
    });
  };

  if (!board.length || !difficulty)
    return <p className="loading">Loading...</p>;

  return (
    <div className="sudoku-container">
      <SudokuInfo
        difficulty={difficulty}
        isTimerRunning={isTimerRunning}
        timerResetKey={timerResetKey}
        onNewPuzzle={fetchPuzzle}
      />
      <SudokuGrid
        board={board}
        focusedCell={focusedCell}
        setFocusedCell={setFocusedCell}
        handleChange={handleChange}
      />
      {isComplete && <div className="completion-message">Puzzle Complete</div>}
    </div>
  );
}
