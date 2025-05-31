import { toast } from "sonner";
import api from "../Config/axios";
import { useAuthStore } from "../Store";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";


const useAuth = () => {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      setUser(response.data.user);
      navigate("/")
      return response.data.user
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (name: string, password: string)=>{
    setIsLoading(true);
    try {
        const response = await api.post("/auth/login", {name, password})
        setUser(response.data.user)
        toast.success(response.data.message)
        navigate("/")
        return response.data.user
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
    } finally {
        setIsLoading(false);
    }
  }

  const logout = async ()=>{
    setIsLoading(true);
    try {
       const response = await api.post("/auth/logout")
        setUser(null)
        toast.success(response.data.message)
        navigate("/login")
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
    } finally {
        setIsLoading(false);
    }
  }

  const checkAuth = useCallback(async ()=>{
    setIsCheckingAuth(true);
    try {
        const response = await api.get("/auth/check")
        setUser(response.data.user)
    } catch (error) {
        console.log(error);
        setUser(null)
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
    } finally {
        setIsCheckingAuth(false);
    }
  }, [setUser]);

  return { register, login, user, isLoading, logout, isCheckingAuth, checkAuth };
};

export default useAuth;
