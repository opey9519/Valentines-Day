import type { Scene } from "../types/pixel";

export default class QuestionScene implements Scene {
  isComplete = false;

  private fullText = "Will you be my Valentine?";
  private visibleText = "";
  private charIndex = 0;

  // Typing control
  private elapsed = 0;
  private CHAR_DELAY = 100;

  // Cursor blink control
  private cursorVisible = true;
  private cursorElapsed = 0;
  private CURSOR_BLINK_DELAY = 500;

  update(delta: number) {
    // Typing animation
    if (this.charIndex < this.fullText.length) {
      this.elapsed += delta;

      if (this.elapsed >= this.CHAR_DELAY) {
        this.elapsed = 0;
        this.visibleText += this.fullText[this.charIndex];
        this.charIndex++;
      }
    }

    // Cursor blinking
    this.cursorElapsed += delta;
    if (this.cursorElapsed >= this.CURSOR_BLINK_DELAY) {
      this.cursorElapsed = 0;
      this.cursorVisible = !this.cursorVisible;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    ctx.save();

    ctx.fillStyle = "#ff4d6d";
    ctx.font = "28px 'Press Start 2P', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const cursor =
      this.cursorVisible && this.charIndex < this.fullText.length
        ? "|"
        : "";

    ctx.fillText(
      this.visibleText + cursor,
      canvasWidth / 2,
      canvasHeight / 2 - 50
    );

    ctx.restore();
  }
}
