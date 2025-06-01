import type { Cell } from "../../types/sudoku";
import "./SudokuCell.css";

type Props = {
  row: number;
  col: number;
  cell: Cell;
  focused: boolean;
  inRow: boolean;
  inCol: boolean;
  inBox: boolean;
  onFocus: () => void;
  onChange: (val: string) => void;
};

export default function SudokuCell({
  row,
  col,
  cell,
  focused,
  inRow,
  inCol,
  inBox,
  onFocus,
  onChange,
}: Props) {
  return (
    <input
      id={`r${row + 1}c${col + 1}`}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={cell.value ?? ""}
      onFocus={onFocus}
      onChange={(e) => onChange(e.target.value)}
      disabled={cell.locked}
      className={`sudoku-cell ${cell.locked ? "locked" : ""} ${focused ? "highlight-focus" : ""} ${inRow ? "highlight-row" : ""} ${inCol ? "highlight-col" : ""} ${inBox ? "highlight-box" : ""}`}
    />
  );
}
