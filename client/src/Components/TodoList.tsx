import { Check, Loader, Trash2, Vote } from "lucide-react";
import useTodo from "../Hooks/useTodo";
import { useEffect } from "react";
const TodoList = () => {
  const {
    todos,
    deleteTodo,
    deletingTodoId,
    updateTodo,
    updatingTodoId,
    isLoading,
    getTodos,
  } = useTodo();
  useEffect(() => {
    getTodos();
  }, [getTodos]);
  return (
    <>
      <ul>
        <div className="space-y-4">
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <li
                key={index}
                className="bg-secondary rounded-md animate-pulse min-h-[70px]"
              ></li>
            ))}
        </div>

        {!isLoading && todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-2 border-b border-line pb-4 mt-10"
          >
            <div
              onClick={() => updateTodo(todo.id, todo.completed)}
              className="center h-10 w-10 rounded-full border border-line"
            >
              {todo.completed && <Check size={18} />}
              {updatingTodoId === todo.id && (
                <Loader size={18} className="animate-spin" />
              )}
            </div>
            <p  onClick={() => updateTodo(todo.id, todo.completed)} className={`${todo.completed ? "line-through text-muted" : ""}`}>
              {todo.title}
            </p>
            <button
              disabled={deletingTodoId === todo.id}
              onClick={() => deleteTodo(todo.id)}
              className="ml-auto h-10 w-10 rounded-full bg-red-500/10 center"
            >
              {deletingTodoId === todo.id ? (
                <Loader size={18} className="animate-spin text-red-500" />
              ) : (
                <Trash2 size={18} className="text-red-500" />
              )}
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && !isLoading && (
        <div className="center bg-secondary min-h-[200px] rounded-md flex-col">
          <Vote size={48} className="text-muted animate-pulse" />
          <p className="text-muted">No todos found</p>
        </div>
      )}
    </>
  );
};

export default TodoList;
