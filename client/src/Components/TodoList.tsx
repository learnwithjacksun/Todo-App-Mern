import { Check, Loader, Trash2 } from "lucide-react";
import useTodo from "../Hooks/useTodo";
const TodoList = () => {
  const { todos, deleteTodo, deletingTodoId, updateTodo, updatingTodoId } = useTodo();
  return (
    <>
      <ul>
        {todos.map((todo) => (
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
            <p className={`${todo.completed ? "line-through text-muted" : ""}`}>{todo.title}</p>
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
    </>
  );
};

export default TodoList;
