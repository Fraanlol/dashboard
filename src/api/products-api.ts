import { Product } from '@stores/prodStore'

export interface ProductsResponse {
    products: Product[]
    total: number
    skip: number
    limit: number
    category?: string
}

export const getProducts = async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params).toString()

    if (params?.category) {
        const res = await fetch(
            `https://dummyjson.com/products/category/${params.category}?${query}`
        )
        return res.json()
    }
    const res = await fetch(`https://dummyjson.com/products?${query}`)
    return res.json()
}

export const getProductById = async (id: number) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    return res.json()
}

export const getCategories = async () => {
    const res = await fetch(`https://dummyjson.com/products/category-list`)
    return res.json()
}
