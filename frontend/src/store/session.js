import { create } from "zustand";

const sessionStore = create((set) => ({
    session: {},
    setSession: (session_) => set({ session: session_}),
    deleteSession: () => set({ session: {} }),
}));

export { sessionStore };