import { useContext } from "react";
import Context from "../context/context";
import useFetchNotifications from "../hooks/useFetchNotifications";
import { useMemo } from "react";

const Notification = () => {
  const { toggleModal } = useContext(Context);
  const { notifications, isLoading, error } = useFetchNotifications(
    "http://localhost:3070/notifications"
  );

  return (
    <div className=" h-full w-full fixed top-0 left-0 right-0 bottom-0 bg-custom-background flex justify-center ">
      <div className="flex flex-col h-4/5 bg-custom-yellow w-1/2 text-black mt-10 rounded-lg">
        <div className="flex justify-between items-center text-black bg-yellow-500 h-12 w-full rounded-t-lg px-2 ">
          <p className="text-xl font-semibold">Notifications</p>
          <p className="p-2 cursor-pointer" onClick={() => toggleModal()}>
            &#x274C;
          </p>
        </div>
        <div className="overflow-y-auto">
          {notifications
            .slice()
            .reverse()
            .map((notification) => {
              const isoTimestamp = notification.timestamp;
              const date = new Date(isoTimestamp);

              const hours = date.getHours().toString().padStart(2, "0");
              const minutes = date.getMinutes().toString().padStart(2, "0");

              const day = date.getDate().toString().padStart(2, "0");
              const month = (date.getMonth() + 1).toString().padStart(2, "0");

              const formattedDate = `${hours}:${minutes} - ${day}/${month}`;
              return (
                <div key={notification.id} className="p-3">
                  <p>
                    <strong>Task ID : {notification.task_id}</strong>
                  </p>
                  <p className="p-2 border-b-2 border-black">
                    <strong>{notification.message}</strong> assigned to:{" "}
                    <span className="text-emerald-600 font-medium">
                      {notification.assigned_to}
                    </span>{" "}
                    on {formattedDate}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Notification;
