import type { PixelArt } from "../types/pixel";

export function getCanvasSize(
  art: PixelArt,
  pixelSize: number
) {
  return {
    width: art[0].length * pixelSize,
    height: art.length * pixelSize,
  };
}
