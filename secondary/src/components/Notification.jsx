import { useContext } from "react";
import Context from "../context/context";
import useFetchNotifications from "../hooks/useFetchNotifications";


const Notification = () => {
  const { toggleModal } = useContext(Context);
  const {notifications , isLoading , error} = useFetchNotifications("http://localhost:3070/notifications");
  return (
    <div className=" h-full w-full fixed top-0 left-0 right-0 bottom-0 bg-custom-background flex justify-center ">
      <div className="flex flex-col h-4/5 bg-custom-yellow w-1/2 text-black mt-10 rounded-lg">
        <div className="flex justify-end text-black bg-yellow-500 h-12 w-full rounded-lg border-2 border-black">
          <p className="p-2 cursor-pointer" onClick={() => toggleModal()}>
            &#x274C;
          </p>
        </div>
        {
          notifications.map((notification) => {
            return (
        }
      </div>
    </div>
  );
};

export default Notification;
