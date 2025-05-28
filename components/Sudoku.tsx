import { useEffect, useState } from "react";
import { formatBoard } from "../utils/sudoku-utils.ts";

function Sudoku() {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [difficulty, setDifficulty] = useState<string>("Unknown");

  useEffect(() => {
    fetch("/data/sudoku-easy.json")
      .then((res) => res.json())
      .then((data) => {
        setBoard(formatBoard(data.newboard.grids[0].value));
        setSolution(data.newboard.grids[0].solution);
        setDifficulty(data.newboard.grids[0].difficulty);
      })
      .catch((err) => {
        console.error("Failed to load puzzle JSON", err);
      });
  }, []);

  if (!board) return <p className="p-4">Loading...</p>;

  return (
    <div>
      <div>Difficulty: {difficulty}</div>
      <div className="grid grid-cols-9 border border-gray-300">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`r${rowIndex + 1}c${colIndex + 1}`}
              id={`r${rowIndex + 1}c${colIndex + 1}`}
              type="text"
              className="w-8 h-8 text-center text-lg border border-gray-400 focus:outline-none cursor-default"
              value={cell.value ?? ""}
              disabled={cell.locked}
            />
          )),
        )}
      </div>
    </div>
  );
}

export default Sudoku;
