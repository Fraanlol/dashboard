import { create } from 'zustand'

export interface User {
    id: number
    name: string
    email: string
    avatar: string
    role: 'admin' | 'user' | 'guest'
    status: 'active' | 'inactive' | 'suspended'
    lastActivity: string
    registeredAt: string
}

export interface UserFilters {
    role: string | null
    status: 'all' | 'active' | 'inactive' | 'suspended'
}

// Mock data
const MOCK_USERS: User[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://i.pravatar.cc/150?img=1',
        role: 'admin',
        status: 'active',
        lastActivity: '2 min ago',
        registeredAt: '2024-01-15',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatar: 'https://i.pravatar.cc/150?img=2',
        role: 'user',
        status: 'active',
        lastActivity: '1 hour ago',
        registeredAt: '2024-02-20',
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.j@example.com',
        avatar: 'https://i.pravatar.cc/150?img=3',
        role: 'user',
        status: 'inactive',
        lastActivity: '3 days ago',
        registeredAt: '2023-11-10',
    },
    {
        id: 4,
        name: 'Sarah Williams',
        email: 'sarah.w@example.com',
        avatar: 'https://i.pravatar.cc/150?img=4',
        role: 'admin',
        status: 'active',
        lastActivity: '5 min ago',
        registeredAt: '2024-03-01',
    },
    {
        id: 5,
        name: 'Tom Brown',
        email: 'tom.brown@example.com',
        avatar: 'https://i.pravatar.cc/150?img=5',
        role: 'guest',
        status: 'suspended',
        lastActivity: '1 week ago',
        registeredAt: '2025-10-12',
    },
    {
        id: 6,
        name: 'Emma Davis',
        email: 'emma.d@example.com',
        avatar: 'https://i.pravatar.cc/150?img=6',
        role: 'user',
        status: 'active',
        lastActivity: '10 min ago',
        registeredAt: '2024-05-18',
    },
]

interface UsersState {
    // Data
    users: User[]

    // Filters & Search
    searchQuery: string
    filters: UserFilters

    // Pagination
    page: number
    rowsPerPage: number

    // Actions - Search & Filters
    setSearchQuery: (query: string) => void
    setFilters: (filters: UserFilters) => void
    clearFilters: () => void

    // Actions - Pagination
    setPage: (page: number) => void
    setRowsPerPage: (rowsPerPage: number) => void

    // Actions - CRUD
    addUser: (user: Omit<User, 'id'>) => void
    editUser: (id: number, updates: Partial<User>) => void
    deleteUser: (id: number) => void
}

export const useUsersStore = create<UsersState>((set, get) => ({
    // Initial state
    users: MOCK_USERS,
    searchQuery: '',
    filters: {
        role: null,
        status: 'all',
    },
    page: 1,
    rowsPerPage: 10,

    // Search & Filters actions
    setSearchQuery: (query) => {
        set({ searchQuery: query, page: 1 })
    },

    setFilters: (filters) => {
        set({ filters, page: 1 })
    },

    clearFilters: () => {
        set({
            searchQuery: '',
            filters: {
                role: null,
                status: 'all',
            },
            page: 1,
        })
    },

    // Pagination actions
    setPage: (page) => {
        set({ page })
    },

    setRowsPerPage: (rowsPerPage) => {
        set({ rowsPerPage, page: 1 })
    },

    // CRUD actions
    addUser: (userData) => {
        const { users } = get()
        const newId = Math.max(...users.map((u) => u.id), 0) + 1
        const newUser: User = { ...userData, id: newId }
        set({ users: [...users, newUser] })
    },

    editUser: (id, updates) => {
        set((state) => ({
            users: state.users.map((user) =>
                user.id === id ? { ...user, ...updates } : user
            ),
        }))
    },

    deleteUser: (id) => {
        set((state) => ({
            users: state.users.filter((user) => user.id !== id),
        }))
    },
}))
