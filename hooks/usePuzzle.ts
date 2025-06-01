import { useEffect, useState } from "react";
import { formatBoard, lockBoard, validateBoard } from "../utils/sudoku-utils";
import type { Cell } from "../types/sudoku.ts";

export function usePuzzle() {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [difficulty, setDifficulty] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const fetchPuzzle = async ({ signal }: { signal?: AbortSignal } = {}) => {
    setIsComplete(false);
    setBoard([]);
    setDifficulty(null);

    const response = await fetch("https://sudoku-api.vercel.app/api/dosuku", {
      signal,
    });
    const json = await response.json();
    const grid = json.newboard.grids[0];

    setBoard(formatBoard(grid.value));
    setSolution(grid.solution);
    setDifficulty(grid.difficulty);
  };

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        await fetchPuzzle({ signal: controller.signal });
      } catch (e) {
        if (controller.signal.aborted) return;
        console.error("Failed to fetch puzzle", e);
      }
    })();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!board.length || !solution.length || isComplete) return;
    const complete = validateBoard(board, solution);
    if (complete) {
      setIsComplete(true);
      setBoard(lockBoard(board));
    }
  }, [board, solution, isComplete]);

  return {
    board,
    setBoard,
    difficulty,
    isComplete,
    fetchPuzzle,
  };
}
