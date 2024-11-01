import Navbar from "./Navbar";
import Board from "./Board";
import { useContext, useEffect } from "react";
import Context from "../context/context";
import Notification from "./Notification";

const Taskboard = () => {
  const { isNotifOpen } = useContext(Context);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      alert(`New Notification: ${notification.message}`);
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <div className="bg-custom-yellow h-screen">
        <Navbar />
        <Board />
        {isNotifOpen && <Notification />}
      </div>
    </div>
  );
};

export default Taskboard;
