import useTaskAction from "../hooks/useTaskAction";
import edit from "../assets/icons/edit.png";
import del from "../assets/icons/del.png";
import { useEffect, useState } from "react";
import AddTaskBox from "./addtaskmodal/AddTaskBox";
import { sendNotification } from "../functions/sendNotification";

const TaskManagement = () => {
  const { tasks, isLoading, error, updateTask, deleteTask } = useTaskAction(
    "http://localhost:3080/tasks"
  );

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleSearch = (query) => {
    setSearchedQuery(query);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesSearch = task.assigned_to
      .toLowerCase()
      .includes(searchedQuery.toLowerCase());

    return searchedQuery && statusFilter !== "all"
      ? matchesStatus && matchesSearch
      : searchedQuery
      ? matchesSearch
      : matchesStatus;
  });

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginated = filteredTasks.slice(startIndex, endIndex);

  const handleNext = () =>
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  const handlePrev = () => setCurrentPage(Math.max(currentPage - 1, 1));

  const [editingTask, setEditingTask] = useState(null);
  const [addClicked, setAddClicked] = useState(false);

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteTask(id);
    }
  };

  useEffect(() => {}, [addClicked]);

  const handleUpdateTask = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(editingTask);
      sendNotification({
        task: editingTask.task,
        message: "Task has been Update - check board for info",
        task_id: editingTask.id,
        assigned_to: editingTask.assigned_to,
        timestamp: new Date().toISOString(),
      });
      setEditingTask(null);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="overflow-x-auto w-2/3 ml-auto mr-auto">
        <div className="my-4">
          {addClicked ? (
            <AddTaskBox setAddClicked={setAddClicked} />
          ) : (
            <div className="flex gap-2 xs:flex-col lg:flex-row">
              <button
                className="p-2 bg-amber-500 text-white rounded flex items-center"
                onClick={() => setAddClicked(true)}
              >
                <span className="text-xl text-center">+</span> Add New Task
              </button>
              <input
                type="text"
                className="inputUtil border-2 border-yellow-400 focus:outline-none focus:ring"
                placeholder="Search by Task Assignee"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <select
                className="inputUtil border-2 border-yellow-400"
                onChange={handleStatusFilter}
              >
                <option value="all" className="bg-amber-400 ">
                  All
                </option>
                <option value="pending" className="bg-amber-400 ">
                  Pending
                </option>
                <option value="in progress" className="bg-amber-400 ">
                  In Progress
                </option>
                <option value="completed" className="bg-amber-400 ">
                  Completed
                </option>
              </select>
            </div>
          )}
        </div>
        <div className="overflow-y-auto h-80 min-h-[33rem] border-2 border-yellow-400 rounded-lg">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <td>Task ID</td>
                <td>Task</td>
                <td>Status</td>
                <td>Assigned To</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {paginated.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.task}</td>
                  <td>{task.status}</td>
                  <td>{task.assigned_to}</td>
                  <td>
                    <div className="flex gap-2">
                      <img
                        src={edit}
                        alt="edit"
                        className="h-7 hover:bg-blue-300"
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
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handlePrev}
              className="p-2 bg-yellow-400 rounded-lg"
            >
              Previous
            </button>
            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              className="p-2 bg-yellow-400 rounded-lg"
            >
              Next
            </button>
          </div>
        )}
      </div>
      {editingTask && (
        <form
          onSubmit={handleUpdateTask}
          className="flex gap-4 p-4 mt-2 bg-amber-300 justify-center w-screen xs:flex-col lg:flex-row"
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
            type="text"
            className="inputUtil"
            placeholder="Status"
            value={editingTask.status}
            onChange={(e) =>
              setEditingTask({ ...editingTask, status: e.target.value })
            }
            required
          />
          <input
            type="text"
            className="inputUtil"
            placeholder="Assigned To"
            value={editingTask.assigned_to}
            onChange={(e) =>
              setEditingTask({ ...editingTask, assigned_to: e.target.value })
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
            className="p-2 bg-gray-600 hover:bg-gray-800 text-slate-100 font-semibold rounded-lg"
            onClick={() => setEditingTask(null)}
          >
            Cancel
          </button>
        </form>
      )}
    </>
  );
};

export default TaskManagement;
