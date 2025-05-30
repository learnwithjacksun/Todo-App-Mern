import { toast } from "sonner";
import api from "../Config/axios";
import { useTodoStore } from "../Store";
import { useCallback, useState } from "react";

const useTodo = () => {
  const { setTodos, todos } = useTodoStore();
  const [isAdding, setIsAdding] = useState(false);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);
  const [updatingTodoId, setUpdatingTodoId] = useState<string | null>(null);

  const addTodo = async (title: string) => {
    setIsAdding(true);
    try {
      const newTodo = {
        title,
      };
       await api.post("/todos", newTodo);
      const todos = await getTodos();
      setTodos(todos);
      toast.success("Todo added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add todo");
    } finally {
      setIsAdding(false);
    }
  };

  const getTodos = useCallback(async () => {
    try {
      const response = await api.get("/todos");
      setTodos(response.data.todos);
      console.log(response.data.todos);
      return response.data.todos;
    } catch (error) {
      console.log(error);
      toast.error("Failed to get todos");
    }
  }, [setTodos]);

  const deleteTodo = async (id: string) => {
    setDeletingTodoId(id);
    try {
      await api.delete(`/todos/${id}`);
      const todos = await getTodos();
      setTodos(todos);
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete todo");
    } finally {
      setDeletingTodoId(null);
    }
  };

  const updateTodo = async (id: string, completed: boolean) => {
    setUpdatingTodoId(id);
    try {
      await api.put(`/todos/${id}`, { completed: !completed });
      const todos = await getTodos();
      setTodos(todos);
      toast.success("Todo updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update todo");
    } finally {
      setUpdatingTodoId(null);
    }
  };


  return { addTodo, isAdding, getTodos, todos, deleteTodo, deletingTodoId, updateTodo, updatingTodoId };
};

export default useTodo;
