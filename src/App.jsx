import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import { TodoProvider } from "./context/TodoContext";
import TodoItem from "./components/TodoItems";

function App() {
  const [index, setindex] = useState(0);
  const [todos, settodos] = useState([]);

  const addTodo = (todo) => {
    settodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todoMsg) => {
    settodos((prev) => prev.map((val) => (val.id === id ? todoMsg : val)));
  };
  const deleteTodo = (id) => {
    settodos((prev) => prev.filter((val) => val.id !== id));
  };

  const toggleComplete = (id) => {
    settodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      settodos(todos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <TodoProvider
      value={{ updateTodo, deleteTodo, toggleComplete, addTodo, todos }}
    >
      <div className="bg-violet-800 min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-2xl shadow-purple-600/55  rounded-lg px-4 py-3 text-white ">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Todo List
          </h1>
          <div className="mb-4 shadow-xl">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3 ">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
