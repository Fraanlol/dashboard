import { create } from 'zustand'

export type SortFieldType = 'id' | 'firstName' | 'email' | 'role' | null

export type SortOrderType = 'asc' | 'desc'

export interface User {
    id: number
    firstName: string
    lastName?: string
    email: string
    image: string
    role: 'admin' | 'user' | 'moderator'
    age?: number
    gender?: 'male' | 'female'
}

export interface UsersStore {
    currentPage: number
    rowsPerPage: number
    currentCategory: string | null
    sortField: SortFieldType
    sortOrder: SortOrderType
    searchQuery: string
    filters: Record<string, unknown>
    setCurrentPage: (page: number) => void
    setRowsPerPage: (rows: number) => void
    setCurrentCategory: (category: string | null) => void
    setSorting: (field: SortFieldType) => void
    setSearchQuery: (query: string) => void
    setFilters: (filters: Record<string, unknown>) => void
}

const useUsersStore = create<UsersStore>((set) => ({
    currentPage: 1,
    rowsPerPage: 10,
    currentCategory: null,
    sortField: null,
    sortOrder: 'asc',
    searchQuery: '',
    filters: {
        role: null,
    },
    setCurrentPage: (page) => set({ currentPage: page }),
    setRowsPerPage: (rows) => set({ rowsPerPage: rows, currentPage: 1 }),
    setCurrentCategory: (category) =>
        set({ currentCategory: category, currentPage: 1 }),
    setSorting: (field: SortFieldType) =>
        set((state) => ({
            sortField: field,
            sortOrder:
                state.sortField === field && state.sortOrder === 'asc'
                    ? 'desc'
                    : 'asc',
            currentPage: 1,
        })),
    setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
    setFilters: (filters) => set({ filters, currentPage: 1 }),
}))

export { useUsersStore }
