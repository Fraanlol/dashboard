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

export interface ProdStore {
    currentPage: number
    rowsPerPage: number
    setCurrentPage: (page: number) => void
    setRowsPerPage: (rowsPerPage: number) => void
}

const useProdStore = create<ProdStore>( set => ({
    currentPage: 1,
    rowsPerPage: 10,
    setCurrentPage: (page: number) => set({ currentPage: page }),
    setRowsPerPage: (rowsPerPage: number) => set({ rowsPerPage }),
})
)

export { useProdStore }