import { useEffect, useState } from "react";
import "./App.css";
import api from "./api/axios";
import { useTodos } from "./hooks/useTodos";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

function App() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");

  const hanldeAddTodo = async () => {
    await addTodo(title, description);
    setTitle("");
    setDescription("");
  };

  const handleUpdateTodo = async () => {
    if (!editingId) return;

    await updateTodo(editingId, editTitle, editDescription);
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="border-gray-400/20 border  p-4 rounded-lg w-full   shadow-lg">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-gray-200 border rounded-sm p-1.5 mb-2 text-sm w-1/2"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-gray-200 border rounded-sm p-1.5 mb-2 text-sm w-1/2"
          />

          <button
            onClick={hanldeAddTodo}
            className="p-1.5 bg-gray-800 text-center w-1/2 text-white rounded-md mb-4 cursor-pointer hover:bg-gray-700 transition-colors"
          >
            Add Todo
          </button>
        </div>

        <ul>
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="flex items-center gap-3 mb-4  w-full"
            >
              <div className="bg-gray-400 rounded-full w-5 h-5" />
              <li className="text-xl font-light text-gray-500 w-full">
                {editingId === todo._id ? (
                  <div className="flex justify-between items-center w-full">
                    <div className="flex-1 items-center  flex flex-col">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="text-sm w-full"
                      />

                      <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="text-xs w-full "
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdateTodo}
                        className="text-sm text-gray-500"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-sm text-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex-1 text-left">
                      <h3 className="text-sm">{todo.title}</h3>
                      <p className="text-xs">{todo.description}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(todo)}
                        className="text-sm text-gray-500 "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className="text-sm text-gray-500 "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
