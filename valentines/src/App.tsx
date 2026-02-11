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
      <SceneManager />
    </div>
  );
}

export default App;
