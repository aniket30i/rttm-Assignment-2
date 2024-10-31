import useFetchTask from "../hooks/useFetchTask";
import { useState } from "react";

const Board = () => {
  const { tasks, isLoading, error } = useFetchTask(
    "http://localhost:3080/tasks"
  );

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;

  const handlePrev = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const paginated = tasks.slice(startIndex, startIndex + tasksPerPage);

  return (
    <>
      <div className="mt-20 w-2/3 ml-auto mr-auto border-2 border-yellow-400 p-1 rounded-lg min-h-[33rem]">
        <div>
          <input
            type="text"
            id="Search"
            placeholder="Search by Assign ID"
            className="border-2 border-yellow-200 p-1 mb-2 rounded-lg focus:outline-none focus:ring focus:ring-yellow-300"
          />
        </div>
        <table className="table table-hover table-responsive">
          <thead>
            <tr>
              <td>Task ID</td>
              <td>Task</td>
              <td>Status</td>
              <td>Assigned To</td>
            </tr>
          </thead>
          <tbody>
            {paginated.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.task}</td>
                <td>{task.status}</td>
                <td>{task.assigned_to}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading && (
          <div className="flex justify-center">
            <p className="text-2xl">
              Loading.<span className="text-gray-600">.</span>
              <span className="text-gray-500">.</span>
            </p>
          </div>
        )}
        {error && (
          <div className="flex justify-center">
            <p className="text-xl">
              <span className="text-red-500">Error</span> : {error} !!!
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center w-1/2 mt-4 ml-auto mr-auto">
        <button className="p-1 bg-yellow-400 rounded-lg " onClick={handlePrev}>
          Previous
        </button>
        <span className="mx-2">{currentPage}</span>
        <button
          className="p-1 px-2 bg-yellow-400 rounded-lg"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Board;
