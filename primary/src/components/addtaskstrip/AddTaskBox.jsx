import { useState } from "react";
import useTaskAction from "../../hooks/useTaskAction";
import { sendNotification } from "../../functions/sendNotification";

const AddTaskBox = ({ setAddClicked }) => {
  const { addTask } = useTaskAction("http://localhost:3080/tasks");
  const [newTask, setNewTask] = useState({
    id: "",
    task: "",
    status: "pending",
    assigned_to: "",
    timestamp: new Date().toISOString(),
    deadline: "",
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(newTask);
    sendNotification({
      task: newTask.task,
      message: "New task has been added - check board for info",
      task_id: newTask.id,
      assigned_to: newTask.assigned_to,
      timestamp: new Date().toISOString(),
      // timestamp: newTask.timestamp,
      // deadline:newTask.deadline
    });
    setNewTask({
      id: "",
      task: "",
      status: "pending",
      assigned_to: "",
      // timestamp: "",
    });
    setAddClicked(false);
  };
  return (
    <div>
      <div className="bg-amber-200 p-2 rounded-lg">
        <form
          onSubmit={handleAddTask}
          className="flex justify-center gap-2  xs:flex-col lg:flex-row"
        >
          <input
            type="text"
            placeholder="Unique ID - [10xxx]"
            className="inputUtil"
            value={newTask.id}
            onChange={(e) => setNewTask({ ...newTask, id: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Task "
            className="inputUtil"
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Status"
            className="inputUtil"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Assigned To [AAPXXX]"
            className="inputUtil"
            value={newTask.assigned_to}
            onChange={(e) =>
              setNewTask({ ...newTask, assigned_to: e.target.value })
            }
            required
          />
          <input
            type="date"
            className="inputUtil"
            value={newTask.deadline}
            onChange={(e) =>
              setNewTask({ ...newTask, deadline: e.target.value })
            }
          />
          <button
            className="p-2 bg-emerald-600 hover:bg-emerald-700 text-slate-100 font-semibold rounded-lg"
            type="submit"
          >
            Add Task
          </button>
          <button
            className="p-2 bg-gray-500 hover:bg-gray-600 rounded-lg font-semibold text-slate-100"
            onClick={() => setAddClicked(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskBox;
