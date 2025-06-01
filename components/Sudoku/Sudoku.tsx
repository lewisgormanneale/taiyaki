import { useCallback, useEffect, useState } from "react";
import { usePuzzle } from "../../hooks/usePuzzle";
import { usePuzzleNavigation } from "../../hooks/usePuzzleNavigation";
import { useTimer } from "../../hooks/useTimer";
import SudokuGrid from "./SudokuGrid";
import "./Sudoku.css";
import SudokuInfo from "./SudokuInfo.tsx";
import SudokuControls from "./SudokuControls.tsx";

export default function Sudoku() {
  const { board, setBoard, difficulty, isComplete, fetchPuzzle } = usePuzzle();
  const timer = useTimer();

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

  const handleNewPuzzle = useCallback(async () => {
    timer.reset();
    await fetchPuzzle();
    timer.start();
  }, [fetchPuzzle, timer]);

  useEffect(() => {
    if (isComplete) {
      timer.stop();
    } else if (board.length && !timer.isRunning) {
      timer.start();
    }
  }, [board.length, isComplete, timer]);

  return (
    <div className="sudoku-container">
      <SudokuInfo
        difficulty={difficulty}
        onNewPuzzle={handleNewPuzzle}
        elapsedTime={timer.elapsedTime}
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
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading puzzle...</p>
        </div>
      )}
      {isComplete && <div className="completion-message">Puzzle Complete!</div>}
    </div>
  );
}
