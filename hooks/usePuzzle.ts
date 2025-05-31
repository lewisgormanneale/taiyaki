import { useEffect, useState } from "react";
import {
  type Cell,
  formatBoard,
  lockBoard,
  validateBoard,
} from "../utils/sudoku-utils";

export function usePuzzle() {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [difficulty, setDifficulty] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerResetKey, setTimerResetKey] = useState(0);

  const fetchPuzzle = async ({ signal }: { signal?: AbortSignal } = {}) => {
    setIsComplete(false);
    setBoard([]);
    setDifficulty("");
    setIsTimerRunning(false);
    setTimerResetKey((prev) => prev + 1);

    const response = await fetch("https://sudoku-api.vercel.app/api/dosuku", {
      signal,
    });
    const json = await response.json();
    const grid = json.newboard.grids[0];

    setBoard(formatBoard(grid.value));
    setSolution(grid.solution);
    setDifficulty(grid.difficulty);
    setIsTimerRunning(true);
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
      setIsTimerRunning(false);
    }
  }, [board, solution, isComplete]);

  return {
    board,
    setBoard,
    difficulty,
    isComplete,
    isTimerRunning,
    timerResetKey,
    fetchPuzzle,
  };
}
