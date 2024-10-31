import Context from "./context";
import { useState } from "react";

const Provider = ({ children }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const toggleModal = () => {
    setIsNotifOpen(!isNotifOpen);
  };

  return (
    <Context.Provider value={{ isNotifOpen, setIsNotifOpen, toggleModal }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
