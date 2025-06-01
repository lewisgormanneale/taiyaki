import { memo, useCallback } from "react";
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
  let cssClasses = "sudoku-cell";
  if (cell.locked) cssClasses += " locked";
  if (focused) cssClasses += " highlight-focus";
  if (inRow) cssClasses += " highlight-row";
  if (inCol) cssClasses += " highlight-col";
  if (inBox) cssClasses += " highlight-box";

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const handleFocus = useCallback(() => {
    onFocus();
  }, [onFocus]);

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[1-9]"
      maxLength={1}
      value={cell.value || ""}
      className={"sudoku-cell" + cssClasses}
      readOnly={cell.locked}
      onFocus={handleFocus}
      onChange={handleChange}
      data-row={row}
      data-col={col}
      aria-label={`Cell ${row + 1}, ${col + 1}`}
    />
  );
}

// Custom comparison function for memo
const areEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.row === nextProps.row &&
    prevProps.col === nextProps.col &&
    prevProps.cell.value === nextProps.cell.value &&
    prevProps.cell.locked === nextProps.cell.locked &&
    prevProps.focused === nextProps.focused &&
    prevProps.inRow === nextProps.inRow &&
    prevProps.inCol === nextProps.inCol &&
    prevProps.inBox === nextProps.inBox
  );
};

export default memo(SudokuCell, areEqual);
