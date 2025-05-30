import { useEffect, useState } from "react";
import {
  type Cell,
  formatBoard,
  lockBoard,
  validateBoard,
} from "../utils/sudoku-utils.ts";
import "./Sudoku.css";
import Timer from "./Timer.tsx";

function Sudoku() {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [difficulty, setDifficulty] = useState<string>("");
  const [isComplete, setIsComplete] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const [focusedCell, setFocusedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const fetchPuzzle = async () => {
    setIsComplete(false);
    setBoard([]);
    setDifficulty("");
    setIsTimerRunning(false);
    setTimerResetKey((prev) => prev + 1);

    try {
      const response = await fetch("https://sudoku-api.vercel.app/api/dosuku");
      const json = await response.json();
      const grid = json.newboard.grids[0];
      setBoard(formatBoard(grid.value));
      setSolution(grid.solution);
      setDifficulty(grid.difficulty);
      setIsTimerRunning(true);
    } catch (err) {
      console.error("Failed to fetch puzzle:", err);
    }
  };

  useEffect(() => {
    fetchPuzzle();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!focusedCell) return;

      const { row, col } = focusedCell;
      let newRow = row;
      let newCol = col;

      switch (e.key) {
        case "ArrowUp":
          newRow = row > 0 ? row - 1 : row;
          break;
        case "ArrowDown":
          newRow = row < 8 ? row + 1 : row;
          break;
        case "ArrowLeft":
          newCol = col > 0 ? col - 1 : col;
          break;
        case "ArrowRight":
          newCol = col < 8 ? col + 1 : col;
          break;
        default:
          return;
      }

      const nextId = `r${newRow + 1}c${newCol + 1}`;
      const nextInput = document.getElementById(
        nextId,
      ) as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
      }

      setFocusedCell({ row: newRow, col: newCol });
      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedCell]);

  useEffect(() => {
    if (!board.length || !solution.length || isComplete) return;
    const complete = validateBoard(board, solution);
    if (complete) {
      setIsComplete(true);
      setBoard(lockBoard(board));
      setIsTimerRunning(false);
    }
  }, [board, solution, isComplete]);

  const handleChange = (row: number, col: number, value: string) => {
    if (value === "") {
      setBoard((previousBoard) => {
        if (!previousBoard.length) return previousBoard;
        const newBoard = previousBoard.map((r) => [...r]);
        newBoard[row][col] = {
          ...newBoard[row][col],
          value: null,
        };
        return newBoard;
      });
      return;
    }
    const intVal = parseInt(value);
    if (isNaN(intVal) || intVal < 1 || intVal > 9) return;
    setBoard((previousBoard) => {
      if (!previousBoard.length || !solution.length) return previousBoard;
      const newBoard = previousBoard.map((r) => [...r]);
      newBoard[row][col] = {
        ...newBoard[row][col],
        value: intVal,
      };
      return newBoard;
    });
  };

  if (!board.length || !difficulty)
    return <p className="loading">Loading...</p>;

  return (
    <div className="sudoku-container">
      <div className="puzzle-info">
        <div className="difficulty">{difficulty}</div>
        <div className="timer-container">
          <Timer isRunning={isTimerRunning} resetTrigger={timerResetKey} />
        </div>
        <div className="new-puzzle">
          <button className="new-puzzle-button" onClick={() => fetchPuzzle()}>
            New Puzzle
          </button>
        </div>
      </div>
      <div className="sudoku-grid">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`r${rowIndex + 1}c${colIndex + 1}`}
              id={`r${rowIndex + 1}c${colIndex + 1}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className={`cell
                ${cell.locked ? "locked" : ""}
                ${focusedCell?.row === rowIndex && focusedCell?.col === colIndex ? "highlight-focus" : ""}
                ${focusedCell?.row === rowIndex ? "highlight-row" : ""}
                ${focusedCell?.col === colIndex ? "highlight-col" : ""}
                ${
                  focusedCell &&
                  Math.floor(focusedCell.row / 3) ===
                    Math.floor(rowIndex / 3) &&
                  Math.floor(focusedCell.col / 3) === Math.floor(colIndex / 3)
                    ? "highlight-box"
                    : ""
                }
              `}
              value={cell.value ?? ""}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              onFocus={() => setFocusedCell({ row: rowIndex, col: colIndex })}
              disabled={cell.locked}
              tabIndex={0}
            />
          )),
        )}
      </div>
      <div className="controls"></div>
      {isComplete && <div className="completion-message">Puzzle Complete</div>}
    </div>
  );
}

export default Sudoku;
