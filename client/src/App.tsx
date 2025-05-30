import { ListChecks } from "lucide-react";
import { TodoForm, TodoList } from "./Components";
import useTodo from "./Hooks/useTodo";
import { useEffect } from "react";
import { Toaster } from "sonner";

const App = () => {
  const { getTodos, todos } = useTodo();
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  
  return (
    <>
      <Toaster richColors position="top-center" />
      <main className="md:w-[500px] w-[90%] mx-auto pb-10 space-y-4">
        <header className="flex items-center gap-2 h-[70px] sticky top-0 backdrop-blur-sm">
          <ListChecks className="text-yellow-600" />
          <h1 className="text-2xl font-bold">Todo App</h1>
        </header>

        <TodoForm />
        <p className="text-muted text-sm">You have completed <span className="text-main">{completedTodos}/{totalTodos}</span> todos</p>
        <TodoList />
       
      </main>
    </>
  );
};

export default App;
