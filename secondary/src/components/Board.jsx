import useFetchTask from "../hooks/useFetchTask";

const Board = () => {
  const { tasks, isLoading, error } = useFetchTask(
    "http://localhost:3080/tasks"
  );
  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index}>{task}</div>
      ))}
    </div>
  );
};

export default Board;
