import Provider from "./context/provider";
import Taskboard from "./components/Taskboard";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      const notificationData = JSON.parse(event.data);
      alert(`Notification: ${notificationData.message}`);
      console.log(`Received notification: ${notificationData.message}`);
    };
  }, []);
  return (
    <Provider>
      <Taskboard />
    </Provider>
  );
}

export default App;
