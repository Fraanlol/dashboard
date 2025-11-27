import { create } from 'zustand'

export interface UserFormData {
    id?: number
    firstName: string
    lastName: string
    email: string
    age: number
    gender: 'male' | 'female'
    role: string
    image?: string
}

type ModalMode = 'create' | 'edit' | null

interface UserModalStore {
    isOpen: boolean
    mode: ModalMode
    selectedUser: UserFormData | null
    onSubmit: ((data: UserFormData, mode: 'create' | 'edit') => void) | null
    openCreateModal: () => void
    openEditModal: (user: UserFormData) => void
    closeModal: () => void
    setOnSubmit: (
        callback: (data: UserFormData, mode: 'create' | 'edit') => void
    ) => void
}

export const useUserModalStore = create<UserModalStore>((set) => ({
    isOpen: false,
    mode: null,
    selectedUser: null,
    onSubmit: null,

    openCreateModal: () =>
        set({
            isOpen: true,
            mode: 'create',
            selectedUser: null,
        }),

    openEditModal: (user) =>
        set({
            isOpen: true,
            mode: 'edit',
            selectedUser: user,
        }),

    closeModal: () =>
        set({
            isOpen: false,
            mode: null,
            selectedUser: null,
        }),

    setOnSubmit: (callback) =>
        set({
            onSubmit: callback,
        }),
}))

// Delete confirmation dialog store
interface DeleteUserDialogStore {
    isOpen: boolean
    userToDelete: { id: number; name: string } | null
    onDelete: ((id: number) => void) | null
    openDeleteDialog: (user: { id: number; name: string }) => void
    closeDeleteDialog: () => void
    setOnDelete: (callback: (id: number) => void) => void
}

export const useDeleteUserDialogStore = create<DeleteUserDialogStore>(
    (set) => ({
        isOpen: false,
        userToDelete: null,
        onDelete: null,

        openDeleteDialog: (user) =>
            set({
                isOpen: true,
                userToDelete: user,
            }),

        closeDeleteDialog: () =>
            set({
                isOpen: false,
                userToDelete: null,
            }),

        setOnDelete: (callback) =>
            set({
                onDelete: callback,
            }),
    })
)
