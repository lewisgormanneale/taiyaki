import { type Cell } from "../../utils/sudoku-utils";
import * as React from "react";
import "./SudokuControls.css";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

type Props = {
  focusedCell: { row: number; col: number } | null;
  setFocusedCell: (pos: { row: number; col: number }) => void;
  board: Cell[][];
  setBoard: React.Dispatch<React.SetStateAction<Cell[][]>>;
};

const SudokuControls = ({
  focusedCell,
  setFocusedCell,
  board,
  setBoard,
}: Props) => {
  const moveFocus = (dr: number, dc: number) => {
    if (!focusedCell) return;
    const newRow = Math.max(0, Math.min(8, focusedCell.row + dr));
    const newCol = Math.max(0, Math.min(8, focusedCell.col + dc));
    setFocusedCell({ row: newRow, col: newCol });
    const nextId = `r${newRow + 1}c${newCol + 1}`;
    const el = document.getElementById(nextId) as HTMLInputElement | null;
    if (el) el.focus();
  };

  const inputValue = (val: number | null) => {
    if (!focusedCell || !board.length) return;
    const { row, col } = focusedCell;
    if (board[row][col].locked) return;
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = {
      ...newBoard[row][col],
      value: val,
    };
    setBoard(newBoard);
  };

  return (
    <div className="sudoku-controls">
      <div className="number-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            className="control-button"
            key={n}
            onClick={() => inputValue(n)}
          >
            {n}
          </button>
        ))}
        <button
          className="control-button delete-button"
          onClick={() => inputValue(null)}
        >
          ⌫
        </button>
      </div>
      <div className="arrow-buttons">
        <div className="arrow-row">
          <button className="control-button" onClick={() => moveFocus(-1, 0)}>
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
};

export default SudokuControls;
