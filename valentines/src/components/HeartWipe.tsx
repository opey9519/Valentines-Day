import React, { useEffect, useState } from "react";

interface HeartWipeProps {
  trigger: boolean;
  onComplete: () => void;
  duration?: number; // ms
}

const HeartWipe: React.FC<HeartWipeProps> = ({
  trigger,
  onComplete,
  duration = 1000,
}) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      setActive(true);
      const timer = setTimeout(() => {
        onComplete();
        setActive(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [trigger, duration, onComplete]);

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "black",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: `fadeIn ${duration}ms forwards`,
      }}
    >
      <div
        style={{
          width: "150vmax",
          height: "150vmax",
          background: "#ff2e63",
          clipPath:
            "path('M 50 15 C 35 -10, 0 5, 25 35 L 50 60 L 75 35 C 100 5, 65 -10, 50 15 Z')",
          transform: "scale(0)",
          animation: `heartGrow ${duration}ms ease-in-out forwards`,
        }}
      />

      <style>
        {`
        @keyframes heartGrow {
          0% { transform: scale(0); }
          100% { transform: scale(20); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}
      </style>
    </div>
  );
};

export default HeartWipe;
