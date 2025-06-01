import "./App.css";
import "../components/Sudoku/SudokuCell.css";
import Navbar from "../components/Navbar.tsx";
import Sudoku from "../components/Sudoku/Sudoku.tsx";

export default function App() {
  return (
    <>
      <header className="header">
        <Navbar />
      </header>
      <main className="main-content">
        <Sudoku />
      </main>
    </>
  );
}
