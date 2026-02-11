export type PixelArt = number[][];

export interface Scene {
  update(delta: number): void;       // Update animation state
  draw(ctx: CanvasRenderingContext2D): void; // Draw to canvas
  isComplete?: boolean;              // Signals scene completion
}
