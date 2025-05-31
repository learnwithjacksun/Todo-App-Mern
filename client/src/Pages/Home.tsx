import { Info } from "lucide-react";
import { TodoForm, TodoList, Header } from "../Components";
import useTodo from "../Hooks/useTodo";
import { useAuth } from "../Hooks";
const Home = () => {
  const { todos } = useTodo();
  const {user} = useAuth()
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  return (
    <>
      <Header />
      <main>
        <div className="py-4">
          {user ? (
            <p className="text-muted text-lg">
              Hi,{" "}
              <span className="text-main font-semibold underline underline-offset-2">
                {user.name}
              </span>
              👋
            </p>
          ) : (
            <div className="flex items-center gap-2 bg-yellow-500/10 p-2 rounded-md text-yellow-500">
              <Info size={18} className="flex-shrink-0" />{" "}
              <p>You are not logged in</p>
            </div>
          )}
        </div>

        <TodoForm />
        <p className="text-muted text-sm">
          You have completed{" "}
          <span className="text-main text-lg font-semibold">
            {completedTodos}/{totalTodos}
          </span>{" "}
          todos
        </p>
        <TodoList />
      </main>
    </>
  );
};

export default Home;
