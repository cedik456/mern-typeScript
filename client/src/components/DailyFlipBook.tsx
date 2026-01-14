import { useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import type { Todo } from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

interface DailyFlipBookProps {
  todos: Todo[];
  onAddTodo: (title: string, description: string) => Promise<void>;
  updateTodo: (id: string, title: string, description: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  isLoading: boolean;
  onDateChange: (date: Date) => void;
}

export default function DailyFlipBook({
  todos, // <- destructure it here
  onAddTodo,
  updateTodo,
  deleteTodo,
  isLoading,
  onDateChange,
}: DailyFlipBookProps) {
  const pages = Array.from({ length: 30 }, (_, index) => {
    const pageDate = new Date();
    pageDate.setDate(pageDate.getDate() - index);
    pageDate.setHours(0, 0, 0, 0);

    const pageTodos = todos.filter((todo) => {
      const todoDate = new Date(todo.createdAt);
      todoDate.setHours(0, 0, 0, 0);
      return todoDate.getTime() === pageDate.getTime();
    });

    return (
      <div
        key={index}
        className="page flex flex-col justify-between w-full h-full p-4 bg-white shadow-lg rounded-lg"
      >
        {/* Form at top */}
        <TodoForm onAddTodo={onAddTodo} disabled={isLoading} />

        {/* Centered date */}
        <div className="flex-1 flex justify-center items-center">
          <div className="text-lg font-bold">{pageDate.toDateString()}</div>
        </div>

        {/* Todos at bottom right */}
        <div className="flex flex-col items-end gap-2">
          {pageTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    );
  });

  return (
    <HTMLFlipBook
      {...({} as any)}
      width={600}
      height={500}
      showCover={false}
      maxShadowOpacity={0.3}
      onFlip={(e) => {
        const book = e.target; // e.target is the HTMLFlipBook instance
        const currentPage = book.getCurrentPageIndex();
        const date = new Date();
        date.setDate(date.getDate() - currentPage);
        date.setHours(0, 0, 0, 0);
        onDateChange(date);
      }}
    >
      {pages}
    </HTMLFlipBook>
  );
}
