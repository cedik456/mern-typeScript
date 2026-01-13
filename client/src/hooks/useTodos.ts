import { useEffect, useState } from "react";
import api from "../api/axios";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useTodos(viewDate: Date) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const dateQuery = viewDate ? fmt(viewDate) : "";

  const fetchTodos = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const addTodo = async (title: string, description: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/todos", {
        title,
        description,
      });

      if (response.data.success) {
        setTodos((prevTodos) => [...prevTodos, response.data.data]);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      setError("Error adding todo");
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (id: string, title: string, description: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.put(`/todos/${id}`, {
        title,
        description,
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
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await api.delete(`/todos/${id}`);

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError("Error deleting todo!");
    } finally {
      setIsLoading(false);
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
    isLoading,
    error,
  };
}
