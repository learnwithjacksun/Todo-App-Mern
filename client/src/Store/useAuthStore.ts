import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
}
interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
