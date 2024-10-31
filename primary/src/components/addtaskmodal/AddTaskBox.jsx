import useTaskAction from "../../hooks/useTaskAction";

const AddTaskBox = () => {
  const { tasks, isLoading, error, addTask } = useTaskAction(
    "http://localhost:3080/tasks"
  );
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
  };
  return (
    <div>
      <div>
        <form onSubmit={handleAddTask} className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Unique ID - (139xxx)"
            className="inputUtil"
            value={newTask.id}
            onChange={(e) => setNewTask({ ...newTask, id: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Full Name"
            className="inputUtil"
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="inputUtil"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="D.O.B - (YYYY-MM-DD)"
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
        </form>
      </div>
    </div>
  );
};

export default AddTaskBox;
