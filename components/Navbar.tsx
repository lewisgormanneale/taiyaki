import ThemeToggle from "./ThemeToggle.tsx";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="menu">Menu</div>
      <h1 className="title">Taiyaki</h1>
      <div className="theme-toggle">
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
