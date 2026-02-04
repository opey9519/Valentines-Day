import { useEffect, useRef } from "react";
import { heart } from "../assets/pixel-art/heart";
import { palette } from "../assets/pixel-art/palette";
import { getCanvasSize } from "./getCanvasSize";
import { animatePixelArt } from "./animatePixelArt";

const PIXEL_SIZE = 20;

export default function PixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    const { width, height } = getCanvasSize(heart, PIXEL_SIZE);
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    const cleanup = animatePixelArt(
      ctx,
      heart,
      palette,
      PIXEL_SIZE,
      120,
      () => {
        console.log("Animation complete");
      }
    );

    return cleanup;
  }, []);

  return <canvas ref={canvasRef} />;
}
