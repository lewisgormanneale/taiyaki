import "./App.css";
import Navbar from "../components/Navbar.tsx";
import Sudoku from "../components/Sudoku.tsx";

function App() {
  return (
    <>
      <header className="h-16">
        <Navbar />
      </header>
      <main className="flex flex-col items-center justify-center w-full">
        <Sudoku />
      </main>
    </>
  );
}

export default App;
