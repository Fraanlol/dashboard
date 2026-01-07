import { create } from 'zustand'

export interface ProductFormData {
    id?: number
    title: string
    description?: string
    price: number
    category: string
    brand?: string
    stock: number
    thumbnail?: string
}

type ModalMode = 'create' | 'edit' | null

interface ProductModalStore {
    isOpen: boolean
    mode: ModalMode
    selectedProduct: ProductFormData | null
    onSubmit: ((data: ProductFormData, mode: 'create' | 'edit') => void) | null
    openCreateModal: () => void
    openEditModal: (product: ProductFormData) => void
    closeModal: () => void
    setOnSubmit: (
        callback: (data: ProductFormData, mode: 'create' | 'edit') => void
    ) => void
}

export const useProductModalStore = create<ProductModalStore>((set) => ({
    isOpen: false,
    mode: null,
    selectedProduct: null,
    onSubmit: null,

    openCreateModal: () =>
        set({
            isOpen: true,
            mode: 'create',
            selectedProduct: null,
        }),

    openEditModal: (product) =>
        set({
            isOpen: true,
            mode: 'edit',
            selectedProduct: product,
        }),

    closeModal: () =>
        set({
            isOpen: false,
            mode: null,
            selectedProduct: null,
        }),

    setOnSubmit: (callback) =>
        set({
            onSubmit: callback,
        }),
})

interface DeleteDialogStore {
    isOpen: boolean
    productToDelete: { id: number; title: string } | null
    onDelete: ((id: number) => void) | null
    openDeleteDialog: (product: { id: number; title: string }) => void
    closeDeleteDialog: () => void
    setOnDelete: (callback: (id: number) => void) => void
}

export const useDeleteDialogStore = create<DeleteDialogStore>((set) => ({
    isOpen: false,
    productToDelete: null,
    onDelete: null,

    openDeleteDialog: (product) =>
        set({
            isOpen: true,
            productToDelete: product,
        }),

    closeDeleteDialog: () =>
        set({
            isOpen: false,
            productToDelete: null,
        }),

    setOnDelete: (callback) =>
        set({
            onDelete: callback,
        }),
}))
