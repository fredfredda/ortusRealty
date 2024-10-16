import { create } from "zustand";

const savedPropertiesStore = create( (set) => ({
    savedProperties: [],
    appendProperty: (property) => set((state) => ({
        savedProperties: [...state.savedProperties, property]
    })),
    removeProperty: (propertyId) => set((state) => ({
        savedProperties: state.savedProperties.filter(property => property.id != propertyId)
    })),
}));

// Initialize the store by fetching saved properties
// savedPropertiesStore.getState().fetchSavedProperties();

export { savedPropertiesStore };