import { create } from 'zustand'

export interface Product {
    id: number
    title: string
    category: string
    price: number
    rating: number
    thumbnail: string
    stock: number
    status: 'active' | 'inactive'
}

export interface Category {
    id: number
    name: string
}

export type SortFieldType = 'title' | 'category' | 'price' | 'stock' | null
export type SortOrderType = 'asc' | 'desc'

export interface ProdStore {
    currentPage: number
    rowsPerPage: number
    currentCategory: string
    searchQuery: string
    filters: Record<string, any>
    sortField: SortFieldType
    sortOrder: SortOrderType
    setCurrentPage: (page: number) => void
    setRowsPerPage: (rowsPerPage: number) => void
    setCurrentCategory: (category: string) => void
    setSearchQuery: (query: string) => void
    setStockStatus: (status: string) => void
    setPriceRange: (range: string) => void
    setSorting: (field: SortFieldType) => void
    resetFilters: () => void
}

const useProdStore = create<ProdStore>((set) => ({
    currentPage: 1,
    rowsPerPage: 10,
    currentCategory: 'all',
    searchQuery: '',
    filters: {
        stockStatus: 'all',
        priceRange: 'all',
    },
    sortField: null,
    sortOrder: 'asc',
    setCurrentPage: (page: number) => set({ currentPage: page }),
    setRowsPerPage: (rowsPerPage: number) =>
        set({ rowsPerPage, currentPage: 1 }),
    setCurrentCategory: (category: string) =>
        set({ currentCategory: category, currentPage: 1 }),
    setSearchQuery: (query: string) =>
        set({ searchQuery: query, currentPage: 1 }),
    setStockStatus: (status: string) =>
        set((state) => ({
            filters: {
                ...state.filters,
                stockStatus: status,
            },
            currentPage: 1,
        })),
    setPriceRange: (range: string) =>
        set((state) => ({
            filters: {
                ...state.filters,
                priceRange: range,
            },
            currentPage: 1,
        })),
    setSorting: (field: SortFieldType) =>
        set((state) => ({
            sortField: field,
            sortOrder:
                state.sortField === field && state.sortOrder === 'asc'
                    ? 'desc'
                    : 'asc',
            currentPage: 1,
        })),
    resetFilters: () =>
        set({
            currentCategory: 'all',
            searchQuery: '',
            filters: {
                stockStatus: 'all',
                priceRange: 'all',
            },
            sortField: null,
            sortOrder: 'asc',
            currentPage: 1,
        }),
}))

export { useProdStore }
