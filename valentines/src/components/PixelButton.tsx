import React from "react";

interface PixelButtonProps {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

export default function PixelButton({ label, onClick, style }: PixelButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "14px",
        padding: "10px 20px",
        margin: "5px",
        border: "3px solid #ff4d6d",
        backgroundColor: "#fff",
        color: "#ff4d6d",
        cursor: "pointer",
        ...style,
      }}
    >
      {label}
    </button>
  );
}
