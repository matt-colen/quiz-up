import "./App.css";
import StartScreen from "./components/StartScreen/StartScreen.jsx";

export default function App() {
  return (
    <main className="main">
      <div className="blob blob--right"></div>
      <StartScreen />
      <div className="blob blob--left"></div>
    </main>
  );
}
