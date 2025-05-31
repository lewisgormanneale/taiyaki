import { useEffect } from "react";

export function usePuzzleNavigation(
  focusedCell: { row: number; col: number } | null,
  setFocusedCell: (cell: { row: number; col: number }) => void,
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!focusedCell) return;
      let { row, col } = focusedCell;

      switch (e.key) {
        case "ArrowUp":
          row = Math.max(0, row - 1);
          break;
        case "ArrowDown":
          row = Math.min(8, row + 1);
          break;
        case "ArrowLeft":
          col = Math.max(0, col - 1);
          break;
        case "ArrowRight":
          col = Math.min(8, col + 1);
          break;
        default:
          return;
      }

      const nextId = `r${row + 1}c${col + 1}`;
      const nextInput = document.getElementById(
        nextId,
      ) as HTMLInputElement | null;
      if (nextInput) nextInput.focus();
      setFocusedCell({ row, col });
      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedCell, setFocusedCell]);
}
