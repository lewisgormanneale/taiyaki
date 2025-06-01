import type { Cell, Difficulty } from "../types/sudoku.ts";

export function formatBoard(grid: number[][]): Cell[][] {
  return grid.map((row) =>
    row.map((cell) => ({
      value: cell === 0 ? null : cell,
      locked: cell !== 0,
    })),
  );
}

export function lockBoard(board: Cell[][]): Cell[][] {
  return board.map((row) =>
    row.map((cell) => ({
      ...cell,
      locked: true,
    })),
  );
}

export function validateBoard(board: Cell[][], solution: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = board[row][col];
      if (!cell.value || cell.value !== solution[row][col]) {
        return false;
      }
    }
  }
  return true;
}

export const getDifficultyConfig = (difficulty: Difficulty) => {
  const configs = {
    Easy: { flameCount: 1, flameColor: "green" },
    Medium: { flameCount: 2, flameColor: "orange" },
    Hard: { flameCount: 3, flameColor: "red" },
  } as const;
  if (difficulty && difficulty in configs) {
    return configs[difficulty];
  }
  return { flameCount: 0, flameColor: "gray" };
};
