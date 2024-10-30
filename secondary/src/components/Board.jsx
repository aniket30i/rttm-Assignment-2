import useFetchTask from "../hooks/useFetchTask";

const Board = () => {
  const { tasks, isLoading, error } = useFetchTask(
    "http://localhost:3080/tasks"
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id}>
            <p>
              <strong>Task ID:</strong> {task.id}
            </p>
            <p>
              <strong>Task:</strong> {task.task}
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
            <p>
              <strong>Assigned To:</strong> {task.assigned_to}
            </p>
            <hr />
          </div>
        ))
      ) : (
        <div>No tasks available</div>
      )}
    </div>
  );
};

export default Board;
