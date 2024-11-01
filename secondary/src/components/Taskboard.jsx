import Navbar from "./Navbar";
import Board from "./Board";
import { useContext, useEffect } from "react";
import Context from "../context/context";
import Notification from "./Notification";

const Taskboard = ({ trigger }) => {
  const { isNotifOpen } = useContext(Context);
  return (
    <div>
      <div className="bg-custom-yellow h-screen">
        <Navbar />
        <Board trigger={trigger} />
        {isNotifOpen && <Notification />}
      </div>
    </div>
  );
};

export default Taskboard;
