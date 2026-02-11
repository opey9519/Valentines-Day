import React from "react";
import "../styles/PixelButton.css";

interface PixelButtonProps {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

export default function PixelButton({ label, onClick }: PixelButtonProps) {
  return (
    <button
      className="pixel-button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
