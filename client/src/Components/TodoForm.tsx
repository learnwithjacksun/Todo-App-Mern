import { Loader, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useTodo from "../Hooks/useTodo";
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

type FormData = z.infer<typeof schema>;

const TodoForm = () => {
  const { addTodo, isAdding } = useTodo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    addTodo(data.title);
    reset();
  };

  return (
    <>
      <div className="space-y-2">
        <form className=" flex gap-2 mt-10" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Add a new todo"
            autoFocus
            className="border-b border-line flex-1 font-light text-2xl"
            {...register("title")}
          />
          <button
            disabled={isAdding}
            type="submit"
            className="btn-primary center h-10 w-10 rounded-sm "
          >
            {isAdding ? <Loader size={18} className="animate-spin" /> : <Plus />}
          </button>
        </form>
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
    </>
  );
};

export default TodoForm;
