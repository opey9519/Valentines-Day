import SceneManager from "./components/SceneManager";
import "./styles/globals.css";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9e1ea",
      }}
    >
      <h1
        style={{
          color: "#a8dadc",
          fontFamily: "'Press Start 2P', monospace",
          marginBottom: "20px",
        }}
      >
        💌 My Valentine Project 💌
      </h1>

      <SceneManager />
    </div>
  );
}

export default App;
