export function drawPixelArt(
  ctx: CanvasRenderingContext2D,
  art: number[][],
  palette: Record<number, string>,
  pixelSize: number
) {
  art.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== 0) {
        ctx.fillStyle = palette[cell];
        ctx.fillRect(
          x * pixelSize,
          y * pixelSize,
          pixelSize,
          pixelSize
        );
      }
    });
  });
}
