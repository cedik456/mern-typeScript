import "./App.css";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const { todos, addTodo, updateTodo, deleteTodo, isLoading, error } =
    useTodos();

  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="border-gray-400/20 border  p-4 rounded-lg  md:w-1/2 w-full shadow-lg">
        <TodoForm onAddTodo={addTodo} disabled={isLoading} />

        {error && <p className="text-red-500 ">Error! Fetching Todo's!</p>}
        {isLoading && <p className="text-gray-500">Loading Todos...</p>}
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              isLoading={isLoading}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
