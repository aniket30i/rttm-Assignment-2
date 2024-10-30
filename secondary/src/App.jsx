import "./App.css";
import Navbar from "./components/Navbar";
import Board from "./components/Board";

function App() {
  return (
    <div className="bg-custom-yellow h-screen">
      <Navbar />
      <Board />
    </div>
  );
}

export default App;
