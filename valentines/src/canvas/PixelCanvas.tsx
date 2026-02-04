import { useEffect, useRef } from "react";
import { heart } from "../assets/pixel-art/heart";
import { palette } from "../assets/pixel-art/palette";
import { drawPixelArt } from "./drawPixelArt";
import { getCanvasSize } from "./getCanvasSize";

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
    drawPixelArt(ctx, heart, palette, PIXEL_SIZE);
  }, []);

  return <canvas ref={canvasRef} />;
}
