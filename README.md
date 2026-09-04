# Valentine's Day

An interactive pixel-art Valentine's Day greeting card built with React and HTML5 Canvas.

## Screenshot

<!-- Add a screenshot or GIF here -->
<!-- ![Demo](./screenshot.png) -->

## About

A scene-based web experience that walks through three stages:

1. **Heart Reveal** — A pixel-art heart is drawn row-by-row on a canvas
2. **The Question** — "Will you be my Valentine?" types out character by character with two buttons: Yes and No
3. **Celebration** — A heart-shaped wipe transition leads to a confetti-filled scene with floating particles and "I love you!"

The "No" button playfully runs away to a random position whenever hovered or clicked, making it impossible to press.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- HTML5 Canvas (2D rendering)
- CSS (pixel-art styled UI)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── canvas/          # Canvas rendering utilities and game loop
├── components/      # React components (scene manager, buttons, transitions)
├── scenes/          # Scene implementations (intro, question, celebration)
├── assets/          # Pixel art data and palettes
├── types/           # TypeScript type definitions
└── styles/          # CSS files
```

## License

MIT
