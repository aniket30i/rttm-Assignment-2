import useFetchTask from "../hooks/useFetchTask";
import { useState } from "react";

const Board = ({ trigger }) => {
  const { tasks, isLoading, error } = useFetchTask(
    "http://localhost:3080/tasks",
    trigger
  );

  const [searchedQuery, setSearchedQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  const handleSearch = (query) => {
    setSearchedQuery(query);
    setCurrentPage(1); // Reset to the first page
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesSearch = task.assigned_to
      .toLowerCase()
      .includes(searchedQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const [isSortedAsc, setIsSortedAsc] = useState(true);

  const sortTaskByDeadline = () => {
    setIsSortedAsc(!isSortedAsc);
  };

  const sortedFilteredTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);
    return isSortedAsc ? dateA - dateB : dateB - dateA;
  });

  const totalPages = Math.ceil(sortedFilteredTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const paginatedTasks = sortedFilteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage
  );

  const handlePrev = () => setCurrentPage(Math.max(currentPage - 1, 1));
  const handleNext = () =>
    setCurrentPage(Math.min(currentPage + 1, totalPages));

  return (
    <>
      <div className="flex flex-col items-center md:flex-row justify-center gap-2 mt-10 ml-auto mr-auto max-w-[40rem]">
        <input
          type="text"
          id="Search"
          placeholder="Search by Assign ID"
          className="border-2 border-yellow-200 p-1 mb-2 rounded-lg w-64 focus:outline-none focus:ring focus:ring-yellow-300 "
          onChange={(e) => handleSearch(e.target.value)}
        />
        <p className="w-32">Filter by status</p>
        <select
          className="w-32 h-9 rounded-lg border-2 border-yellow-200"
          onChange={handleStatusFilter}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={sortTaskByDeadline}
          className="p-2 w-48 bg-yellow-400 text-zinc-900 rounded "
        >
          Sort by Deadline {isSortedAsc ? "↑" : "↓"}
        </button>
      </div>
      <div className="mt-10 w-2/3 mx-auto border-2 border-yellow-400 p-1 rounded-lg h-[34rem] overflow-auto">
        <table className="table table-hover">
          <thead>
            <tr className="text-left">
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
              <td>
                <strong>Deadline</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.map((task) => (
              <tr key={task.id} className="text-left">
                <td>{task.id}</td>
                <td>{task.task}</td>
                <td>{task.status}</td>
                <td>{task.assigned_to}</td>
                <td>{task.deadline}</td>
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
        {paginatedTasks.length === 0 && !isLoading && (
          <div className="flex justify-center">
            <p className="text-xl">No tasks found.</p>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center w-1/2 mt-4 mx-auto">
        <button
          className="p-1 bg-yellow-400 rounded-lg"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
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
