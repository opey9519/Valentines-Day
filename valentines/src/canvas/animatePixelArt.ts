import type { PixelArt } from "../types/pixel";

export function animatePixelArt(
  ctx: CanvasRenderingContext2D,
  art: PixelArt,
  palette: Record<number, string>,
  pixelSize: number,
  rowDelay = 120,
  onComplete?: () => void
) {
  let currentRow = 0;

  const interval = setInterval(() => {
    if (currentRow >= art.length) {
      clearInterval(interval);
      onComplete?.();
      return;
    }

    art[currentRow].forEach((cell, x) => {
      if (cell !== 0) {
        ctx.fillStyle = palette[cell];
        ctx.fillRect(
          x * pixelSize,
          currentRow * pixelSize,
          pixelSize,
          pixelSize
        );
      }
    });

    currentRow++;
  }, rowDelay);

  return () => clearInterval(interval);
}
