import ThemeToggle from "./ThemeToggle.tsx";
import "./Navbar.css";
import { Menu } from "lucide-react";
import { useRef, useState } from "react";
import MenuPopup from "./MenuPopup.tsx";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="menu-container">
        <button
          ref={menuButtonRef}
          className="icon-button"
          onClick={toggleMenu}
        >
          <Menu size={20} />
        </button>
        <MenuPopup
          isOpen={isMenuOpen}
          onClose={closeMenu}
          anchorRef={menuButtonRef}
        />
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
