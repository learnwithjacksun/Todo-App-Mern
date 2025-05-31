import { CheckCheck, Loader, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks";
import type { User } from "../Store/useAuthStore";
const Header = () => {
    const {user} = useAuth()
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      <header className="border-b border-line sticky top-0 backdrop-blur-sm">
        <nav className="main h-[70px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 center bg-primary text-white rounded-md">
              <CheckCheck size={18} />
            </div>
            <p className="text-xl font-semibold hidden md:block">Todo App</p>
          </Link>
          {!isAuthPage && (
            <div>
              <UserButton user={user} />
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;

const UserButton = ({ user }: { user: User | null }) => {
  const {logout, isLoading} = useAuth()

  return (
    <>
      <div className="flex items-center gap-6">
        {!user && (
          <>
            <Link
              to="/login"
              className="text-sm underline underline-offset-2 font-medium"
            >
              Login
            </Link>
            <Link to="/register" className="btn btn-primary text-sm">
              Sign Up
            </Link>
          </>
        )}

        {user && (
          <button className="btn bg-red-500/10 text-red-500 text-sm" onClick={logout} disabled={isLoading}>
           {isLoading ? <Loader size={16} className="animate-spin" /> : <LogOut size={16} />}
            <span>{isLoading ? "Logging out..." : "Logout"}</span>
          </button>
        )}
      </div>
    </>
  );
};
