import { useEffect, useRef, useState } from "react";
import PixelCanvas from "../canvas/PixelCanvas";
import IntroScene from "../scenes/IntroScene";
import QuestionScene from "../scenes/QuestionScene";
import CelebrationScene from "../scenes/CelebrationScene";
import type { Scene } from "../types/pixel";
import PixelButton from "./PixelButton";
import HeartWipe from "./HeartWipe";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const BUTTON_Y = 420;

const sceneList: Scene[] = [
  new IntroScene(),
  new QuestionScene(),
  new CelebrationScene(),
];

export default function SceneManager() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const sceneRef = useRef<Scene>(sceneList[0]);
  const transitionLock = useRef(false);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingSceneIndex, setPendingSceneIndex] = useState<number | null>(null);

  const [scale, setScale] = useState(1);

  const [noPosition, setNoPosition] = useState({
    x: CANVAS_WIDTH / 2 + 80,
    y: BUTTON_Y,
  });

  // 🔹 Responsive Scaling
  useEffect(() => {
    const updateScale = () => {
      const widthRatio = window.innerWidth / CANVAS_WIDTH;
      const heightRatio = window.innerHeight / CANVAS_HEIGHT;
      const newScale = Math.min(widthRatio, heightRatio, 1);
      setScale(newScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Keep sceneRef synced
  useEffect(() => {
    sceneRef.current = sceneList[sceneIndex];
    transitionLock.current = false;
  }, [sceneIndex]);

  const transitionToScene = (nextIndex: number) => {
    if (isTransitioning) return;
    setPendingSceneIndex(nextIndex);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    if (pendingSceneIndex !== null) {
      setSceneIndex(pendingSceneIndex);
      setPendingSceneIndex(null);
    }
    setIsTransitioning(false);
  };

  // Intro auto advance
  useEffect(() => {
    let rafId: number;

    const checkCompletion = () => {
      const scene = sceneRef.current;

      if (
        scene.isComplete &&
        !transitionLock.current &&
        sceneIndex === 0
      ) {
        transitionLock.current = true;
        transitionToScene(1);
        return;
      }

      rafId = requestAnimationFrame(checkCompletion);
    };

    rafId = requestAnimationFrame(checkCompletion);
    return () => cancelAnimationFrame(rafId);
  }, [sceneIndex]);

  const handleYes = () => {
    transitionToScene(2);
  };

  const moveNoButton = () => {
    const padding = 150;
    const randomX = Math.random() * (CANVAS_WIDTH - padding);
    const randomY = Math.random() * (CANVAS_HEIGHT - padding);
    setNoPosition({ x: randomX, y: randomY });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        overflow: "hidden",
      }}
    >
      {/* Scaled Game Container */}
      <div
        style={{
          position: "relative",
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <PixelCanvas scene={sceneRef} />

        {/* Question Scene Buttons */}
        {sceneIndex === 1 && (
          <>
            <div
              style={{
                position: "absolute",
                left: CANVAS_WIDTH / 2 - 200,
                top: BUTTON_Y,
              }}
            >
              <PixelButton label="Yes" onClick={handleYes} />
            </div>

            <div
              style={{
                position: "absolute",
                left: noPosition.x,
                top: noPosition.y,
                transition: "left 0.2s ease, top 0.2s ease",
              }}
              onMouseEnter={moveNoButton}
            >
              <PixelButton label="No" onClick={moveNoButton} />
            </div>
          </>
        )}

        <HeartWipe
          trigger={isTransitioning}
          onComplete={handleTransitionComplete}
          duration={1000}
        />
      </div>
    </div>
  );
}
