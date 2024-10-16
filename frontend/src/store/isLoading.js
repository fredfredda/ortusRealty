import { create } from "zustand";

const isLoadingStore = create( (set) => {
    return {
        isLoading: null,
        setIsLoading: (isLoading_) => set({ isLoading: isLoading_ }),
    };
});

export { isLoadingStore };