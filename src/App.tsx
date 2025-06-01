import "./App.css";
import Navbar from "../components/Navbar.tsx";
import Sudoku from "../components/Sudoku/Sudoku.tsx";

function App() {
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

export default App;
