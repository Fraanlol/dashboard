import { create } from 'zustand'

interface NotificationState {
    id: number
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
}

export const useNotificationStore = create<{
    notifications: NotificationState[]
    show: (message: string, type: NotificationState['type']) => void
    remove: (id: number) => void
}>((set) => ({
    notifications: [],

    show: (message, type = 'info') => {
        const id = Date.now()
        set((state) => ({
            notifications: [...state.notifications, { id, message, type }],
        }))
    },

    remove: (id) => {
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        }))
    },
}))
