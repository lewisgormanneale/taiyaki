import * as React from "react";
import { memo, useCallback } from "react";
import { type Cell } from "../../utils/sudoku-utils";
import "./SudokuControls.css";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

type Props = {
  focusedCell: { row: number; col: number } | null;
  setFocusedCell: (pos: { row: number; col: number }) => void;
  board: Cell[][];
  setBoard: React.Dispatch<React.SetStateAction<Cell[][]>>;
};

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

function SudokuControls({
  focusedCell,
  setFocusedCell,
  board,
  setBoard,
}: Props) {
  const moveFocus = useCallback(
    (dr: number, dc: number) => {
      if (!focusedCell) return;

      const newRow = Math.max(0, Math.min(8, focusedCell.row + dr));
      const newCol = Math.max(0, Math.min(8, focusedCell.col + dc));

      setFocusedCell({ row: newRow, col: newCol });

      const nextId = `r${newRow + 1}c${newCol + 1}`;
      const el = document.getElementById(nextId) as HTMLInputElement | null;
      el?.focus();
    },
    [focusedCell, setFocusedCell],
  );

  const inputValue = useCallback(
    (val: number | null) => {
      if (!focusedCell || !board.length) return;
      const { row, col } = focusedCell;
      const cell = board[row]?.[col];
      if (!cell || cell.locked) return;
      setBoard((prev) => {
        const newBoard = prev.map((r) => [...r]);
        newBoard[row][col] = {
          ...newBoard[row][col],
          value: val,
        };
        return newBoard;
      });
    },
    [focusedCell, board, setBoard],
  );

  const isDisabled = !focusedCell || !board.length;
  const isCellLocked = Boolean(
    focusedCell && board[focusedCell.row]?.[focusedCell.col]?.locked,
  );

  return (
    <div className="sudoku-controls">
      <div className="number-buttons">
        {NUMBERS.map((number) => (
          <button
            key={number}
            className="control-button"
            onClick={() => inputValue(number)}
            disabled={isDisabled || isCellLocked}
            aria-label={`Enter ${number}`}
          >
            {number}
          </button>
        ))}
        <button
          className="control-button delete-button"
          onClick={() => inputValue(null)}
          disabled={isDisabled || isCellLocked}
          aria-label="Delete value"
        >
          ⌫
        </button>
      </div>

      <div className="arrow-buttons">
        <div className="arrow-row">
          <button
            className="control-button"
            onClick={() => moveFocus(-1, 0)}
            disabled={isDisabled}
            aria-label="Move up"
          >
            <ArrowUp size={16} />
          </button>
        </div>
        <div className="arrow-row">
          <button className="control-button" onClick={() => moveFocus(0, -1)}>
            <ArrowLeft size={16} />
          </button>
          <button className="control-button" onClick={() => moveFocus(1, 0)}>
            <ArrowDown size={16} />
          </button>
          <button className="control-button" onClick={() => moveFocus(0, 1)}>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(SudokuControls);
