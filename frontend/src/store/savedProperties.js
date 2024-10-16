import { create } from "zustand";

const savedPropertiesStore = create( (set) => ({
    savedProperties: [],
    appendProperty: (property) => set((state) => ({
        savedProperties: [...state.savedProperties, property]
    })),
    removeProperty: (propertyId) => set((state) => ({
        savedProperties: state.savedProperties.filter(id => id !== propertyId)
    })),
    resetProperties: () => set(() => ({
        savedProperties: []
    }))
}));

// Initialize the store by fetching saved properties
// savedPropertiesStore.getState().fetchSavedProperties();

export { savedPropertiesStore };