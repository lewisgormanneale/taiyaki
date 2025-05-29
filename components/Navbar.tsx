import ThemeToggle from "./ThemeToggle.tsx";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div>Menu</div>
      <h1 className="title">Taiyaki</h1>
      <ThemeToggle />
    </nav>
  );
}

export default Navbar;
