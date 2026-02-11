import type { Scene } from "../types/pixel";

export class CelebrationScene implements Scene {
  private timer = 0;
  isComplete = false;

  update() {
    this.timer++;
    if (this.timer > 300) this.isComplete = true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#ffb3c6";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
