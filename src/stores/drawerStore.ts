import { create } from 'zustand'

interface DrawerState {
    open: boolean
    toggleDrawer: () => void
    closeDrawer: () => void
}

export const useDrawerStore = create<DrawerState>((set) => ({
    open: false,
    toggleDrawer: () => set((state) => ({ open: !state.open })),
    closeDrawer: () => set({ open: false }),
}))
