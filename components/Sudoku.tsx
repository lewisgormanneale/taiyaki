import { useEffect, useState } from "react";
import {
  type Cell,
  formatBoard,
  lockBoard,
  validateBoard,
} from "../utils/sudoku-utils.ts";
import "./Sudoku.css";

function Sudoku() {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [difficulty, setDifficulty] = useState<string>("Unknown");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    fetch("/data/sudoku-easy.json")
      .then((res) => res.json())
      .then((data) => {
        setBoard(formatBoard(data.newboard.grids[0].value));
        setSolution(data.newboard.grids[0].solution);
        setDifficulty(data.newboard.grids[0].difficulty);
      })
      .catch((err) => {
        console.error("Failed to load puzzle", err);
      });
  }, []);

  useEffect(() => {
    if (!board.length || !solution.length || isComplete) return;
    const complete = validateBoard(board, solution);
    if (complete) {
      setIsComplete(true);
      setBoard(lockBoard(board));
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

  if (!board) return <p className="loading">Loading...</p>;

  return (
    <div className="sudoku-container">
      <div className="difficulty">Difficulty: {difficulty}</div>
      <div className="sudoku-grid">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`r${rowIndex + 1}c${colIndex + 1}`}
              id={`r${rowIndex + 1}c${colIndex + 1}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className={`cell ${cell.locked ? "locked" : ""}`}
              value={cell.value ?? ""}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              disabled={cell.locked}
            />
          )),
        )}
      </div>
      {isComplete && <div className="completion-message">Puzzle Complete</div>}
    </div>
  );
}

export default Sudoku;
