import ThemeToggle from "./ThemeToggle.tsx";
import "./Navbar.css";
import { Menu } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="menu-container">
        <button className="icon-button" onClick={toggleMenu}>
          <Menu size={20} />
        </button>
      </div>
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
