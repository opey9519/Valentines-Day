import "../styles/App.css";
import { heart } from "../assets/pixel-art/heart";
import { palette } from "../assets/pixel-art/palette";
import { drawPixelArt } from "../canvas/drawPixelArt";

interface PixelParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
}

export default class CelebrationScene {
  isComplete = false;
  private PIXEL_SIZE = 12;
  private particles: PixelParticle[] = [];

  constructor() {
    const colors = ["#ff4d6d", "#ff85a1", "#ffd6e0", "#ffffff"];
    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        size: 6,
        speed: 1 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  update(_: number) {
    this.particles.forEach(p => {
      p.y -= p.speed;
      if (p.y < -10) {
        p.y = 610;
        p.x = Math.random() * 800;
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Pixel background
    ctx.fillStyle = "#1d2d44";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw confetti
    this.particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    // Draw big pixel heart
    const artWidth = heart[0].length * this.PIXEL_SIZE;
    const artHeight = heart.length * this.PIXEL_SIZE;
    const offsetX = (canvasWidth - artWidth) / 2;
    const offsetY = canvasHeight / 2 - artHeight / 2 - 60;

    ctx.save();
    ctx.translate(offsetX, offsetY);
    drawPixelArt(ctx, heart, palette, this.PIXEL_SIZE);
    ctx.restore();

    // Pixel text
    ctx.fillStyle = "#ff85a1";
    ctx.font = "3em 'Press Start 2P', monospace";
    ctx.textAlign = "center";
    ctx.fillText("I love you!", canvasWidth / 2, canvasHeight - 90);
  }
}
