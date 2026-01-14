import { useEffect, useState } from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}
interface TodoItemProps {
  // Define the props for the TodoItem component here
  todo: Todo;
  updateTodo: (
    id: string,
    title: string,
    description: string,
    completed?: boolean
  ) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  isLoading: boolean;
}

export default function TodoItem({
  todo,
  updateTodo,
  deleteTodo,
  isLoading,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(todo.title);
  const [editDescription, setEditDescription] = useState<string>(
    todo.description
  );
  const [completed, setCompleted] = useState<boolean>(todo.completed || false);

  const handleSave = async () => {
    await updateTodo(todo._id, editTitle, editDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setCompleted(todo.completed);
  };

  const toggleCompleted = async () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    await updateTodo(todo._id, editTitle, editDescription, newCompleted);
  };

  useEffect(() => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setCompleted(todo.completed || false);
  }, [todo.title, todo.description, todo.completed]);

  return (
    <div className="flex items-center gap-3 mb-4 w-full">
      <div
        onClick={toggleCompleted}
        className={`rounded-full w-5 h-5 shrink-0 cursor-pointer ${
          completed ? "bg-gray-800" : "bg-gray-400"
        }`}
      />
      <li className="text-xl font-light text-gray-600 flex-1 min-w-0">
        {isEditing ? (
          <div className="flex justify-between items-center w-full">
            <div className="flex-1 text-left flex flex-col min-w-0">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-sm w-full "
              />

              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="text-xs w-full "
              />
            </div>

            <div className="flex gap-1">
              <button
                onClick={handleSave}
                className="text-sm text-gray-500 cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="text-sm text-gray-500 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex-1 text-left min-w-0">
              <h3
                className={`text-sm truncate ${
                  completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.title}
              </h3>
              <p
                className={`text-xs truncate wrap-break-word ${
                  completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.description}
              </p>
            </div>

            {!completed && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-gray-500 "
                  disabled={isLoading}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-sm text-gray-500 "
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </li>
    </div>
  );
}
