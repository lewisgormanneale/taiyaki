import { memo, useCallback, useMemo } from "react";
import type { Cell } from "../../types/sudoku";
import styles from "./SudokuCell.module.css";

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
  const cssClasses = useMemo(() => {
    const classes = [styles.sudokuCell];
    if (cell.locked) classes.push(styles.locked);
    if (focused) classes.push(styles.highlightFocus);
    if (inRow) classes.push(styles.highlightRow);
    if (inCol) classes.push(styles.highlightCol);
    if (inBox) classes.push(styles.highlightBox);
    return classes.join(" ");
  }, [cell.locked, focused, inRow, inCol, inBox]);

  const cellId = useMemo(() => `r${row + 1}c${col + 1}`, [row, col]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <input
      id={cellId}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={cell.value ?? ""}
      onFocus={onFocus}
      onChange={handleChange}
      disabled={cell.locked}
      className={cssClasses}
    />
  );
}

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
