import SudokuCell from "./SudokuCell";
import type { Cell } from "../../types/sudoku";
import "./SudokuGrid.css";

type Props = {
  board: Cell[][];
  focusedCell: { row: number; col: number } | null;
  setFocusedCell: (cell: { row: number; col: number }) => void;
  handleChange: (row: number, col: number, val: string) => void;
};

export default function SudokuGrid({
  board,
  focusedCell,
  setFocusedCell,
  handleChange,
}: Props) {
  return (
    <div className="sudoku-grid">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const focused =
            focusedCell?.row === rowIndex && focusedCell?.col === colIndex;
          const inRow = focusedCell?.row === rowIndex;
          const inCol = focusedCell?.col === colIndex;
          const inBox =
            focusedCell &&
            Math.floor(focusedCell.row / 3) === Math.floor(rowIndex / 3) &&
            Math.floor(focusedCell.col / 3) === Math.floor(colIndex / 3);

          return (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              cell={cell}
              focused={!!focused}
              inRow={!!inRow}
              inCol={!!inCol}
              inBox={!!inBox}
              onFocus={() => setFocusedCell({ row: rowIndex, col: colIndex })}
              onChange={(val) => handleChange(rowIndex, colIndex, val)}
            />
          );
        }),
      )}
    </div>
  );
}
