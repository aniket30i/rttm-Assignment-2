import useFetchTask from "../hooks/useFetchTask";

const Board = () => {
  const { tasks, isLoading, error } = useFetchTask(
    "http://localhost:3080/tasks"
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-20 w-2/3 ml-auto mr-auto border-2 border-yellow-400 p-1 rounded-lg">
      <div>
        <input
          type="text"
          id="Search"
          placeholder="Search by Assign ID"
          className="border-2 border-yellow-400 p-1 mb-2 rounded-lg"
        />
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <td>Task ID</td>
            <td>Task</td>
            <td>Status</td>
            <td>Assigned To</td>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.task}</td>
              <td>{task.status}</td>
              <td>{task.assigned_to}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
