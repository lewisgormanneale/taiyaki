import ThemeToggle from "./ThemeToggle.tsx";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="menu-container">Menu</div>
      <div className="title-container">
        <img src="/assets/taiyaki.png" width={45} height={"auto"} alt="logo" />
        <h1 className="title">Taiyaki</h1>
      </div>
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
