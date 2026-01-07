import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationStore } from '@stores/notificationStore'
import { UserFormData } from '@stores/userModalStore'

interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    age: number
    gender: 'male' | 'female'
    role: string
    image?: string
}

interface UsersResponse {
    users: User[]
    total: number
    skip: number
    limit: number
}

const createUser = async (data: UserFormData): Promise<User> => {
    const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return response.json()
}

const updateUser = async (data: UserFormData): Promise<User> => {
    const response = await fetch(`https://dummyjson.com/users/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return response.json()
}

const deleteUser = async (id: number): Promise<User> => {
    const response = await fetch(`https://dummyjson.com/users/${id}`, {
        method: 'DELETE',
    })
    return response.json()
}

export function useUserMutations() {
    const queryClient = useQueryClient()
    const showNotification = useNotificationStore((state) => state.show)

    const createMutation = useMutation({
        mutationFn: createUser,
        onMutate: async (newUser) => {
            await queryClient.cancelQueries({ queryKey: ['users'] })

            const previousUsers = queryClient.getQueryData<UsersResponse>([
                'users',
            ])

            queryClient.setQueryData<UsersResponse>(['users'], (old) => {
                if (!old) return old
                return {
                    ...old,
                    users: [
                        {
                            id: Date.now(), // Temporary ID
                            ...newUser,
                            image: newUser.image || '',
                        } as User,
                        ...old.users,
                    ],
                    total: old.total + 1,
                }
            })

            showNotification('Creating user...', 'info')

            return { previousUsers }
        },
        onSuccess: () => {
            showNotification('User created successfully!', 'success')
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: (err, newUser, context) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(['users'], context.previousUsers)
            }
            showNotification('Failed to create user', 'error')
        },
    })

    const updateMutation = useMutation({
        mutationFn: updateUser,
        onMutate: async (updatedUser) => {
            await queryClient.cancelQueries({ queryKey: ['users'] })

            const previousUsers = queryClient.getQueryData<UsersResponse>([
                'users',
            ])

            queryClient.setQueryData<UsersResponse>(['users'], (old) => {
                if (!old) return old
                return {
                    ...old,
                    users: old.users.map((u) =>
                        u.id === updatedUser.id ? { ...u, ...updatedUser } : u
                    ),
                }
            })

            showNotification('Updating user...', 'info')

            return { previousUsers }
        },
        onSuccess: () => {
            showNotification('User updated successfully!', 'success')
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: (err, updatedUser, context) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(['users'], context.previousUsers)
            }
            showNotification('Failed to update user', 'error')
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onMutate: async (userId) => {
            await queryClient.cancelQueries({ queryKey: ['users'] })

            const previousUsers = queryClient.getQueryData<UsersResponse>([
                'users',
            ])

            queryClient.setQueryData<UsersResponse>(['users'], (old) => {
                if (!old) return old
                return {
                    ...old,
                    users: old.users.filter((u) => u.id !== userId),
                    total: old.total - 1,
                }
            })

            showNotification('Deleting user...', 'info')

            return { previousUsers }
        },
        onSuccess: () => {
            showNotification('User deleted successfully!', 'success')
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: (err, userId, context) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(['users'], context.previousUsers)
            }
            showNotification('Failed to delete user', 'error')
        },
    })

    return {
        createUser: createMutation.mutate,
        updateUser: updateMutation.mutate,
        deleteUser: deleteMutation.mutate,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    }
}
