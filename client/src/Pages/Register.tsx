import { Link } from "react-router-dom"
import { Header } from "../Components"
import { Eye, EyeClosed, Loader } from "lucide-react"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "../Hooks"

const registerSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  email: z.string().email({message: "Invalid email address"}),
  password: z.string().min(1, {message: "Password is required"}),
})

type RegisterSchema = z.infer<typeof registerSchema>



const Register = () => {
  const {register: registerUser, isLoading} = useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit, reset, formState: {errors}} = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })


  const togglePassword = () => {
    setShowPassword(prev => !prev);
  }

  const onSubmit = handleSubmit(async (data)=>{
   const user = await registerUser(data.name, data.email, data.password)
    if(user){
      reset()
    }
  })


  return (
    <>
    <Header/>
    <main>
      <div className="py-6 ">
        <p className="text-xl font-semibold">Create an account! 🔥</p>
        <p className="text-muted text-sm">Sign up with necessary details to continue</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <input type="text" placeholder="Username" autoFocus autoComplete="off" className="border-b border-line w-full font-light  placeholder:text-2xl text-xl py-2 text-wrap" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm font-medium">{errors.name.message}</p>}
        </div>
        <div>
          <input type="email" placeholder="Email" autoFocus autoComplete="off" className="border-b border-line w-full font-light  placeholder:text-2xl text-xl py-2 text-wrap" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm font-medium">{errors.email.message}</p>}
        </div>
        <div className="relative">
          <input type={showPassword ? "text" : "password"} placeholder="Password" autoComplete="off" className="border-b border-line w-full font-light placeholder:text-2xl text-xl py-2" {...register("password")} />
          <button onClick={togglePassword} type="button" className="absolute right-2 top-0 h-full center text-muted">
            {showPassword ? <Eye /> : <EyeClosed />}
          </button>
          {errors.password && <p className="text-red-500 text-sm font-medium">{errors.password.message}</p>}
        </div>
        <p className="text-muted text-sm">
          There are no <span className="font-semibold text-primary underline underline-offset-2">terms</span> and <span className="font-semibold text-primary underline underline-offset-2 ">conditions</span> for creating an account. We just need to authenticate you.
        </p>  
        <button type="submit" disabled={isLoading} className="btn btn-primary w-full center text-sm h-10 mt-10">
          {isLoading ? <Loader size={16} className="animate-spin" /> : "Register"}
        </button>
      </form>
        <p className="text-muted text-sm">
          Already have an account? <Link to="/login" className="text-primary font-semibold underline underline-offset-2">Login</Link>
        </p>
    </main>
    </>
  )
}

export default Register;
