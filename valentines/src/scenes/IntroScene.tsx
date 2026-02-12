import type { Scene } from "../types/pixel";
import { heart } from "../assets/pixel-art/heart";
import { palette } from "../assets/pixel-art/palette";
import { drawPixelArt } from "../canvas/drawPixelArt";

export default class IntroScene implements Scene {
  private currentRow = 0;
  private elapsed = 0;

  private PIXEL_SIZE = 20;
  private ROW_DELAY = 120;

  isComplete = false;

  update(delta: number) {
    if (this.isComplete) return;

    this.elapsed += delta;

    if (this.elapsed >= this.ROW_DELAY) {
      this.elapsed = 0;
      this.currentRow++;

      if (this.currentRow > heart.length) {
        this.isComplete = true;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const rows = heart.slice(0, this.currentRow);
    if (rows.length === 0) return;

    const artWidth = rows[0].length * this.PIXEL_SIZE;
    const artHeight = rows.length * this.PIXEL_SIZE;

    const offsetX = (ctx.canvas.width - artWidth) / 2;
    const offsetY = (ctx.canvas.height - artHeight) / 2;

    ctx.save();
    ctx.translate(offsetX, offsetY);
    drawPixelArt(ctx, rows, palette, this.PIXEL_SIZE);
    ctx.restore();
  }
}
