import Navbar from "./Navbar";
import Board from "./Board";
import { useContext } from "react";
import Context from "../context/context";
import Notification from "./Notification";

const Taskboard = () => {
  const { isNotifOpen, setIsNotifOpen } = useContext(Context);
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
