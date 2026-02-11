import { useEffect, useRef, useState } from "react";
import PixelCanvas from "../canvas/PixelCanvas";
import { IntroScene } from "../scenes/IntroScene";
import { QuestionScene } from "../scenes/QuestionScene";
import { CelebrationScene } from "../scenes/CelebrationScene";
import type { Scene } from "../types/pixel";
import PixelButton from "./PixelButton";

const sceneList: Scene[] = [
  new IntroScene(),
  new QuestionScene(),
  new CelebrationScene(),
];

const TRANSITION_DELAY = 800; // 👈 pause after animation finishes

export default function SceneManager() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const sceneRef = useRef<Scene>(sceneList[0]);
  const transitionLock = useRef(false);

  useEffect(() => {
    sceneRef.current = sceneList[sceneIndex];
    transitionLock.current = false;
  }, [sceneIndex]);

  useEffect(() => {
    let rafId: number;

    const checkCompletion = () => {
      const scene = sceneRef.current;

      if (
        scene.isComplete &&
        !transitionLock.current &&
        (sceneIndex === 0 || sceneIndex === 2)
      ) {
        transitionLock.current = true;

        setTimeout(() => {
          setSceneIndex((i) => i + 1);
        }, TRANSITION_DELAY);

        return;
      }

      rafId = requestAnimationFrame(checkCompletion);
    };

    rafId = requestAnimationFrame(checkCompletion);
    return () => cancelAnimationFrame(rafId);
  }, [sceneIndex]);

  const handleYes = () => setSceneIndex(2);
  const handleNo = () => alert("You can’t say no! ❤️");

  return (
    <div style={{ position: "relative", width: 800, height: 300 }}>
      <PixelCanvas scene={sceneRef} />

      {sceneIndex === 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "16px",
          }}
        >
          <PixelButton label="Yes" onClick={handleYes} />
          <PixelButton label="No" onClick={handleNo} />
        </div>
      )}
    </div>
  );
}
