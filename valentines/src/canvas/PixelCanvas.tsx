import { useEffect, useRef } from "react";
import type { Scene } from "../types/pixel";

interface Props {
  scene: React.MutableRefObject<Scene>;
}

export default function PixelCanvas({ scene }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    let last = performance.now();

    function loop(now: number) {
      const delta = now - last; // milliseconds
      last = now;

      scene.current.update(delta); // update scene
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      scene.current.draw(ctx); // draw scene

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }, [scene]);

  // Important: height must match CelebrationScene
  return <canvas ref={canvasRef} width={800} height={600} />;
}
