export type Cell = {
  value: number | null;
  locked: boolean;
};

export function formatBoard(grid: number[][]): Cell[][] {
  return grid.map((row) =>
    row.map((cell) => ({
      value: cell === 0 ? null : cell,
      locked: cell !== 0,
    })),
  );
}
