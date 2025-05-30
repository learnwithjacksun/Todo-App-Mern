import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      setTodos: (state: Todo[]) => set({ todos: state }),
    }),
    {
      name: "todos",
      partialize: (state) => ({
        todos: state.todos,
      }),
    }
  )
);

export default useTodoStore;
