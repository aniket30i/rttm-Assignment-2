import Provider from "./context/provider";
import Taskboard from "./components/Taskboard";
import { useState, useEffect } from "react";

function App() {
  const [updateTrigger, setUpdateTrigger] = useState(0);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      const notificationData = JSON.parse(event.data);
      alert(`Notification: ${notificationData.message}`);
      console.log(`Received notification: ${notificationData.message}`);
      setUpdateTrigger((prev) => prev + 1);
    };

    return () => {
      ws.close();
    };
  }, []);
  return (
    <Provider>
      <Taskboard trigger={updateTrigger} />
    </Provider>
  );
}

export default App;
