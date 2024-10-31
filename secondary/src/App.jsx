import Provider from "./context/provider";
import Taskboard from "./components/Taskboard";

function App() {
  return (
    <Provider>
      <Taskboard />
    </Provider>
  );
}

export default App;
