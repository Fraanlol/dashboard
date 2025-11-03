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

export interface ProdStore {
    currentPage: number
    rowsPerPage: number
    currentCategory: string
    setCurrentPage: (page: number) => void
    setRowsPerPage: (rowsPerPage: number) => void
    setCurrentCategory: (category: string) => void
}

const useProdStore = create<ProdStore>((set) => ({
    currentPage: 1,
    rowsPerPage: 10,
    currentCategory: 'all',
    setCurrentPage: (page: number) => set({ currentPage: page }),
    setRowsPerPage: (rowsPerPage: number) => set({ rowsPerPage }),
    setCurrentCategory: (category: string) =>
        set({ currentCategory: category }),
}))

export { useProdStore }
