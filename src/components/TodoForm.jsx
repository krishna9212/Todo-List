import React, { useEffect, useState } from "react";
import { useTodo } from "../context/TodoContext";
export default function TodoForm() {
  const [Todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (todo) => {
    if (!todo) return;
    addTodo({ todo: Todo, completed: false });
    setTodo("");
  };

  return (
    <form className="flex" onSubmit={add}>
      <input
        type="text"
        placeholder="Write Todo..."
        value={Todo}
        onChange={(e) => {
          e.preventDefault();
          setTodo(e.target.value);
        }}
        className="w-full border  border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-violet-700 py-2 text-white font-bold "
      />
      <button
        type="submit"
        className="rounded-r-lg  font-semibold px-3 py-1 bg-violet-900 text-white shrink-0 active:bg-violet-700 duration-100 "
      >
        Add
      </button>
    </form>
  );
}
