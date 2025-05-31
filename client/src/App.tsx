import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Home, Login, Register } from "./Pages";
import { useAuth } from "./Hooks";
const App = () => {
  const {checkAuth} = useAuth()
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  return (
    <>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
