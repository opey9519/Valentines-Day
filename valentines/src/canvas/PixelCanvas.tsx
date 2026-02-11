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
      const delta = now - last; // compute delta in milliseconds
      last = now;

      scene.current.update(delta); // ✅ pass delta as required by Scene type
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      scene.current.draw(ctx);

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }, [scene]);

  return <canvas ref={canvasRef} width={800} height={300} />;
}
