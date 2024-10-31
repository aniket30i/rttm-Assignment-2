import useTaskAction from "../hooks/useTaskAction";
import edit from "../assets/icons/edit.png";
import del from "../assets/icons/del.png";
const TaskManagement = () => {
  const { tasks, isLoading, error, addTask, updateTask, deleteTask } =
    useTaskAction("http://localhost:3080/tasks");
  return (
    <div className="overflow-x-auto w-2/3 ml-auto mr-auto">
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
                    onClick={() => setEditingEmployee(employee)}
                  />
                  <img
                    src={del}
                    alt="delete"
                    className="h-7 hover:bg-zinc-900"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskManagement;
