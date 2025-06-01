import { memo } from "react";
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

function SudokuCell({
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
  const cssClasses = [
    "sudoku-cell",
    cell.locked && "locked",
    focused && "highlight-focus",
    inRow && "highlight-row",
    inCol && "highlight-col",
    inBox && "highlight-box",
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      id={`r${row + 1}c${col + 1}`}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={cell.value ?? ""}
      onFocus={onFocus}
      onChange={handleChange}
      disabled={cell.locked}
      className={cssClasses}
      aria-label={`Row ${row + 1}, Column ${col + 1}`}
    />
  );
}

export default memo(SudokuCell);
