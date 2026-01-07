import React, { useState } from "react";

// Confusing part
interface TodoFormProps {
  onAddTodo: (title: string, description: string) => Promise<void>;
  disabled?: boolean;
}

export default function TodoForm({ onAddTodo, disabled }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onAddTodo(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-gray-200 border rounded-sm p-1.5 mb-2 text-sm "
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border-gray-200 border rounded-sm p-1.5 mb-4 text-sm "
      />

      <button
        onClick={handleSubmit}
        className={`p-1.5 bg-gray-800 text-center  text-white rounded-md mb-4 cursor-pointer hover:bg-gray-700 transition-colors ${
          disabled ? " cursor-not-allowed" : ""
        }`}
        disabled={disabled}
      >
        Add Todo
      </button>
    </div>
  );
}
