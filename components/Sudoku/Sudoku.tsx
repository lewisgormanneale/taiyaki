import { useCallback, useState } from "react";
import { usePuzzle } from "../../hooks/usePuzzle";
import { usePuzzleNavigation } from "../../hooks/usePuzzleNavigation";
import SudokuGrid from "./SudokuGrid";
import "./Sudoku.css";
import SudokuInfo from "./SudokuInfo.tsx";
import SudokuControls from "./SudokuControls.tsx";

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

  const handleChange = useCallback(
    (row: number, col: number, value: string) => {
      const intVal = parseInt(value);
      const isValidNumber = !isNaN(intVal) && intVal >= 1 && intVal <= 9;

      setBoard((prev) => {
        const next = prev.map((r) => [...r]);
        next[row][col] = {
          ...next[row][col],
          value:
            value === "" ? null : isValidNumber ? intVal : next[row][col].value,
        };
        return next;
      });
    },
    [setBoard],
  );

  return (
    <div className="sudoku-container">
      <SudokuInfo
        difficulty={difficulty}
        isTimerRunning={isTimerRunning}
        timerResetKey={timerResetKey}
        onNewPuzzle={fetchPuzzle}
      />
      {board.length ? (
        <>
          <SudokuGrid
            board={board}
            focusedCell={focusedCell}
            setFocusedCell={setFocusedCell}
            handleChange={handleChange}
          />
          <SudokuControls
            focusedCell={focusedCell}
            setFocusedCell={setFocusedCell}
            board={board}
            setBoard={setBoard}
          />
        </>
      ) : (
        <></>
      )}
      {isComplete && <div className="completion-message">Puzzle Complete!</div>}
    </div>
  );
}
