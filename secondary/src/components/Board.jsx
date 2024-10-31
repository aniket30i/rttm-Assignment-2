import useFetchTask from "../hooks/useFetchTask";
import { useEffect, useState } from "react";

const Board = () => {
  const { tasks, isLoading, error } = useFetchTask(
    "http://localhost:3080/tasks"
  );

  const [searchedQuery, setSearchedQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  // Search input handler
  const handleSearch = (query) => {
    setSearchedQuery(query);
    setCurrentPage(1); // Reset to the first page
  };

  // Status filter handler
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  // Filter tasks based on both search and status
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesSearch = task.assigned_to
      .toLowerCase()
      .includes(searchedQuery.toLowerCase());

    if (searchedQuery && statusFilter !== "all") {
      // Both search and status
      return matchesStatus && matchesSearch;
    } else if (searchedQuery) {
      // Only search
      return matchesSearch;
    } else if (statusFilter !== "all") {
      // Only status filter
      return matchesStatus;
    }
    // No filter
    return true;
  });

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const paginatedTasks = filteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage
  );

  const handlePrev = () => setCurrentPage(Math.max(currentPage - 1, 1));
  const handleNext = () =>
    setCurrentPage(Math.min(currentPage + 1, totalPages));

  return (
    <>
      <div className="mt-20 w-2/3 ml-auto mr-auto border-2 border-yellow-400 p-1 rounded-lg h-[38rem] overflow-x-auto overflow-y-auto">
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="Search"
            placeholder="Search by Assign ID"
            className="border-2 border-yellow-200 p-1 mb-2 rounded-lg focus:outline-none focus:ring focus:ring-yellow-300"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <p>Filter by status</p>
          <select
            className="w-32 h-9 rounded-lg border-2 border-yellow-200"
            onChange={handleStatusFilter}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
          </select>
        </div>

        <table className="table table-hover table-responsive">
          <thead>
            <tr>
              <td>
                <strong>Task ID</strong>
              </td>
              <td>
                <strong>Task</strong>
              </td>
              <td>
                <strong>Status</strong>
              </td>
              <td>
                <strong>Assigned To</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.map((task) => (
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
            <p className="text-2xl">Loading...</p>
          </div>
        )}
        {error && (
          <div className="flex justify-center">
            <p className="text-xl text-red-500">Error: {error} !!!</p>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center w-1/2 mt-4 ml-auto mr-auto">
        <button
          className="p-1 bg-yellow-400 rounded-lg"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">{currentPage}</span>
        <button
          className="p-1 px-2 bg-yellow-400 rounded-lg"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Board;
