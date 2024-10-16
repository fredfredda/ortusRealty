import { create } from "zustand";

const sessionStore = create( (set) => ({
    session: {},
    setSession: (newSession) => set({ session: newSession }),
    deleteSession: () => set({ session: {} }),
}));

export { sessionStore };