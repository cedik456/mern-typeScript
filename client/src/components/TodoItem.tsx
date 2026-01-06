import { useEffect, useState } from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
}
interface TodoItemProps {
  // Define the props for the TodoItem component here
  todo: Todo;
  updateTodo: (id: string, title: string, description: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export default function TodoItem({
  todo,
  updateTodo,
  deleteTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(todo.title);
  const [editDescription, setEditDescription] = useState<string>(
    todo.description
  );

  const handleSave = async () => {
    await updateTodo(todo._id, editTitle, editDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  useEffect(() => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  }, [todo.title, todo.description]);

  return (
    <div className="flex items-center gap-3 mb-4  w-full">
      <div className="bg-gray-400 rounded-full w-5 h-5" />
      <li className="text-xl font-light text-gray-500 w-full">
        {isEditing ? (
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
              <button onClick={handleSave} className="text-sm text-gray-500">
                Save
              </button>
              <button onClick={handleCancel} className="text-sm text-gray-500">
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
                onClick={() => setIsEditing(true)}
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
  );
}
