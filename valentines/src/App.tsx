import PixelCanvas from "./canvas/PixelCanvas";
import "./styles/globals.css";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <PixelCanvas />
    </main>
  );
}

export default App;
