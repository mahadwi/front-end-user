import { create } from "zustand";

const useAuthStore = create((set) => ({
  refresh: true,
  token: "",
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  setToken: (state) => set({ token: state }),
  setRefresh: () => set((state) => ({ refresh: !state.refresh })),
}));

const useUserStore = create((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
}));

export { useUserStore, useAuthStore };
