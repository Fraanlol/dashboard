import { create } from 'zustand'
import { Product } from '@pages/products/components/ProductsTable'
import { ProductFilters } from '@pages/products/components/ProductsFilters'

// Mock data
const MOCK_PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 129.99,
        stock: 45,
        status: 'active',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        name: 'Running Shoes',
        category: 'Sports',
        price: 89.99,
        stock: 12,
        status: 'active',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        name: 'Coffee Maker',
        category: 'Home',
        price: 79.99,
        stock: 0,
        status: 'inactive',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 4,
        name: 'Smart Watch',
        category: 'Electronics',
        price: 299.99,
        stock: 28,
        status: 'active',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 5,
        name: 'Yoga Mat',
        category: 'Sports',
        price: 34.99,
        stock: 67,
        status: 'active',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 6,
        name: 'Desk Lamp',
        category: 'Home',
        price: 45.99,
        stock: 15,
        status: 'active',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 7,
        name: 'Bluetooth Speaker',
        category: 'Electronics',
        price: 59.99,
        stock: 8,
        status: 'active',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 8,
        name: 'Winter Jacket',
        category: 'Clothing',
        price: 149.99,
        stock: 22,
        status: 'active',
        image: 'https://via.placeholder.com/150',
    },
]

interface ProductsState {
    // Data
    products: Product[]

    // Filters & Search
    searchQuery: string
    filters: ProductFilters

    // Pagination
    page: number
    rowsPerPage: number

    // Actions - Search & Filters
    setSearchQuery: (query: string) => void
    setFilters: (filters: ProductFilters) => void
    clearFilters: () => void

    // Actions - Pagination
    setPage: (page: number) => void
    setRowsPerPage: (rowsPerPage: number) => void

    // Actions - CRUD
    addProduct: (product: Omit<Product, 'id'>) => void
    editProduct: (id: number, updates: Partial<Product>) => void
    deleteProduct: (id: number) => void
    duplicateProduct: (id: number) => void
}

// Selector helpers (to be used outside the store)
export const selectFilteredProducts = (state: ProductsState) => {
    return state.products.filter((product) => {
        // Search filter
        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(state.searchQuery.toLowerCase()) ||
            product.category
                .toLowerCase()
                .includes(state.searchQuery.toLowerCase())

        // Category filter
        const matchesCategory =
            !state.filters.category ||
            product.category === state.filters.category

        // Stock filter
        const matchesStock =
            state.filters.stockStatus === 'all' ||
            (state.filters.stockStatus === 'low' &&
                product.stock > 0 &&
                product.stock < 20) ||
            (state.filters.stockStatus === 'out' && product.stock === 0)

        // Price filter
        const matchesPrice =
            state.filters.priceRange === 'all' ||
            (state.filters.priceRange === 'low' && product.price < 50) ||
            (state.filters.priceRange === 'medium' &&
                product.price >= 50 &&
                product.price < 200) ||
            (state.filters.priceRange === 'high' && product.price >= 200)

        return matchesSearch && matchesCategory && matchesStock && matchesPrice
    })
}

export const selectPaginatedProducts = (state: ProductsState) => {
    const filtered = selectFilteredProducts(state)
    const startIndex = (state.page - 1) * state.rowsPerPage
    return filtered.slice(startIndex, startIndex + state.rowsPerPage)
}

export const selectTotalPages = (state: ProductsState) => {
    const filtered = selectFilteredProducts(state)
    return Math.ceil(filtered.length / state.rowsPerPage)
}

export const selectTotalItems = (state: ProductsState) => {
    return selectFilteredProducts(state).length
}

export const useProductsStore = create<ProductsState>((set, get) => ({
    // Initial state
    products: MOCK_PRODUCTS,
    searchQuery: '',
    filters: {
        category: null,
        stockStatus: 'all',
        priceRange: 'all',
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
                category: null,
                stockStatus: 'all',
                priceRange: 'all',
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
    addProduct: (productData) => {
        const { products } = get()
        const newId = Math.max(...products.map((p) => p.id), 0) + 1
        const newProduct: Product = { ...productData, id: newId }
        set({ products: [...products, newProduct] })
    },

    editProduct: (id, updates) => {
        set((state) => ({
            products: state.products.map((product) =>
                product.id === id ? { ...product, ...updates } : product
            ),
        }))
    },

    deleteProduct: (id) => {
        set((state) => ({
            products: state.products.filter((product) => product.id !== id),
        }))
    },

    duplicateProduct: (id) => {
        const { products } = get()
        const productToDuplicate = products.find((p) => p.id === id)
        if (productToDuplicate) {
            const newId = Math.max(...products.map((p) => p.id), 0) + 1
            const duplicated: Product = {
                ...productToDuplicate,
                id: newId,
                name: `${productToDuplicate.name} (Copy)`,
            }
            set({ products: [...products, duplicated] })
        }
    },
}))
