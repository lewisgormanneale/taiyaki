// src/components/MenuPopup.tsx
import * as React from "react";
import { useEffect, useRef } from "react";
import "./MenuPopup.css";
import { SquareArrowOutUpRight } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
};

export default function MenuPopup({ isOpen, onClose, anchorRef }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        ref.current &&
        !ref.current.contains(target) &&
        anchorRef &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  return (
    <div ref={ref} className="menu-popup" role="menu">
      <ul className="menu-popup-list">
        <li>
          <a
            className="menu-popup-link"
            role="menuitem"
            href="https://github.com/lewisgormanneale/taiyaki"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <SquareArrowOutUpRight size={16} />
          </a>
        </li>
        <li>
          <a
            className="menu-popup-link"
            role="menuitem"
            href="https://lewisgormanneale.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Portfolio
            <SquareArrowOutUpRight size={16} />
          </a>
        </li>
      </ul>
    </div>
  );
}
