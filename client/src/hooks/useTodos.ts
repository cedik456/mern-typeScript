import { useEffect, useState } from "react";
import api from "../api/axios";

export interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useTodos(viewDate: Date) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
  const [isMutating, setIsMutating] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const fmt = (d: Date) => {
    // Force date to UTC midnight first
    const utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const y = utc.getUTCFullYear();
    const m = String(utc.getUTCMonth() + 1).padStart(2, "0");
    const day = String(utc.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const dateQuery = viewDate ? fmt(viewDate) : "";
  const fetchTodos = async () => {
    setIsInitialLoading(true);
    setError(null);

    try {
      const q = dateQuery ? `?date=${encodeURIComponent(dateQuery)}` : "";
      const response = await api.get(`/todos${q}`);
      console.log("Response:", response);

      if (response.data.success) {
        setTodos(response.data.data);
      } else {
        console.error("Failed to fetch todos");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError("Error fetching todos");
    } finally {
      setIsInitialLoading(false);
    }
  };

  const addTodo = async (title: string, description: string) => {
    setIsMutating(true);
    setError(null);

    try {
      const response = await api.post("/todos", {
        title,
        description,
      });

      if (response.data.success) {
        setTodos((prevTodos) => [response.data.data, ...prevTodos]);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      setError("Error adding todo");
    } finally {
      setIsMutating(false);
    }
  };

  const updateTodo = async (
    id: string,
    title: string,
    description: string,
    completed?: boolean
  ) => {
    setIsMutating(true);
    setError(null);

    try {
      const response = await api.put(`/todos/${id}`, {
        title,
        description,
        completed,
      });

      if (response.data.success) {
        setTodos((prev) =>
          prev.map((todo) => (todo._id === id ? response.data.data : todo))
        );
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      setError("Error updating todo!");
    } finally {
      setIsMutating(false);
    }
  };

  const deleteTodo = async (id: string) => {
    setIsMutating(true);
    setError(null);

    try {
      await api.delete(`/todos/${id}`);

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError("Error deleting todo!");
    } finally {
      setIsMutating(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [dateQuery]);

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    isMutating,
    isInitialLoading,
    error,
  };
}
