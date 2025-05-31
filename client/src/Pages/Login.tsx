import { Link } from "react-router-dom";
import { Header } from "../Components";
import { Eye, EyeClosed, Loader } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../Hooks";

const loginSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit = handleSubmit(async (data) => {
    const user = await login(data.name, data.password);
    if (user) {
      reset();
    }
  });
  return (
    <>
      <Header />
      <main>
        <div className="py-6 ">
          <p className="text-xl font-semibold">Welcome back! 👋</p>
          <p className="text-muted text-sm">
            Login to your account to continue
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              autoFocus
              autoComplete="off"
              className="border-b border-line w-full font-light  placeholder:text-2xl text-xl py-2 text-wrap"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm font-medium">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="off"
              className="border-b border-line w-full font-light placeholder:text-2xl text-xl py-2"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm font-medium">
                {errors.password.message}
              </p>
            )}
            <button
              onClick={togglePassword}
              type="button"
              className="absolute right-2 top-0 h-full center text-muted"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          <p className="text-muted text-sm">
            Forgot your password?{" "}
            <Link
              to="/forgot-password"
              className="text-primary underline underline-offset-2 font-semibold"
            >
              Reset
            </Link>
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full center text-sm h-10 mt-10"
          >
            {isLoading ? (
              <Loader size={16} className="animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-muted text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold underline underline-offset-2"
          >
            Register
          </Link>
        </p>
      </main>
    </>
  );
};

export default Login;
