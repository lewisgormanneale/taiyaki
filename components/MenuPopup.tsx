// src/components/MenuPopup.tsx
import { useEffect, useRef } from "react";
import "./MenuPopup.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement> | null;
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
    <div ref={ref} className="menu-popup">
      <a
        className="menu-popup-link"
        href="https://github.com/lewisgormanneale"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a
        className="menu-popup-link"
        href="https://lewisgormanneale.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Portfolio
      </a>
    </div>
  );
}
