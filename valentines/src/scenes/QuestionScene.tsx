import type { Scene } from "../types/pixel";

export class QuestionScene implements Scene {
  isComplete = false;

  update() {
    // Waiting for user interaction — nothing to do here yet
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#ff4d6d";
    ctx.font = "32px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText("Will you be my Valentine?", ctx.canvas.width / 2, ctx.canvas.height / 2);
  }
}
