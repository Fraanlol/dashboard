import { create } from 'zustand'

export type SortFieldType =
    | 'id'
    | 'name'
    | 'email'
    | 'role'
    | 'status'
    | 'lastActivity'
    | 'registeredAt'
    | null

export type SortOrderType = 'asc' | 'desc'

export interface User {
    id: number
    firstName: string
    email: string
    avatar: string
    role: 'admin' | 'user' | 'moderator'
    status: 'active' | 'inactive' | 'suspended'
    lastActivity: string
    registeredAt: string
}

export interface UsersStore {
    currentPage: number
    rowsPerPage: number
    currentCategory: string | null
    sortField: SortFieldType
    sortOrder: SortOrderType
    searchQuery: string
    filters: Record<string, any>
    setCurrentPage: (page: number) => void
    setRowsPerPage: (rows: number) => void
    setCurrentCategory: (category: string | null) => void
    setSorting: (field: SortFieldType) => void
    setSearchQuery: (query: string) => void
    setFilters: (filters: Record<string, any>) => void
}

const useUsersStore = create<UsersStore>((set) => ({
    currentPage: 1,
    rowsPerPage: 10,
    currentCategory: null,
    sortField: null,
    sortOrder: 'asc',
    searchQuery: '',
    filters: {},
    setCurrentPage: (page) => set({ currentPage: page }),
    setRowsPerPage: (rows) => set({ rowsPerPage: rows }),
    setCurrentCategory: (category) => set({ currentCategory: category }),
    setSorting: (field: SortFieldType) =>
        set((state) => ({
            sortField: field,
            sortOrder:
                state.sortField === field && state.sortOrder === 'asc'
                    ? 'desc'
                    : 'asc',
            currentPage: 1,
        })),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setFilters: (filters) => set({ filters }),
}))

export { useUsersStore }
