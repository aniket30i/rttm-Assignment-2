import useTaskAction from "../hooks/useTaskAction";
import edit from "../assets/icons/edit.png";
import del from "../assets/icons/del.png";
import { useState } from "react";
import AddTaskBox from "./addtaskmodal/AddTaskBox";
const TaskManagement = () => {
  const { tasks, isLoading, error, updateTask, deleteTask } = useTaskAction(
    "http://localhost:3080/tasks"
  );

  const [editingTask, setEditingTask] = useState(null);
  const [addClicked, setAddClicked] = useState(false);

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteTask(id);
    }
  };

  const handleUpdateTask = (task) => {
    updateTask(task);
    setEditingTask(null);
  };
  return (
    <>
      <div className="overflow-x-auto w-2/3 ml-auto mr-auto">
        <div className="my-4">
          {addClicked ? (
            <AddTaskBox setAddClicked={setAddClicked} />
          ) : (
            <button
              className="p-2 bg-cyan-500 text-white rounded flex items-center"
              onClick={() => setAddClicked(true)}
            >
              <span className="text-xl text-center">+</span> Add New Task
            </button>
          )}
        </div>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <td>Serial</td>
              <td>Task ID</td>
              <td>Task</td>
              <td>Status</td>
              <td>Assigned To</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={tasks.id}>
                <td>{index + 1}</td>
                <td>{task.id}</td>
                <td>{task.task}</td>
                <td>{task.status}</td>
                <td>{task.assigned_to}</td>

                <td>
                  <div className="flex gap-2">
                    <img
                      src={edit}
                      alt="edit"
                      className="h-7  hover:bg-blue-300"
                      onClick={() => setEditingTask(task)}
                    />
                    <img
                      src={del}
                      alt="delete"
                      className="h-7 hover:bg-zinc-900"
                      onClick={() => handleDeleteTask(task.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {editingTask && (
          <form
            onSubmit={handleUpdateTask}
            className="flex gap-4 p-4 bg-neutral-700 justify-center w-screen translate-y-[]"
          >
            <input
              type="text"
              className="inputUtil"
              placeholder="Task"
              value={editingTask.task}
              onChange={(e) =>
                setEditingTask({ ...editingTask, task: e.target.value })
              }
              required
            />
            <input
              type="email"
              className="inputUtil"
              placeholder="Status"
              value={editingTask.status}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  status: e.target.value,
                })
              }
              required
            />
            <input
              type="Assigned To"
              className="inputUtil"
              placeholder="Assigned To"
              value={editingTask.assigned_to}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  assigned_to: e.target.value,
                })
              }
              required
            />
            <button
              type="submit"
              className="p-2 bg-emerald-600 hover:bg-emerald-700 text-slate-100 font-semibold rounded-lg"
            >
              Update
            </button>
            <button
              type="button"
              className="p-2 bg-emerald-600 hover:bg-emerald-700 text-slate-100 font-semibold rounded-lg"
              onClick={() => setEditingEmployee(null)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default TaskManagement;
