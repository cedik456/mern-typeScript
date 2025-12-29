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

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await api.get("/todos");

      console.log("Response:", response);

      if (response.data.success) {
        setTodos(response.data.data);
      } else {
        console.error("Failed to fetch todos");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (title: string, description: string) => {
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
    }
  };

  const updateTodo = async (id: string, title: string, description: string) => {
    try {
      const response = await api.put(`todos/${id}`, {
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
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await api.delete(`todos/${id}`);

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
}
