import { create } from 'zustand'

interface GlobalSearchStore {
    isOpen: boolean
    searchQuery: string
    setIsOpen: (isOpen: boolean) => void
    setSearchQuery: (query: string) => void
    openSearch: () => void
    closeSearch: () => void
    clearSearch: () => void
}

export const useGlobalSearchStore = create<GlobalSearchStore>((set) => ({
    isOpen: false,
    searchQuery: '',
    setIsOpen: (isOpen) => set({ isOpen }),
    setSearchQuery: (searchQuery) => set({ searchQuery }),
    openSearch: () => set({ isOpen: true, searchQuery: '' }),
    closeSearch: () => set({ isOpen: false, searchQuery: '' }),
    clearSearch: () => set({ searchQuery: '' }),
}))
