import "./App.css";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { useState } from "react";
import DateNavigator from "./components/DateNavigator";

function App() {
  const [viewDate, setViewDate] = useState<Date>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    isMutating,
    isInitialLoading,
    error,
  } = useTodos(viewDate);

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-[#0E0E0E] p-2">
      <div className="border-gray-400/20 border  p-4 rounded-lg  md:w-1/4 w-full  shadow-lg  h-200 bg-[#FAFAFA]">
        <DateNavigator viewDate={viewDate} setViewDate={setViewDate} />
        <TodoForm onAddTodo={addTodo} disabled={isMutating} />

        {error && <p className="text-red-500 ">Error! Fetching Todo's!</p>}

        {/* <hr className="text-gray-400 w-full my-4" /> */}

        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              isLoading={isInitialLoading || isMutating}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
