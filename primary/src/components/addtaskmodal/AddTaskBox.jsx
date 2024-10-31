import { useState } from "react";
import useTaskAction from "../../hooks/useTaskAction";

const AddTaskBox = ({ setAddClicked }) => {
  const { addTask } = useTaskAction("http://localhost:3080/tasks");
  const [newTask, setNewTask] = useState({
    id: "",
    task: "",
    status: "pending",
    assigned_to: "",
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask({
      id: "",
      task: "",
      status: "pending",
      assigned_to: "",
    });
    setAddClicked(false);
  };
  return (
    <div>
      <div className="bg-yellow-400 p-2 rounded-lg">
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
          <button
            className="p-2 bg-emerald-600 hover:bg-emerald-700 text-slate-100 font-semibold rounded-lg"
            type="submit"
          >
            Add Task
          </button>
          <button
            className="p-2 bg-gray-500 rounded-lg font-semibold text-slate-100"
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
