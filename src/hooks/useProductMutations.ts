import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationStore } from '@stores/notificationStore'
import { ProductFormData } from '@stores/productModalStore'

interface Product {
    id: number
    title: string
    description?: string
    price: number
    category: string
    brand?: string
    stock: number
    thumbnail?: string
}

interface ProductsResponse {
    products: Product[]
    total: number
    skip: number
    limit: number
}

// Helper para agregar delay mínimo (evita que el usuario vea el rollback)
const withMinimumDelay = async <T>(
    promise: Promise<T>,
    minDelay: number = 800
): Promise<T> => {
    const start = Date.now()
    const result = await promise
    const elapsed = Date.now() - start

    if (elapsed < minDelay) {
        await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed))
    }

    return result
}

// Simulated API calls to DummyJSON con delay mínimo
const createProduct = async (data: ProductFormData): Promise<Product> => {
    return withMinimumDelay(
        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then((res) => res.json())
    )
}

const updateProduct = async (data: ProductFormData): Promise<Product> => {
    return withMinimumDelay(
        fetch(`https://dummyjson.com/products/${data.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then((res) => res.json())
    )
}

const deleteProduct = async (id: number): Promise<Product> => {
    return withMinimumDelay(
        fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        }).then((res) => res.json())
    )
}

export function useProductMutations() {
    const queryClient = useQueryClient()
    const showNotification = useNotificationStore((state) => state.show)

    const createMutation = useMutation({
        mutationFn: createProduct,
        onMutate: async (newProduct) => {
            await queryClient.cancelQueries({ queryKey: ['products'] })

            const previousProducts = queryClient.getQueryData<ProductsResponse>(
                ['products', 'all']
            )

            queryClient.setQueryData<ProductsResponse>(
                ['products', 'all'],
                (old) => {
                    if (!old) return old
                    return {
                        ...old,
                        products: [
                            {
                                id: Date.now(), // Temporary ID
                                ...newProduct,
                                description: newProduct.description || '',
                                brand: newProduct.brand || '',
                                thumbnail: newProduct.thumbnail || '',
                            } as Product,
                            ...old.products,
                        ],
                        total: old.total + 1,
                    }
                }
            )

            showNotification('Creating product...', 'info')

            return { previousProducts }
        },
        onSuccess: async () => {
            showNotification('Product created successfully!', 'success')
            await new Promise((resolve) => setTimeout(resolve, 200))
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onError: (err, newProduct, context) => {
            if (context?.previousProducts) {
                queryClient.setQueryData(
                    ['products', 'all'],
                    context.previousProducts
                )
            }
            showNotification('Failed to create product', 'error')
        },
    })

    const updateMutation = useMutation({
        mutationFn: updateProduct,
        onMutate: async (updatedProduct) => {
            await queryClient.cancelQueries({ queryKey: ['products'] })

            const previousProducts = queryClient.getQueryData<ProductsResponse>(
                ['products', 'all']
            )

            queryClient.setQueryData<ProductsResponse>(
                ['products', 'all'],
                (old) => {
                    if (!old) return old
                    return {
                        ...old,
                        products: old.products.map((p) =>
                            p.id === updatedProduct.id
                                ? { ...p, ...updatedProduct }
                                : p
                        ),
                    }
                }
            )

            showNotification('Updating product...', 'info')

            return { previousProducts }
        },
        onSuccess: async () => {
            showNotification('Product updated successfully!', 'success')
            await new Promise((resolve) => setTimeout(resolve, 200))
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onError: (err, updatedProduct, context) => {
            if (context?.previousProducts) {
                queryClient.setQueryData(
                    ['products', 'all'],
                    context.previousProducts
                )
            }
            showNotification('Failed to update product', 'error')
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteProduct,
        onMutate: async (productId) => {
            await queryClient.cancelQueries({ queryKey: ['products'] })

            const previousProducts = queryClient.getQueryData<ProductsResponse>(
                ['products', 'all']
            )

            queryClient.setQueryData<ProductsResponse>(
                ['products', 'all'],
                (old) => {
                    if (!old) return old
                    return {
                        ...old,
                        products: old.products.filter(
                            (p) => p.id !== productId
                        ),
                        total: old.total - 1,
                    }
                }
            )

            showNotification('Deleting product...', 'info')

            return { previousProducts }
        },
        onSuccess: async () => {
            showNotification('Product deleted successfully!', 'success')
            await new Promise((resolve) => setTimeout(resolve, 200))
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onError: (err, productId, context) => {
            if (context?.previousProducts) {
                queryClient.setQueryData(
                    ['products', 'all'],
                    context.previousProducts
                )
            }
            showNotification('Failed to delete product', 'error')
        },
    })

    return {
        createProduct: createMutation.mutate,
        updateProduct: updateMutation.mutate,
        deleteProduct: deleteMutation.mutate,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    }
}
