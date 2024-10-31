import { useEffect, useState } from "react";

const useEmployeeActions = (url) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch Tasks");
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [url, refresh]);

  const addTask = async (newTask) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) throw new Error("Failed to add Task");
      const addedTask = await response.json();
      setTasks((prev) => [...prev, addedTask]);
    } catch (err) {
      setError(err);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(`${url}/${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) throw new Error("Failed to update Task");
      const newTask = await response.json();
      setTasks((prev) =>
        prev.map((tasks) => (tasks.id === newTask.id ? newTask : tasks))
      );
    } catch (err) {
      setError(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${url}/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete Task");
      setTasks((prev) => prev.filter((tasks) => tasks.taskId !== taskId));
      setRefresh((prev) => !prev);
    } catch (err) {
      setError(err);
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
  };
};

export default useEmployeeActions;