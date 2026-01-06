import "./App.css";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();

  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="border-gray-400/20 border  p-4 rounded-lg w-full   shadow-lg">
        <TodoForm onAddTodo={addTodo} />
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
